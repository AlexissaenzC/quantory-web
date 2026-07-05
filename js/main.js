/* ==========================================================================
   Quantory — Lógica principal del sitio
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Iconos Lucide ---------- */
  if (window.lucide) lucide.createIcons();

  /* ---------- AOS ---------- */
  if (window.AOS) {
    AOS.init({ duration: 800, once: true, offset: 60, easing: "ease-out-cubic" });
  }

  /* ---------- Año en footer ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Loader ---------- */
  const loader = document.getElementById("loader");
  window.addEventListener("load", () => {
    setTimeout(() => loader && loader.classList.add("loader-hidden"), 350);
  });

  /* ---------- Modo oscuro / claro ---------- */
  const html = document.documentElement;
  const themeToggleBtns = document.querySelectorAll("[data-theme-toggle]");
  const applyThemeIcon = () => {
    const isDark = html.classList.contains("dark");
    themeToggleBtns.forEach((btn) => {
      btn.innerHTML = `<i data-lucide="${isDark ? "sun" : "moon"}" class="w-5 h-5"></i>`;
    });
    if (window.lucide) lucide.createIcons();
  };

  const savedTheme = localStorage.getItem("quantory-theme");
  if (savedTheme === "light") html.classList.remove("dark");
  else html.classList.add("dark");
  applyThemeIcon();

  themeToggleBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      html.classList.toggle("dark");
      localStorage.setItem("quantory-theme", html.classList.contains("dark") ? "dark" : "light");
      applyThemeIcon();
    });
  });

  /* ---------- Navbar: fondo al hacer scroll ---------- */
  const navbar = document.getElementById("navbar");
  const onScrollNav = () => {
    if (!navbar) return;
    if (window.scrollY > 20) navbar.classList.add("shadow-lg", "shadow-black/20");
    else navbar.classList.remove("shadow-lg", "shadow-black/20");
  };
  document.addEventListener("scroll", onScrollNav);
  onScrollNav();

  /* ---------- Resaltado de enlace activo ---------- */
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  const highlightNav = () => {
    let current = "";
    sections.forEach((section) => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) current = section.getAttribute("id");
    });
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
  };
  document.addEventListener("scroll", highlightNav);
  highlightNav();

  /* ---------- Menú móvil ---------- */
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  if (menuBtn && mobileMenu) {
    const closeMenu = () => {
      mobileMenu.style.maxHeight = "0px";
      mobileMenu.style.opacity = "0";
      menuBtn.setAttribute("aria-expanded", "false");
    };
    const openMenu = () => {
      mobileMenu.style.maxHeight = mobileMenu.scrollHeight + "px";
      mobileMenu.style.opacity = "1";
      menuBtn.setAttribute("aria-expanded", "true");
    };
    closeMenu();
    menuBtn.addEventListener("click", () => {
      const isOpen = mobileMenu.style.opacity === "1";
      isOpen ? closeMenu() : openMenu();
    });
    mobileMenu.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
  }

  /* ---------- Filtro de proyectos ---------- */
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.getAttribute("data-filter");
      projectCards.forEach((card) => {
        const match = filter === "todos" || card.getAttribute("data-category") === filter;
        card.setAttribute("data-hidden", match ? "false" : "true");
      });
    });
  });

  /* ---------- Modal de proyectos ---------- */
  const modal = document.getElementById("project-modal");
  if (modal) {
    const modalImage = modal.querySelector("[data-modal-image]");
    const modalTitle = modal.querySelector("[data-modal-title]");
    const modalDesc = modal.querySelector("[data-modal-desc]");
    const modalTech = modal.querySelector("[data-modal-tech]");

    const openModal = (card) => {
      modalTitle.textContent = card.getAttribute("data-name");
      modalDesc.textContent = card.getAttribute("data-full-desc");
      modalImage.className = card.getAttribute("data-gradient") + " w-full h-48 sm:h-56 rounded-xl flex items-center justify-center";
      modalImage.innerHTML = `<i data-lucide="${card.getAttribute("data-icon")}" class="w-14 h-14 text-white/90"></i>`;
      modalTech.innerHTML = card
        .getAttribute("data-tech")
        .split(",")
        .map((t) => `<span class="px-3 py-1 text-xs rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">${t.trim()}</span>`)
        .join("");
      modal.setAttribute("data-open", "true");
      document.body.classList.add("overflow-hidden");
      if (window.lucide) lucide.createIcons();
    };

    document.querySelectorAll("[data-open-modal]").forEach((btn) => {
      btn.addEventListener("click", () => openModal(btn.closest(".project-card")));
    });

    const closeModal = () => {
      modal.setAttribute("data-open", "false");
      document.body.classList.remove("overflow-hidden");
    };
    modal.querySelectorAll("[data-close-modal]").forEach((el) => el.addEventListener("click", closeModal));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModal();
    });
  }

  /* ---------- Modal de curso ---------- */
  const courseModal = document.getElementById("course-modal");
  if (courseModal) {
    const openCourseModal = () => {
      courseModal.setAttribute("data-open", "true");
      document.body.classList.add("overflow-hidden");
    };
    const closeCourseModal = () => {
      courseModal.setAttribute("data-open", "false");
      document.body.classList.remove("overflow-hidden");
    };
    document.querySelectorAll("[data-open-course-modal]").forEach((btn) => {
      btn.addEventListener("click", openCourseModal);
    });
    courseModal.querySelectorAll("[data-close-modal]").forEach((el) => el.addEventListener("click", closeCourseModal));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeCourseModal();
    });
  }

  /* ---------- Contador animado de KPIs ---------- */
  const counters = document.querySelectorAll("[data-count]");
  const animateCounter = (el) => {
    const target = parseFloat(el.getAttribute("data-count"));
    const suffix = el.getAttribute("data-suffix") || "";
    const duration = 1600;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      el.textContent = (target % 1 === 0 ? Math.floor(value) : value.toFixed(1)) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const counterObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  counters.forEach((el) => counterObserver.observe(el));

  /* ---------- Formulario de contacto ---------- */
  const contactForm = document.getElementById("contact-form");
  const toast = document.getElementById("toast");
  const toastIcon = toast ? toast.querySelector("[data-toast-icon]") : null;
  const toastText = toast ? toast.querySelector("[data-toast-text]") : null;

  const showToast = (ok, message) => {
    if (!toast) return;
    toastText.textContent = message;
    toastIcon.setAttribute("data-lucide", ok ? "check-circle" : "alert-circle");
    toastIcon.classList.toggle("text-green-400", ok);
    toastIcon.classList.toggle("text-red-400", !ok);
    if (window.lucide) lucide.createIcons();
    toast.classList.remove("translate-y-24", "opacity-0");
    setTimeout(() => toast.classList.add("translate-y-24", "opacity-0"), 3800);
  };

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.classList.add("opacity-60", "cursor-not-allowed");
      try {
        const res = await fetch(contactForm.action, {
          method: "POST",
          body: new FormData(contactForm),
        });
        const data = await res.json();
        showToast(data.ok, data.message);
        if (data.ok) contactForm.reset();
      } catch (err) {
        showToast(false, "No se pudo enviar el mensaje. Intenta más tarde.");
      } finally {
        submitBtn.disabled = false;
        submitBtn.classList.remove("opacity-60", "cursor-not-allowed");
      }
    });
  }
});
