/* Theme toggle with localStorage */
(function () {
  const themeToggle = document.getElementById("theme-toggle");
  const themeStatus = document.getElementById("theme-status");
  const footerThemeLabel = document.getElementById("footer-theme-label");
  const footerThemeValue = document.getElementById("footer-theme-value");
  const htmlEl = document.documentElement;

  const SAVED_KEY = "resume-theme";
  const DARK = "dark";
  const LIGHT = "light";

  function setTheme(theme) {
    if (theme === DARK) {
      htmlEl.setAttribute("data-theme", DARK);
      if (themeStatus) themeStatus.textContent = "Light mode";
      if (footerThemeValue) footerThemeValue.textContent = "on";
    } else {
      htmlEl.removeAttribute("data-theme");
      if (themeStatus) themeStatus.textContent = "Dark mode";
      if (footerThemeValue) footerThemeValue.textContent = "off";
    }
  }

  function toggleTheme() {
    const isDark = htmlEl.hasAttribute("data-theme");
    const next = isDark ? LIGHT : DARK;
    setTheme(next);
    try {
      localStorage.setItem(SAVED_KEY, next);
    } catch (e) {
      /* localStorage unavailable; ignore */
    }
  }

  function initTheme() {
    let saved;
    try {
      saved = localStorage.getItem(SAVED_KEY);
    } catch (e) {
      saved = null;
    }
    if (saved === DARK || saved === LIGHT) {
      setTheme(saved);
    } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme(DARK);
    } else {
      setTheme(LIGHT);
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }
  initTheme();
})();

/* Mobile menu */
(function () {
  const btn = document.getElementById("nav-menu-btn");
  const list = document.querySelector(".nav-list");
  const links = document.querySelectorAll(".nav-link");

  if (!btn || !list) return;

  function toggleMenu() {
    const open = list.classList.toggle("open");
    btn.setAttribute("aria-expanded", open);
  }

  btn.addEventListener("click", toggleMenu);

  links.forEach((link) => {
    link.addEventListener("click", () => {
      list.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    });
  });
})();

/* Sticky header shadow on scroll */
(function () {
  const header = document.getElementById("header");
  if (!header) return;
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      header.style.boxShadow = "var(--shadow)";
    } else {
      header.style.boxShadow = "none";
    }
  });
})();

/* Smooth reveal on scroll using Intersection Observer */
(function () {
  const observerOptions = {
    threshold: 0.12,
    rootMargin: "0px 0px -60px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-active");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".reveal").forEach((el) => {
    observer.observe(el);
  });
})();

/* Project filter tabs */
(function () {
  const btns = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".project-card");

  if (!btns.length || !cards.length) return;

  function filter(category) {
    btns.forEach((b) => {
      const active = b.dataset.category === category;
      b.classList.toggle("active", active);
      b.setAttribute("aria-selected", active);
    });

    cards.forEach((card) => {
      const match = category === "all" || card.dataset.category === category;
      if (match) {
        card.classList.remove("hide");
        setTimeout(() => card.classList.remove("fade-out"), 60);
      } else {
        card.classList.add("fade-out");
        setTimeout(() => card.classList.add("hide"), 300);
      }
    });
  }

  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filter(btn.dataset.category);
    });
  });
})();

/* Current year in footer */
(function () {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
})();
