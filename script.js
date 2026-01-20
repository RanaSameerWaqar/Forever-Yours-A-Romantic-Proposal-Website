/* ============================================
   ROMANTIC PROPOSAL & BIRTHDAY WEBSITE
   JavaScript - Animations & Interactions
   ============================================ */

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all modules
  initParticles();
  initAOS();
  initNavbar();
  initFloatingHearts();
  initProposalButtons();
  initCandleBlowing();
  initSmoothScroll();
  initGSAPAnimations();
  initFooterHearts();
});

/* ---------- Particles.js Configuration ---------- */
function initParticles() {
  if (typeof particlesJS !== "undefined") {
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
      if (navCollapse.classList.contains("show")) {
        const bsCollapse = new bootstrap.Collapse(navCollapse);
        bsCollapse.hide();
      }
    });
  });
}

/* ---------- Floating Hearts Animation ---------- */
function initFloatingHearts() {
  const container = document.getElementById("floating-hearts");

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

/* ---------- Proposal Buttons ---------- */
function initProposalButtons() {
  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");
  const celebrationModal = new bootstrap.Modal(
    document.getElementById("celebrationModal"),
  );

  // Yes button - Celebrate!
  yesBtn.addEventListener("click", function () {
    // Launch confetti celebration
    launchConfetti();

    // Show celebration modal
    setTimeout(() => {
      celebrationModal.show();
    }, 1500);

    // Add continuous confetti
    const confettiInterval = setInterval(launchConfetti, 2000);

    // Stop confetti after modal is closed
    document
      .getElementById("celebrationModal")
      .addEventListener("hidden.bs.modal", function () {
        clearInterval(confettiInterval);
      });
  });

  // No button - Move away playfully
  let noClickCount = 0;
  const originalText = noBtn.textContent;
  const texts = [
    "Are you sure? 🥺",
    "Please reconsider 💝",
    "My heart is breaking... 💔",
    "One more chance? 🙏",
    "I love you! ❤️",
  ];

  noBtn.addEventListener("mouseenter", function () {
    // Move button randomly
    const randomX = (Math.random() - 0.5) * 200;
    const randomY = (Math.random() - 0.5) * 100;
    this.style.transform = `translate(${randomX}px, ${randomY}px)`;
  });

  noBtn.addEventListener("mouseleave", function () {
    this.style.transform = "translate(0, 0)";
  });

  noBtn.addEventListener("click", function () {
    noClickCount++;
    if (noClickCount < texts.length) {
      this.textContent = texts[noClickCount - 1];
    } else {
      // After multiple clicks, change to yes
      this.textContent = "Fine, YES! 💖";
      this.classList.remove("btn-no");
      this.classList.add("btn-yes");
      this.style.transform = "none";

      // Trigger celebration
      setTimeout(() => {
        launchConfetti();
        celebrationModal.show();
      }, 500);
    }
  });
}

/* ---------- Confetti Launcher ---------- */
function launchConfetti() {
  if (typeof confetti !== "undefined") {
    // Center burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#ff6b9d", "#c44ef5", "#ff4d6d", "#ffd700", "#ff9ff3"],
    });

    // Left side
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ["#ff6b9d", "#c44ef5", "#ff4d6d"],
    });

    // Right side
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ["#ff6b9d", "#c44ef5", "#ff4d6d"],
    });
  }
}

/* ---------- Birthday Candle Blowing ---------- */
function initCandleBlowing() {
  const blowBtn = document.getElementById("blowBtn");
  const flames = document.querySelectorAll(".flame");
  let candlesBlown = false;

  blowBtn.addEventListener("click", function () {
    if (!candlesBlown) {
      // Blow out candles with animation
      flames.forEach((flame, index) => {
        setTimeout(() => {
          flame.classList.add("blown");
        }, index * 200);
      });

      // Launch birthday confetti
      setTimeout(() => {
        launchBirthdayConfetti();
      }, 600);

      // Change button text
      this.innerHTML = '<i class="fas fa-gift me-2"></i>Make a Wish! 🎂';
      candlesBlown = true;

      // Show birthday message
      setTimeout(() => {
        alert(
          "🎂 Happy Birthday, My Love! 🎂\n\nMay all your wishes come true!\nI love you more than words can say! ❤️",
        );
      }, 1500);
    } else {
      // Re-light candles
      flames.forEach((flame) => {
        flame.classList.remove("blown");
      });
      this.innerHTML = '<i class="fas fa-wind me-2"></i>Blow the Candles!';
      candlesBlown = false;
    }
  });
}

