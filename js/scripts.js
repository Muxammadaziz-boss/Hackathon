document.addEventListener("DOMContentLoaded", () => {
  initPreloader();
  initMobileMenu();
  initDarkMode();
  initNavbarShadow();
  initFadeIn();
  initCounters();
  initAccordion();
  initPlanSelection();
  initSmoothScroll();
  initActiveNav();
  initContactForm();
});

function initPreloader() {
  const preloader = document.getElementById("preloader");
  const bar = document.getElementById("preloader-bar");
  const percentEl = document.getElementById("preloader-percent");

  if (!preloader || !bar) {
    return;
  }

  if (sessionStorage.getItem("preloaderShown")) {
    preloader.remove();
    return;
  }

  let progress = 0;
  const targetProgress = 100;
  const duration = 2500;
  const startTime = performance.now();

  const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

  const animate = (currentTime) => {
    const elapsed = currentTime - startTime;
    const rawProgress = Math.min(elapsed / duration, 1);
    progress = Math.round(easeOutQuart(rawProgress) * targetProgress);

    bar.style.width = progress + "%";
    if (percentEl) {
      percentEl.textContent = progress + "%";
    }

    if (rawProgress < 1) {
      requestAnimationFrame(animate);
    } else {
      if (percentEl) {
        percentEl.textContent = "100%";
      }
      setTimeout(() => {
        preloader.style.opacity = "0";
        preloader.style.transition = "opacity 0.6s ease";
        setTimeout(() => {
          preloader.remove();
          sessionStorage.setItem("preloaderShown", "1");
        }, 600);
      }, 300);
    }
  };

  requestAnimationFrame(animate);
}

function initMobileMenu() {
  const button = document.getElementById("mobile-menu-btn");
  const menu = document.getElementById("mobile-menu");

  if (!button || !menu) {
    return;
  }

  button.addEventListener("click", () => {
    const isOpen = !menu.classList.contains("hidden");
    menu.classList.toggle("hidden");
    button.setAttribute("aria-expanded", String(!isOpen));
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.add("hidden");
      button.setAttribute("aria-expanded", "false");
    });
  });
}

function initDarkMode() {
  const root = document.documentElement;
  const buttons = [
    document.getElementById("dark-mode-toggle"),
    document.getElementById("mobile-dark-mode-toggle"),
  ].filter(Boolean);
  const icons = [
    document.getElementById("dark-mode-icon"),
    document.getElementById("mobile-dark-mode-icon"),
  ].filter(Boolean);

  if (!buttons.length) {
    return;
  }

  const syncUI = () => {
    const isDark = root.classList.contains("dark");

    icons.forEach((icon) => {
      icon.classList.toggle("fa-moon", !isDark);
      icon.classList.toggle("fa-sun", isDark);
    });

    buttons.forEach((button) => {
      button.setAttribute("aria-pressed", String(isDark));
    });
  };

  const applyTheme = (theme) => {
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
    syncUI();
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      applyTheme(root.classList.contains("dark") ? "light" : "dark");
    });
  });

  syncUI();
}

function initNavbarShadow() {
  const navbar = document.getElementById("navbar");

  if (!navbar) {
    return;
  }

  const updateNavbar = () => {
    navbar.classList.toggle("navbar-scrolled", window.scrollY > 12);
  };

  updateNavbar();
  window.addEventListener("scroll", updateNavbar, { passive: true });
}

function initFadeIn() {
  const elements = document.querySelectorAll(".fade-in");

  if (!elements.length) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  elements.forEach((element, index) => {
    element.style.transitionDelay = `${Math.min(index * 0.06, 0.3)}s`;
    observer.observe(element);
  });
}

function initCounters() {
  const counters = document.querySelectorAll(".counter");

  if (!counters.length) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        counters.forEach((counter) => animateCounter(counter));
        observer.disconnect();
      });
    },
    { threshold: 0.35 },
  );

  observer.observe(counters[0]);
}

function animateCounter(counter) {
  const target = Number(counter.dataset.target || 0);
  const suffix = counter.dataset.suffix || "";
  const duration = 1600;
  const start = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    counter.textContent = Math.round(target * eased) + suffix;

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  };

  requestAnimationFrame(tick);
}

