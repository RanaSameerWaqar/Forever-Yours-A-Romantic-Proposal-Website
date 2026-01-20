/* ============================================
   ADVANCED JAVASCRIPT FEATURES
   Cool functions and interactive effects
   ============================================ */

// ========== LOADING SCREEN ==========
window.addEventListener("load", () => {
  const loadingScreen = document.getElementById("loadingScreen");
  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.classList.add("hidden");
      setTimeout(() => loadingScreen.remove(), 500);
    }, 1500);
  }
});

// ========== CUSTOM CURSOR ==========
function initCustomCursor() {
  const cursorDot = document.createElement("div");
  const cursorOutline = document.createElement("div");

  cursorDot.className = "cursor-dot";
  cursorOutline.className = "cursor-outline";

  document.body.appendChild(cursorDot);
  document.body.appendChild(cursorOutline);

  let mouseX = 0,
    mouseY = 0;
  let outlineX = 0,
    outlineY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursorDot.style.left = mouseX + "px";
    cursorDot.style.top = mouseY + "px";
  });

  // Smooth follow for outline
  function animateCursorOutline() {
    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;

    cursorOutline.style.left = outlineX - 20 + "px";
    cursorOutline.style.top = outlineY - 20 + "px";

    requestAnimationFrame(animateCursorOutline);
  }

  animateCursorOutline();

  // Enlarge on hoverable elements
  const hoverables = document.querySelectorAll(
    "a, button, .glass-card, .nav-card",
  );
  hoverables.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursorDot.style.transform = "scale(2)";
      cursorOutline.style.transform = "scale(1.5)";
    });
    el.addEventListener("mouseleave", () => {
      cursorDot.style.transform = "scale(1)";
      cursorOutline.style.transform = "scale(1)";
    });
  });
}

// Initialize on desktop only
if (window.innerWidth > 768) {
  initCustomCursor();
}

// ========== PARALLAX SCROLL EFFECT ==========
function initParallax() {
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll("[data-parallax]");

    parallaxElements.forEach((el) => {
      const speed = el.dataset.parallax || 0.5;
      el.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });
}

initParallax();

// ========== SCROLL REVEAL ANIMATIONS ==========
function initScrollReveal() {
  const revealElements = document.querySelectorAll("[data-reveal]");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const animationType = entry.target.dataset.reveal || "fade-slide-up";
          entry.target.classList.add(animationType);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );

  revealElements.forEach((el) => revealObserver.observe(el));
}

initScrollReveal();

// ========== FLOATING PARTICLES ==========
function createFloatingElement(type = "heart") {
  const element = document.createElement("div");
  const symbols = {
    heart: ["❤", "💕", "💖", "💗", "💓"],
    star: ["⭐", "✨", "🌟", "💫"],
    flower: ["🌸", "🌺", "🌼", "🌻"],
  };

  const symbolArray = symbols[type] || symbols.heart;
  element.textContent =
    symbolArray[Math.floor(Math.random() * symbolArray.length)];
  element.style.cssText = `
    position: fixed;
    font-size: ${Math.random() * 20 + 15}px;
    left: ${Math.random() * 100}vw;
    bottom: -50px;
    pointer-events: none;
    z-index: 999;
    animation: floatUp ${Math.random() * 5 + 5}s linear forwards;
    opacity: ${Math.random() * 0.5 + 0.3};
  `;

  document.body.appendChild(element);
  setTimeout(() => element.remove(), 10000);
}

// Create particles periodically
setInterval(() => createFloatingElement("heart"), 3000);
setInterval(() => createFloatingElement("star"), 5000);

// ========== CLICK RIPPLE EFFECT ==========
function createRipple(e) {
  const ripple = document.createElement("div");
  ripple.className = "click-ripple";

  ripple.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255, 107, 157, 0.8), transparent);
    left: ${e.clientX - 10}px;
    top: ${e.clientY - 10}px;
    pointer-events: none;
    z-index: 9999;
    animation: rippleExpand 0.6s ease-out forwards;
  `;

  document.body.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
}

const style = document.createElement("style");
style.textContent = `
  @keyframes rippleExpand {
    to {
      transform: scale(10);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

document.addEventListener("click", createRipple);

// ========== TEXT SCRAMBLE EFFECT ==========
class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = "!<>-_\\/[]{}—=+*^?#________";
    this.update = this.update.bind(this);
  }

  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => (this.resolve = resolve));
    this.queue = [];

    for (let i = 0; i < length; i++) {
      const from = oldText[i] || "";
      const to = newText[i] || "";
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }

    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }

  update() {
    let output = "";
    let complete = 0;

    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];

      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="dud">${char}</span>`;
      } else {
        output += from;
      }
    }

    this.el.innerHTML = output;

    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }

  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

// ========== SOUND EFFECTS ==========
function playSound(type) {
  const sounds = {
    click: () => {
      const audioContext = new (
        window.AudioContext || window.webkitAudioContext
      )();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = 800;
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.1,
      );

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    },
    success: () => {
      const audioContext = new (
        window.AudioContext || window.webkitAudioContext
      )();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = 600;
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);

      setTimeout(() => {
        oscillator.frequency.value = 800;
      }, 50);

      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.3,
      );
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    },
  };

  if (sounds[type]) sounds[type]();
}

// ========== TILT EFFECT ==========
function initTiltEffect() {
  const tiltElements = document.querySelectorAll("[data-tilt]");

  tiltElements.forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    el.addEventListener("mouseleave", () => {
      el.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
    });
  });
}

initTiltEffect();

// ========== MAGNETIC BUTTON EFFECT ==========
function initMagneticButtons() {
  const buttons = document.querySelectorAll("[data-magnetic]");

  buttons.forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "translate(0, 0)";
    });
  });
}

initMagneticButtons();

// ========== ANIMATED COUNTER ==========
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current);
  }, 16);
}

// ========== INTERACTIVE BACKGROUND ==========
function initInteractiveBackground() {
  const canvas = document.createElement("canvas");
  canvas.id = "interactiveBg";
  canvas.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    pointer-events: none;
  `;
  document.body.prepend(canvas);

  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  let mouseX = 0,
    mouseY = 0;

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 3 + 1;
      this.speedX = Math.random() * 2 - 1;
      this.speedY = Math.random() * 2 - 1;
      this.color = `hsla(${Math.random() * 60 + 320}, 100%, 70%, 0.5)`;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      const dx = mouseX - this.x;
      const dy = mouseY - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 100) {
        const angle = Math.atan2(dy, dx);
        this.x -= Math.cos(angle) * 2;
        this.y -= Math.sin(angle) * 2;
      }

      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  for (let i = 0; i < 50; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle) => {
      particle.update();
      particle.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// Initialize on desktop
if (window.innerWidth > 768) {
  initInteractiveBackground();
}

// ========== EXPORT FUNCTIONS ==========
window.advancedFeatures = {
  createFloatingElement,
  playSound,
  animateCounter,
  TextScramble,
};

console.log("🎨 Advanced animations and features loaded!");
