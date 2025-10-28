// Simple navigation active state
document.querySelectorAll('.navbar a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelectorAll('.navbar a').forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});

// Wait for page load - APPOINTMENT FORM HANDLER (UPDATED)
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('appointmentForm'); // <-- Use ID from HTML
  if (!form) return;

  const successMsg = form.querySelector('.msg.success');
  const errorMsg   = form.querySelector('.msg.error');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
      name: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
      service: form.service.value,
      date: form.date ? form.date.value : '',
      time: form.time ? form.time.value : '',
      message: form.message.value
    };

    console.log('Submitting formData:', formData);

    try {
      const resp = await fetch('/send-email', {  // <-- Relative URL (works with Express static)
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const text = await resp.text();
      console.log('Raw response status:', resp.status);
      console.log('Raw response body:', text);

      let data;
      try { data = JSON.parse(text); } catch (err) { data = null; }

      if (resp.ok && data && data.success) {
        successMsg.textContent = data.message || 'Appointment submitted successfully!';
        successMsg.style.display = 'block';
        errorMsg.style.display = 'none';
        form.reset();
      } else {
        const msg = (data && data.message) ? data.message : `Server returned status ${resp.status}`;
        errorMsg.textContent = 'Server rejected request: ' + msg;
        errorMsg.style.display = 'block';
        successMsg.style.display = 'none';
      }
    } catch (err) {
      console.error('Network/fetch error:', err);
      errorMsg.textContent = 'Network error: could not reach server. Is the backend running?';
      errorMsg.style.display = 'block';
      successMsg.style.display = 'none';
    }
  });
});

// --- 2 "Learn More" button animation and click ---
const learnMoreBtn = document.querySelector("#learn-more-btn");

if (learnMoreBtn) {
  learnMoreBtn.addEventListener("click", () => {
    learnMoreBtn.classList.add("clicked");
    setTimeout(() => {
      learnMoreBtn.classList.remove("clicked");
      alert("Redirecting to About Page...");
      // Example for real use: window.location.href = "about.html";
    }, 600);
  });
}

// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {

  // --- 1 Scroll animation for testimonials ---
  const testimonialCards = document.querySelectorAll(".testimonial-card");

  const revealOnScroll = () => {
    testimonialCards.forEach(card => {
      const cardPosition = card.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2; // trigger point
      if (cardPosition < screenPosition) {
        card.classList.add("visible");
      }
    });
  };

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // run once on load


  // --- 2 Button click interactivity ---
  const bookBtn = document.querySelector("#book-btn");
  const contactBtn = document.querySelector("#contact-btn");

  if (bookBtn) {
    bookBtn.addEventListener("click", () => {
      alert("Redirecting to appointment booking page...");
      // Example: window.location.href = "appointment.html";
    });
  }

  if (contactBtn) {
    contactBtn.addEventListener("click", () => {
      alert("Opening contact form...");
      // Example: window.location.href = "contact.html";
    });
  }

});

// Contact Form Script - UPDATED TO USE BACKEND
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const successMsg = form.querySelector('.msg.success');
  const errorMsg   = form.querySelector('.msg.error');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    successMsg.style.display = 'none';
    errorMsg.style.display   = 'none';

    const formData = {
      name:    form.name.value,
      email:   form.email.value,
      phone:   form.phone.value,
      message: form.message.value
    };

    try {
      const resp = await fetch('/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const json = await resp.json();

      if (resp.ok && json.success) {
        successMsg.textContent = json.message;
        successMsg.style.display = 'block';
        form.reset();
      } else {
        errorMsg.textContent = json.message || 'Failed to send message';
        errorMsg.style.display = 'block';
      }
    } catch (err) {
      console.error('Contact form error:', err);
      errorMsg.textContent = 'Network error – is the server running?';
      errorMsg.style.display = 'block';
    }
  });
});

// script.js