function initAccordion() {
  const accordions = document.querySelectorAll(".accordion");

  accordions.forEach((button) => {
    button.addEventListener("click", () => {
      const content = button.nextElementSibling;
      const icon = button.querySelector(".faq-icon");
      const isOpen = content.style.maxHeight;

      accordions.forEach((otherButton) => {
        const otherContent = otherButton.nextElementSibling;
        const otherIcon = otherButton.querySelector(".faq-icon");
        if (otherContent !== content) {
          otherContent.style.maxHeight = null;
          otherIcon?.classList.remove("active");
        }
      });

      if (isOpen) {
        content.style.maxHeight = null;
        icon?.classList.remove("active");
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
        icon?.classList.add("active");
      }
    });
  });
}

function initPlanSelection() {
  const buttons = document.querySelectorAll(".plan-select-btn");
  const selectedPlanInput = document.getElementById("selected_plan");
  const selectedPlanSelect = document.getElementById("selected_plan_select");
  const customPlanWrapper = document.getElementById("custom-plan-wrapper");
  const customPlanInput = document.getElementById("custom_plan");
  const contactSection = document.getElementById("contact");
  const nameInput = document.getElementById("name");
  const messageInput = document.getElementById("message");

  if (!selectedPlanInput || !selectedPlanSelect || !contactSection) {
    return;
  }

  const syncSelectedPlan = () => {
    const selectValue = selectedPlanSelect.value;
    const isCustom = selectValue === "Boshqa";

    customPlanWrapper?.classList.toggle("hidden", !isCustom);

    if (isCustom) {
      selectedPlanInput.value = customPlanInput?.value.trim() || "";
      return;
    }

    if (customPlanInput) {
      customPlanInput.value = "";
    }

    selectedPlanInput.value = selectValue;
  };

  selectedPlanSelect.addEventListener("change", () => {
    syncSelectedPlan();

    if (selectedPlanSelect.value === "Boshqa") {
      customPlanInput?.focus();
    }
  });

  customPlanInput?.addEventListener("input", () => {
    if (selectedPlanSelect.value === "Boshqa") {
      selectedPlanInput.value = customPlanInput.value.trim();
    }
  });

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const plan = button.dataset.plan || "";

      selectedPlanSelect.value = plan;
      syncSelectedPlan();

      if (messageInput && !messageInput.value.trim()) {
        messageInput.value = `${plan} bo'yicha ma'lumot olmoqchiman.`;
      }

      contactSection.scrollIntoView({ behavior: "smooth", block: "start" });

      window.setTimeout(() => {
        nameInput?.focus();
      }, 400);
    });
  });

  syncSelectedPlan();
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const targetSelector = anchor.getAttribute("href");
      const target = document.querySelector(targetSelector);

      if (!target) {
        return;
      }

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function initActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const links = document.querySelectorAll(".nav-link");

  if (!sections.length || !links.length) {
    return;
  }

  const updateActiveLink = () => {
    let current = "home";

    sections.forEach((section) => {
      const top = section.offsetTop - 140;
      const bottom = top + section.offsetHeight;

      if (window.scrollY >= top && window.scrollY < bottom) {
        current = section.id;
      }
    });

    links.forEach((link) => {
      link.classList.toggle(
        "text-primary",
        link.getAttribute("href") === `#${current}`,
      );
    });
  };

  updateActiveLink();
  window.addEventListener("scroll", updateActiveLink, { passive: true });
}

function initContactForm() {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  if (!form || !status) {
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const selectedPlan = String(formData.get("selected_plan") || "").trim();
    const grade = String(formData.get("grade") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!name || !phone) {
      setFormStatus(status, "Ism va telefon maydonlarini to'ldiring.", false);
      return;
    }

    submitButton.disabled = true;
    submitButton.innerHTML =
      '<i class="fas fa-spinner fa-spin mr-2"></i>Yuborilmoqda';

    try {
      const response = await fetch("send.php", {
        method: "POST",
        body: new URLSearchParams({
          name,
          phone,
          selected_plan: selectedPlan,
          grade,
          message,
        }),
      });

      const result = await response.json();
      setFormStatus(status, result.message, Boolean(result.success));

      if (result.success) {
        form.reset();
      }
    } catch (error) {
      setFormStatus(status, "Xatolik yuz berdi. Qayta urinib ko'ring.", false);
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML =
        '<i class="fas fa-paper-plane mr-2"></i>Yuborish';
    }
  });
}

function setFormStatus(element, message, success) {
  element.classList.remove(
    "hidden",
    "bg-red-100",
    "text-red-700",
    "bg-green-100",
    "text-green-700",
  );
  element.classList.add(success ? "bg-green-100" : "bg-red-100");
  element.classList.add(success ? "text-green-700" : "text-red-700");
  element.textContent = message;
}
