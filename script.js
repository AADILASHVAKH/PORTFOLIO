// ====== PARTICLE CANVAS ======
const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");
let particles = [];
const PARTICLE_COUNT = 60;

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

function createParticle() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    r: Math.random() * 1.5 + 0.5,
    alpha: Math.random() * 0.4 + 0.1,
    color: Math.random() > 0.7 ? "#e63946" : "#ffffff",
  };
}

for (let i = 0; i < PARTICLE_COUNT; i++) {
  particles.push(createParticle());
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.globalAlpha = p.alpha;
    ctx.fill();

    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
  });

  // Draw connecting lines
  ctx.globalAlpha = 1;
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(230, 57, 70, ${0.06 * (1 - dist / 120)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(drawParticles);
}
drawParticles();

// ====== TYPING EFFECT ======
const titles = [
  "Java Full Stack Developer",
  "Android App Developer",
  "Web Developer",
  "Backend Engineer",
];
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const el = document.getElementById("typedTitle");

function typeText() {
  const current = titles[titleIndex];
  if (!isDeleting) {
    el.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(typeText, 2000);
      return;
    }
    setTimeout(typeText, 70);
  } else {
    el.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      setTimeout(typeText, 300);
      return;
    }
    setTimeout(typeText, 40);
  }
}
typeText();

// ====== NAVBAR ======
const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 20);
  updateActiveNav();
});

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  const spans = hamburger.querySelectorAll("span");
  navLinks.classList.contains("open")
    ? ((spans[0].style.transform = "rotate(45deg) translate(5px, 5px)"),
      (spans[1].style.opacity = "0"),
      (spans[2].style.transform = "rotate(-45deg) translate(5px, -5px)"))
    : ((spans[0].style.transform = ""),
      (spans[1].style.opacity = ""),
      (spans[2].style.transform = ""));
});

// Close mobile menu on link click
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    const spans = hamburger.querySelectorAll("span");
    spans[0].style.transform = "";
    spans[1].style.opacity = "";
    spans[2].style.transform = "";
  });
});

// ====== ACTIVE NAV HIGHLIGHT ======
const sections = document.querySelectorAll("section[id]");

function updateActiveNav() {
  const scrollY = window.scrollY + 100;
  sections.forEach((section) => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute("id");
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) {
      link.classList.toggle("active", scrollY >= top && scrollY < bottom);
    }
  });
}
updateActiveNav();

// ====== SCROLL ANIMATIONS (Intersection Observer) ======
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.1 },
);

document.querySelectorAll(".project-card").forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.08}s`;
  observer.observe(card);
});

// ====== CONTACT FORM ======
const form = document.getElementById("contactForm");
const toast = document.getElementById("toast");
const submitBtn = document.getElementById("submitBtn");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("nameInput").value.trim();
  const email = document.getElementById("emailInput").value.trim();
  const message = document.getElementById("messageInput").value.trim();

  if (!name || !email || !message) return;

  // Simulate sending
  submitBtn.innerHTML = "<span>Sending...</span>";
  submitBtn.disabled = true;

  setTimeout(() => {
    form.reset();
    submitBtn.innerHTML =
      '<span>Send Message</span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>';
    submitBtn.disabled = false;
    showToast();
  }, 1200);
});

function showToast() {
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3500);
}

// ====== SMOOTH SCROLL ======
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// ====== ORBIT ANIMATION SYSTEM ======
(function () {
  function setupOrbit(groupId, radius, speed, startAngle) {
    const group = document.getElementById(groupId);
    if (!group) return null;
    const icons = group.querySelectorAll(".orbit-icon");
    const count = icons.length;
    const angleStep = (2 * Math.PI) / count;
    let angle = startAngle || 0;

    return {
      update: function () {
        angle += speed;
        icons.forEach((icon, i) => {
          const a = angle + i * angleStep;
          const x = Math.cos(a) * radius - 24;
          const y = Math.sin(a) * radius - 24;
          icon.style.transform = `translate(${x}px, ${y}px)`;
        });
      },
    };
  }

  const isMobile = window.innerWidth <= 768;
  const innerRadius = isMobile ? 120 : 170;
  const outerRadius = isMobile ? 170 : 240;
  const innerOrbit = setupOrbit("orbitInner", innerRadius, 0.005, 0);
  const outerOrbit = setupOrbit("orbitOuter", outerRadius, -0.003, Math.PI / 8);

  function animateOrbits() {
    if (innerOrbit) innerOrbit.update();
    if (outerOrbit) outerOrbit.update();
    requestAnimationFrame(animateOrbits);
  }

  animateOrbits();
})();

// ====== PARALLAX SCROLL EFFECT ======
(function () {
  const heroAvatar = document.querySelector(".hero-avatar");
  const heroText = document.querySelector(".hero-text");
  const floatingDots = document.querySelectorAll(".floating-dot");
  let ticking = false;

  function updateParallax() {
    const scrollY = window.scrollY;
    if (heroAvatar) {
      heroAvatar.style.transform = `translateY(${scrollY * 0.1}px)`;
    }
    if (heroText) {
      heroText.style.transform = `translateY(${scrollY * 0.05}px)`;
    }
    floatingDots.forEach((dot, i) => {
      const speed = 0.15 + i * 0.05;
      dot.style.transform = `translateY(${scrollY * speed}px)`;
    });
    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }

  if (window.innerWidth > 768) {
    window.addEventListener("scroll", onScroll, { passive: true });
  }
})();