// Service data with customer-focused descriptions
const serviceData = {
  'oral-surgery': {
    title: 'Oral Surgery Services',
    items: [
      {
        name: 'Tooth Extraction',
        description: 'Gentle, pain-free removal for quick relief and faster healing—perfect for simple or impacted cases, ensuring your comfort every step.',
        price: 'R400'
      },
      {
        name: 'Wisdom Tooth Extraction',
        description: 'Expert care from diagnosis to recovery, minimizing discomfort and promoting swift healing for a brighter, healthier smile.',
        price: 'R700'
      }
    ]
  },
  'cosmetic': {
    title: 'Cosmetic Services',
    items: [
      {
        name: 'Teeth Jewelleries',
        description: 'Add sparkle to your smile with customizable gems, crystals, or stones—elevate your style with a touch of luxury and personality.',
        price: 'R700'
      },
      {
        name: 'Gold & Silver Full',
        description: 'Transform your teeth with full gold or silver coverings for a bold, fashionable look that turns heads and boosts confidence.',
        price: 'TBA'
      },
      {
        name: 'All Other Shapes',
        description: 'Explore custom gold or platinum designs tailored to your vibe—durable, stylish options for that unique edge.',
        price: 'Gold: R700, Platinum: R1300'
      },
      {
        name: 'Platinum',
        description: 'Indulge in premium, long-lasting platinum enhancements for a luxurious, high-end fashion statement that lasts.',
        price: 'R1500'
      }
    ]
  },
  'preventive': {
    title: 'Preventive Services',
    items: [
      {
        name: 'Scaling & Polishing',
        description: 'Revitalize your smile with thorough cleaning and fluoride protection—prevent issues early for lasting oral health and a radiant glow.',
        price: 'R400'
      }
    ]
  },
  'restorative': {
    title: 'Restorative Services',
    items: [
      {
        name: 'Cementation',
        description: 'Secure crowns, bridges, or inlays with precision for a natural, durable restoration that restores function and aesthetics seamlessly.',
        price: 'R300'
      }
    ]
  },
  'orthodontics': {
    title: 'Orthodontics',
    items: [
      {
        name: 'Coming Soon',
        description: 'Straighten your smile with innovative solutions—watch for our upcoming services designed for perfect alignment and confidence.',
        price: 'TBA'
      }
    ]
  }
};

// Wait for DOM to load to ensure buttons are available
document.addEventListener('DOMContentLoaded', () => {
  // Debug: Log to confirm script is running
  console.log('script.js loaded');

  // Handle button clicks for "View Details & Prices"
  const buttons = document.querySelectorAll('.service-details-btn');
  console.log(`Found ${buttons.length} service buttons`); // Debug: Check if buttons are found

  buttons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent card click from triggering
      console.log('View Details button clicked'); // Debug: Confirm click
      const card = e.target.closest('.service-card');
      const serviceKey = card.dataset.service;
      const service = serviceData[serviceKey];

      if (service) {
        showModal(service);
      } else {
        console.error(`Service data not found for key: ${serviceKey}`);
      }
    });
  });

  // Handle entire card clicks
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (!e.target.classList.contains('service-details-btn')) {
        console.log('Service card clicked'); // Debug: Confirm card click
        const serviceKey = card.dataset.service;
        const service = serviceData[serviceKey];
        if (service) {
          showModal(service);
        } else {
          console.error(`Service data not found for key: ${serviceKey}`);
        }
      }
    });
  });
});

// Function to create and show modal
function showModal(service) {
  console.log('Showing modal for:', service.title); // Debug: Confirm modal creation
  const existingModal = document.querySelector('.modal');
  if (existingModal) existingModal.remove();

  const modal = document.createElement('div');
  modal.classList.add('modal');
  const itemsHtml = service.items.map(item => `
    <li>
      <i class="fas fa-tooth icon"></i>
      <strong>${item.name}</strong>
      <div class="description">${item.description}</div>
      <div class="price">Price: ${item.price}</div>
    </li>
  `).join('');

  modal.innerHTML = `
    <div class="modal-content" data-aos="zoom-in">
      <h3>${service.title}</h3>
      <p class="modal-intro">Discover how our advanced techniques can transform your smile with minimal discomfort.</p>
      <ul>${itemsHtml}</ul>
      <div class="modal-actions">
        <a href="book-appointment.html?service=${encodeURIComponent(service.title)}" class="btn book-btn">Book Now</a>
        <button class="modal-close">Close</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  // Close modal on button click
  modal.querySelector('.modal-close').addEventListener('click', () => {
    console.log('Modal closed'); // Debug: Confirm close
    modal.remove();
  });

  // Close modal on outside click
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      console.log('Modal closed via outside click'); // Debug: Confirm close
      modal.remove();
    }
  });

  // Re-initialize AOS for dynamic content
  AOS.refresh();
}

// Initialize AOS for animations
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Form submission handling
  document.querySelector('.appointment-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      service: formData.get('service'),
      date: formData.get('date'),
      time: formData.get('time'),
      message: formData.get('message')
    };
    // Placeholder for form submission (replace with API call in production)
    alert(`Appointment submitted!\n\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nService: ${data.service}\nDate: ${data.date}\nTime: ${data.time}\nMessage: ${data.message}`);
    this.reset();
  });