/* ---------- Birthday Confetti ---------- */
function launchBirthdayConfetti() {
  if (typeof confetti !== "undefined") {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;

    const colors = ["#f093fb", "#f5576c", "#ffd89b", "#ffd700", "#ff6b9d"];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < animationEnd) {
        requestAnimationFrame(frame);
      }
    })();
  }
}

/* ---------- Smooth Scroll ---------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
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

/* ---------- GSAP Animations ---------- */
function initGSAPAnimations() {
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);

    // Hero section entrance animation
    gsap.from(".hero-title", {
      duration: 1.5,
      y: 100,
      opacity: 0,
      ease: "power4.out",
    });

    gsap.from(".hero-subtitle", {
      duration: 1.5,
      y: 50,
      opacity: 0,
      delay: 0.3,
      ease: "power4.out",
    });

    gsap.from(".hero-image-container", {
      duration: 1.2,
      scale: 0.5,
      opacity: 0,
      delay: 0.5,
      ease: "elastic.out(1, 0.5)",
    });

    gsap.from(".btn-glow", {
      duration: 1,
      y: 30,
      opacity: 0,
      delay: 0.8,
      ease: "power4.out",
    });

    // Parallax effect for sections
    gsap.utils.toArray(".section-bg").forEach((bg) => {
      gsap.to(bg, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: bg.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    // Glass cards animation
    gsap.utils.toArray(".glass-card").forEach((card) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        duration: 0.8,
        y: 50,
        opacity: 0,
        ease: "power3.out",
      });
    });

    // Gallery items stagger animation
    gsap.utils.toArray(".gallery-item").forEach((item, index) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        duration: 0.6,
        y: 30,
        opacity: 0,
        delay: index * 0.1,
        ease: "power3.out",
      });
    });

    // Section titles animation
    gsap.utils.toArray(".section-title").forEach((title) => {
      gsap.from(title, {
        scrollTrigger: {
          trigger: title,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        duration: 1,
        x: -50,
        opacity: 0,
        ease: "power3.out",
      });
    });

    // Ring container animation
    const ringContainer = document.querySelector(".ring-container");
    if (ringContainer) {
      gsap.from(ringContainer, {
        scrollTrigger: {
          trigger: ringContainer,
          start: "top 70%",
          toggleActions: "play none none none",
        },
        duration: 1.2,
        scale: 0.5,
        rotation: 180,
        opacity: 0,
        ease: "elastic.out(1, 0.5)",
      });
    }

    // Cake container animation
    const cakeContainer = document.querySelector(".cake-container");
    if (cakeContainer) {
      gsap.from(cakeContainer, {
        scrollTrigger: {
          trigger: cakeContainer,
          start: "top 70%",
          toggleActions: "play none none none",
        },
        duration: 1,
        y: 100,
        opacity: 0,
        ease: "power3.out",
      });
    }
  }
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

/* ---------- Typewriter Effect Reset ---------- */
function resetTypewriter() {
  const typewriter = document.querySelector(".typewriter");
  if (typewriter) {
    typewriter.style.animation = "none";
    setTimeout(() => {
      typewriter.style.animation = "";
    }, 10);
  }
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

/* ---------- Easter Egg - Konami Code ---------- */
const konamiCode = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];
let konamiIndex = 0;

document.addEventListener("keydown", function (e) {
  if (e.key === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      // Secret celebration!
      launchConfetti();
      setTimeout(launchConfetti, 500);
      setTimeout(launchConfetti, 1000);
      setTimeout(() => {
        alert(
          "🎉 Secret Unlocked! 🎉\n\nYou found the easter egg!\nI love you to the moon and back! 🌙❤️",
        );
      }, 1500);
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }
});

/* ---------- Heart Cursor Trail ---------- */
document.addEventListener("mousemove", function (e) {
  if (Math.random() > 0.95) {
    // Only occasionally
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

// Add cursor heart animation style
const style = document.createElement("style");
style.textContent = `
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
