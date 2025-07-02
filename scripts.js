// Scroll Progress Indicator
const progressBar = document.createElement("div");
progressBar.className = "scroll-progress";
document.body.appendChild(progressBar);

window.onscroll = () => {
  const winScroll =
    document.body.scrollTop || document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  progressBar.style.width = scrolled + "%";
};

// Menu icon functionality
const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector(".navbar");

menuIcon.addEventListener("click", () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
});

// Active link highlighting
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar a");

window.addEventListener("scroll", () => {
  // Close mobile menu when scrolling
  menuIcon.classList.remove("bx-x");
  navbar.classList.remove("active");

  // Update active navigation link based on scroll position
  sections.forEach((section) => {
    const top = section.offsetTop - 150;
    const height = section.offsetHeight;
    const id = section.getAttribute("id");

    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        document
          .querySelector(".navbar a[href*=" + id + "]")
          .classList.add("active");
      });
    }
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    // Remove active class from all links
    document.querySelectorAll(".navbar a").forEach((link) => {
      link.classList.remove("active");
    });

    // Add active class to clicked link
    this.classList.add("active");

    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const headerOffset = 100; // Adjust this value based on your header height
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // Close mobile menu if open
      const menuIcon = document.querySelector("#menu-icon");
      const navbar = document.querySelector(".navbar");
      menuIcon.classList.remove("bx-x");
      navbar.classList.remove("active");
    }
  });
});

// Update active link on scroll
window.addEventListener("scroll", () => {
  let current = "";
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".navbar a");

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop - 150) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").slice(1) === current) {
      link.classList.add("active");
    }
  });
});

// Form submission handling
const contactForm = document.querySelector(".contact-form form");
const inputs = contactForm.querySelectorAll("input, textarea");

inputs.forEach((input) => {
  input.addEventListener("focus", () => {
    input.parentElement.classList.add("focused");
  });

  input.addEventListener("blur", () => {
    if (!input.value) {
      input.parentElement.classList.remove("focused");
    }
  });
});

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Basic form validation
  let isValid = true;
  inputs.forEach((input) => {
    if (!input.value.trim()) {
      isValid = false;
      input.parentElement.classList.add("error");
    } else {
      input.parentElement.classList.remove("error");
    }
  });

  if (isValid) {
    // Add success animation
    contactForm.classList.add("success");

    // Show success message
    const successMessage = document.createElement("div");
    successMessage.className = "success-message";
    successMessage.textContent = "Message sent successfully!";
    contactForm.appendChild(successMessage);

    // Reset form after delay
    setTimeout(() => {
      contactForm.reset();
      contactForm.classList.remove("success");
      successMessage.remove();
      inputs.forEach((input) => {
        input.parentElement.classList.remove("focused");
      });
    }, 3000);
  }
});

// Add scroll-to-top button
const scrollTopBtn = document.createElement("button");
scrollTopBtn.className = "scroll-top-btn";
scrollTopBtn.innerHTML = '<i class="bx bx-up-arrow-alt"></i>';
document.body.appendChild(scrollTopBtn);

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Enhanced scroll animations
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        entry.target.classList.add("animate");
      }
    });
  },
  {
    threshold: 0.1,
  }
);

// Observe all animated elements
document
  .querySelectorAll(
    ".service-box, .project-card, .timeline-item, .about-content, .home-content, .img-box"
  )
  .forEach((el) => observer.observe(el));

// Smooth scroll with offset
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    const offset = 100; // Adjust offset as needed
    const targetPosition =
      target.getBoundingClientRect().top + window.pageYOffset - offset;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });

    // Close mobile menu after clicking
    menuIcon.classList.remove("bx-x");
    navbar.classList.remove("active");
  });
});

// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all animations
  initializeAnimations();

  // Setup scroll handlers
  setupScrollHandlers();

  // Setup form handlers
  setupFormHandlers();
});

// Initialize animations
function initializeAnimations() {
  // Animate elements on scroll
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          entry.target.classList.add("animate");
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  // Observe all animated elements
  document
    .querySelectorAll(".animate-on-scroll")
    .forEach((el) => observer.observe(el));
}

// Setup scroll handlers
function setupScrollHandlers() {
  const header = document.querySelector(".header");
  const scrollProgress = document.querySelector(".scroll-progress");
  const scrollTopBtn = document.querySelector(".scroll-top-btn");

  window.addEventListener("scroll", () => {
    // Update header style
    if (window.scrollY > 100) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }

    // Update scroll progress
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    scrollProgress.style.width = scrolled + "%";

    // Show/hide scroll to top button
    if (winScroll > 300) {
      scrollTopBtn.classList.add("show");
    } else {
      scrollTopBtn.classList.remove("show");
    }
  });

  // Smooth scroll for navigation
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      const offset = 100;
      const targetPosition =
        target.getBoundingClientRect().top + window.pageYOffset - offset;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });

      // Close mobile menu if open
      document.querySelector("#menu-icon").classList.remove("bx-x");
      document.querySelector(".navbar").classList.remove("active");
    });
  });
}

// Setup form handlers
function setupFormHandlers() {
  const contactForm = document.querySelector(".contact-form form");
  const inputs = contactForm.querySelectorAll("input, textarea");

  inputs.forEach((input) => {
    // Handle focus states
    input.addEventListener("focus", () => {
      input.parentElement.classList.add("focused");
    });

    input.addEventListener("blur", () => {
      if (!input.value) {
        input.parentElement.classList.remove("focused");
      }
    });

    // Handle validation
    input.addEventListener("input", () => {
      if (input.value.trim()) {
        input.parentElement.classList.remove("error");
      }
    });
  });

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Validate form
    let isValid = true;
    inputs.forEach((input) => {
      if (!input.value.trim()) {
        isValid = false;
        input.parentElement.classList.add("error");
      }
    });

    if (isValid) {
      // Show success message
      const successMessage = document.createElement("div");
      successMessage.className = "success-message";
      successMessage.textContent = "Message sent successfully!";
      contactForm.appendChild(successMessage);

      // Reset form
      setTimeout(() => {
        contactForm.reset();
        successMessage.remove();
        inputs.forEach((input) => {
          input.parentElement.classList.remove("focused");
        });
      }, 3000);
    }
  });
}

const timelineItems = document.querySelectorAll(".timeline-item");

const revealTimeline = () => {
  timelineItems.forEach((item) => {
    const itemTop = item.getBoundingClientRect().top;
    const triggerBottom = window.innerHeight * 0.8;

    if (itemTop < triggerBottom) {
      item.classList.add("show");
    }
  });
};

window.addEventListener("scroll", revealTimeline);
window.addEventListener("load", revealTimeline);

// Make "Live Demo" and "Source Code" buttons open links via JS
document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelectorAll(
      ".project-links a.live-demo, .project-links a.source-code"
    )
    .forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        const url = btn.getAttribute("href");
        if (url && url !== "#") {
          window.open(url, "_blank");
        }
      });
    });
});
