// ===== Year in footer =====
document.getElementById("year").textContent = new Date().getFullYear();

// ===== Mobile nav (optional) =====
const burger = document.querySelector(".nav-burger");
const links = document.querySelector(".nav-links");
if (burger) {
  burger.addEventListener("click", () => {
    links.classList.toggle("open");
  });
}

// ===== Smooth Scroll =====
document.querySelectorAll('.nav-link').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ===== Theme Toggle (Dark / Light) =====
const toggle = document.getElementById("theme-toggle");
const rootBody = document.body;

// Remember last theme
const savedTheme = localStorage.getItem("vv-theme");
if (savedTheme) rootBody.className = savedTheme;

toggle.addEventListener("click", () => {
  rootBody.classList.toggle("theme-light");
  rootBody.classList.toggle("theme-dark");
  const isLight = rootBody.classList.contains("theme-light");
  // swap icon
  const icon = toggle.querySelector("i");
  icon.className = isLight ? "fa-solid fa-sun" : "fa-solid fa-moon";
  // persist
  localStorage.setItem("vv-theme", rootBody.className);
});
// set correct icon on load
(function syncIcon(){
  const icon = toggle.querySelector("i");
  icon.className = rootBody.classList.contains("theme-light")
    ? "fa-solid fa-sun"
    : "fa-solid fa-moon";
})();

// ===== GSAP Animations =====
window.addEventListener("load", () => {
  if (!window.gsap) return;

  gsap.from(".hero-title", { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" });
  gsap.from(".hero-tag",   { y: 20, opacity: 0, duration: 0.7, delay: 0.1 });
  gsap.from(".hero-sub",   { y: 20, opacity: 0, duration: 0.7, delay: 0.2 });
  gsap.from(".resume-btn",   { y: 60,  opacity: 0.7,duration: 1,ease: "back.out(1.7)",  delay: 1.5});


  // Scroll animations
  if (gsap.ScrollTrigger) {
    gsap.utils.toArray(".section .section-title").forEach(el => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: "top 85%" },
        y: 20, opacity: 0, duration: 0.6, ease: "power2.out"
      });
    });

    gsap.utils.toArray(".card").forEach(card => {
      gsap.from(card, {
        scrollTrigger: { trigger: card, start: "top 80%" },
        y: 24, opacity: 0, duration: 0.6, ease: "power2.out"
      });
    });
  }
});

// ===== Progress Bars on Scroll =====
const fills = document.querySelectorAll(".fill");
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const pct = el.getAttribute("data-progress");
      el.style.transition = "width 1.2s ease";
      el.style.width = pct + "%";
      io.unobserve(el);
    }
  });
}, { threshold: 0.35 });

fills.forEach(f => io.observe(f));

// ===== Contact Form Validation =====
const form = document.getElementById("contact-form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const [name, email] = form.querySelectorAll("input");
    const message = form.querySelector("textarea");

    const valid =
      name.value.trim().length > 1 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value) &&
      message.value.trim().length > 2;

    if (!valid) {
      alert("Please fill all fields correctly.");
      return;
    }
    alert("Message sent successfully!");
    form.reset();
  });
}
