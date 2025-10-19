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

    




