// Simple navigation active state
document.querySelectorAll('.navbar a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelectorAll('.navbar a').forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});

// Wait for page load
document.addEventListener("DOMContentLoaded", () => {
  // --- 1️⃣ Fade-in scroll animation for About section ---
  const aboutSection = document.querySelector(".about-section");


if (aboutSection) {  // ✅ Only run this if .about-section exists
  const showAboutSection = () => {
    const sectionTop = aboutSection.getBoundingClientRect().top;
    const screenHeight = window.innerHeight;

    if (sectionTop < screenHeight * 0.85) {
      aboutSection.classList.add("visible");
    }
  };

  window.addEventListener("scroll", showAboutSection);
  showAboutSection();
}


  // --- 2️⃣ "Learn More" button animation and click ---
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
});


// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {

  // --- 1️⃣ Scroll animation for testimonials ---
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


  // --- 2️⃣ Button click interactivity ---
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

// Contact Form Script
// --- 5️⃣ Contact Form Script ---
const form = document.querySelector("form");

if (form) {  // ✅ only run this if a form exists
  const nameInput = form.querySelector('input[placeholder="Full Name"]');
  const phoneInput = form.querySelector('input[placeholder="Phone Number"]');
  const emailInput = form.querySelector('input[placeholder="Email Address"]');
  const messageInput = form.querySelector('textarea[placeholder="Message"]');

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (
      nameInput.value.trim() === "" ||
      phoneInput.value.trim() === "" ||
      emailInput.value.trim() === "" ||
      messageInput.value.trim() === ""
    ) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!emailPattern.test(emailInput.value)) {
      alert("Please enter a valid email address.");
      return;
    }

    alert(`Thank you, ${nameInput.value}! Your message has been sent successfully.`);
    form.reset();
  });
}

// services javascript//

document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('click', () => {
    const service = card.querySelector('h4').textContent;
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
      <div class="modal-content">
        <h3>${service}</h3>
        <p>Learn more about our ${service.toLowerCase()} offerings. Contact us to schedule a consultation!</p>
        <button class="modal-close">Close</button>
      </div>
    `;
    document.body.appendChild(modal);
    modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
  });
});

const hamburger = document.createElement('div');
hamburger.classList.add('hamburger');
hamburger.innerHTML = '☰';
document.querySelector('.navbar').appendChild(hamburger);

hamburger.addEventListener('click', () => {
  document.querySelector('.navbar ul').classList.toggle('active');
});

// script.js

const serviceData = {
  'oral-surgery': {
    title: 'Oral Surgery Services',
    items: [
      {
        name: 'Tooth Extraction',
        description: 'Simple extraction, Impacted tooth extractions, Removal of tooth roots.',
        price: 'R400'
      },
      {
        name: 'Wisdom Tooth Extraction',
        description: 'Examination & Diagnosis, Non-Surgical Management, Post-Extraction Care.',
        price: 'R700'
      }
    ]
  },
  'cosmetic': {
    title: 'Cosmetic Services',
    items: [
      {
        name: 'Teeth Jewelleries',
        description: 'Small gems, Crystals, Stones.',
        price: 'R700'
      },
      {
        name: 'Gold & Silver Full',
        description: 'Entire tooth, Gold or Silver, Fashion Purposes.',
        price: 'TBA'  // Price was missing, set to TBA
      },
      {
        name: 'All Other Shapes',
        description: 'Gold or Platinum options available.',
        price: 'Gold: R700, Platinum: R1300'
      },
      {
        name: 'Platinum',
        description: 'More Durable, Luxury Option, Fashion Purposes.',
        price: 'R1500'
      }
    ]
  },
  'preventive': {
    title: 'Preventive Services',
    items: [
      {
        name: 'Scaling & Polishing',
        description: 'Examination, Deep cleaning, Fluoride Treatment.',
        price: 'R400'
      }
    ]
  },
  'restorative': {
    title: 'Restorative Services',
    items: [
      {
        name: 'Cementation',
        description: 'Attaching Crowns, Fixing bridges, Securing inlays & onlays.',
        price: 'R300'
      }
    ]
  },
  'orthodontics': {
    title: 'Orthodontics',
    items: [
      {
        name: 'Coming Soon',
        description: 'Details for Orthodontics services will be added soon.',
        price: 'TBA'
      }
    ]
  }
};

document.querySelectorAll('.service-details-btn').forEach(button => {
  button.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent card click from triggering if needed
    const card = e.target.closest('.service-card');
    const serviceKey = card.dataset.service;
    const service = serviceData[serviceKey];

    if (service) {
      const modal = document.createElement('div');
      modal.classList.add('modal');
      let itemsHtml = service.items.map(item => `
        <li>
          <strong>${item.name}</strong>
          <div class="description">${item.description}</div>
          <div class="price">Price: ${item.price}</div>
        </li>
      `).join('');

      modal.innerHTML = `
        <div class="modal-content">
          <h3>${service.title}</h3>
          <ul>${itemsHtml}</ul>
          <button class="modal-close">Close</button>
        </div>
      `;
      document.body.appendChild(modal);

      // Close modal
      modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
      modal.addEventListener('click', (event) => {
        if (event.target === modal) modal.remove();
      });
    }
  });
});

// Placeholder for form submission logic (e.g., send to server or display confirmation)
  alert(`Appointment submitted!\n\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nService: ${data.service}\nDate: ${data.date}\nTime: ${data.time}\nMessage: ${data.message}`);
  this.reset();


// Optional: Make entire card clickable if no button, but since we have button, it's fine




