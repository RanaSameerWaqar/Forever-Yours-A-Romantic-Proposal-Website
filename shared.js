/* ============================================
   SHARED UTILITIES - ROMANTIC WEBSITE
   JavaScript shared across all pages
   ============================================ */

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  initParticles();
  initAOS();
  initNavbar();
  initFloatingHearts();
  initSmoothScroll();
  initFooterHearts();
  initCursorTrail();
  initPageTransitions();
});

/* ---------- Particles.js Configuration ---------- */
function initParticles() {
  if (
    typeof particlesJS !== "undefined" &&
    document.getElementById("particles-js")
  ) {
    particlesJS("particles-js", {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: ["#ff6b9d", "#c44ef5", "#ff4d6d", "#7c3aed"],
        },
        shape: {
          type: "circle",
        },
        opacity: {
          value: 0.5,
          random: true,
          anim: {
            enable: true,
            speed: 1,
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: true,
            speed: 2,
            size_min: 0.1,
            sync: false,
          },
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#ff6b9d",
          opacity: 0.2,
          width: 1,
        },
        move: {
          enable: true,
          speed: 1,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: true,
            rotateX: 600,
            rotateY: 1200,
          },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "grab",
          },
          onclick: {
            enable: true,
            mode: "push",
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 0.5,
            },
          },
          push: {
            particles_nb: 4,
          },
        },
      },
      retina_detect: true,
    });
  }
}

/* ---------- AOS (Animate On Scroll) ---------- */
function initAOS() {
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 1000,
      easing: "ease-out-cubic",
      once: true,
      offset: 100,
      delay: 0,
    });
  }
}

/* ---------- Navbar Scroll Effect ---------- */
function initNavbar() {
  const navbar = document.querySelector(".glass-nav");
  if (!navbar) return;

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Close mobile menu on link click
  const navLinks = document.querySelectorAll(".nav-link");
  const navCollapse = document.querySelector(".navbar-collapse");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navCollapse && navCollapse.classList.contains("show")) {
        const bsCollapse = new bootstrap.Collapse(navCollapse);
        bsCollapse.hide();
      }
    });
  });
}

/* ---------- Floating Hearts Animation ---------- */
function initFloatingHearts() {
  const container = document.getElementById("floating-hearts");
  if (!container) return;

  function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("floating-heart");
    heart.innerHTML = "❤";

    // Random position
    heart.style.left = Math.random() * 100 + "%";

    // Random size
    const size = Math.random() * 20 + 15;
    heart.style.fontSize = size + "px";

    // Random animation duration
    const duration = Math.random() * 10 + 10;
    heart.style.animationDuration = duration + "s";

    // Random delay
    heart.style.animationDelay = Math.random() * 5 + "s";

    // Random color
    const colors = ["#ff6b9d", "#c44ef5", "#ff4d6d", "#e63946", "#ff9ff3"];
    heart.style.color = colors[Math.floor(Math.random() * colors.length)];

    container.appendChild(heart);

    // Remove heart after animation
    setTimeout(
      () => {
        heart.remove();
      },
      (duration + 5) * 1000,
    );
  }

  // Create hearts periodically
  setInterval(createHeart, 2000);

  // Create initial hearts
  for (let i = 0; i < 10; i++) {
    setTimeout(createHeart, i * 500);
  }
}

/* ---------- Smooth Scroll ---------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#") return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

/* ---------- Footer Hearts Animation ---------- */
function initFooterHearts() {
  const container = document.getElementById("footer-hearts");
  if (!container) return;

  function createFooterHeart() {
    const heart = document.createElement("span");
    heart.innerHTML = "❤";
    heart.style.cssText = `
            position: absolute;
            bottom: 0;
            left: ${Math.random() * 100}%;
            font-size: ${Math.random() * 15 + 10}px;
            color: rgba(255, 107, 157, ${Math.random() * 0.5 + 0.2});
            animation: floatUp ${Math.random() * 5 + 5}s linear forwards;
            pointer-events: none;
        `;

    container.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 10000);
  }

  // Create hearts periodically
  setInterval(createFooterHeart, 1000);
}

/* ---------- Heart Cursor Trail ---------- */
function initCursorTrail() {
  document.addEventListener("mousemove", function (e) {
    if (Math.random() > 0.95) {
      createCursorHeart(e.clientX, e.clientY);
    }
  });

  function createCursorHeart(x, y) {
    const heart = document.createElement("div");
    heart.innerHTML = "❤";
    heart.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            font-size: 12px;
            color: #ff6b9d;
            pointer-events: none;
            z-index: 9999;
            animation: cursorHeart 1s ease-out forwards;
        `;
    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 1000);
  }
}

/* ---------- Page Transitions ---------- */
function initPageTransitions() {
  // Add fade in on page load
  document.body.classList.add("loaded");

  // Smooth page transitions for internal links
  const links = document.querySelectorAll(
    'a[href^="proposal.html"], a[href^="birthday.html"], a[href^="gallery.html"], a[href^="quotes.html"], a[href^="story.html"], a[href^="index.html"]',
  );

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (!href.includes("#")) {
        e.preventDefault();
        document.body.style.opacity = "0";
        setTimeout(() => {
          window.location.href = href;
        }, 300);
      }
    });
  });
}

/* ---------- Image Lazy Loading ---------- */
document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll("img");

  const imageObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute("data-src");
          }
          img.classList.add("loaded");
          observer.unobserve(img);
        }
      });
    },
    {
      rootMargin: "50px 0px",
      threshold: 0.1,
    },
  );

  images.forEach((img) => {
    imageObserver.observe(img);
  });
});

/* ---------- Add Loading Animation ---------- */
window.addEventListener("load", function () {
  document.body.classList.add("loaded");

  // Refresh AOS
  if (typeof AOS !== "undefined") {
    AOS.refresh();
  }
});

// Add cursor heart animation style
const style = document.createElement("style");
style.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    @keyframes cursorHeart {
        0% {
            opacity: 1;
            transform: scale(1) translateY(0);
        }
        100% {
            opacity: 0;
            transform: scale(1.5) translateY(-50px);
        }
    }
`;
document.head.appendChild(style);

console.log("💕 Made with love for the most special person in my life 💕");
