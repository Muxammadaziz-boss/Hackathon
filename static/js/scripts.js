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
  initContactForm();
  initTelegramValidation();
  initTiltCards();
  initScrollProgress();
  initTypingEffect();
  initCustomCursor();
  initAdvancedReveal();
  initHeroParticles();
  initTestimonialCarousel();
  initMagneticButtons();
  initMatrixEasterEgg();
  initBackToTopCircle();
  initCustomContextMenu();
  initImageMagnifier();
});

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

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

function initScrollProgress() {
  const progressBar = document.getElementById("scroll-progress") || document.querySelector(".scroll-progress");
  if (!progressBar) return;

  const updateProgress = () => {
    const scrollPx = document.documentElement.scrollTop;
    const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (winHeightPx > 0) {
      const scrolled = (scrollPx / winHeightPx) * 100;
      progressBar.style.width = scrolled + "%";
    }
  };

  window.addEventListener("scroll", updateProgress, { passive: true });
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
  const rawTarget = String(counter.dataset.target || "0");
  const suffix = counter.dataset.suffix || "";
  
  if (isNaN(parseFloat(rawTarget))) {
    counter.textContent = rawTarget + suffix;
    return;
  }

  const numericMatch = rawTarget.match(/(\d+(\.\d+)?)/);
  if (!numericMatch) {
    counter.textContent = rawTarget + suffix;
    return;
  }

  const target = parseFloat(numericMatch[0]);
  const extraSuffix = rawTarget.replace(numericMatch[0], "") + suffix;
  const duration = 1600;
  const start = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(target * eased);
    counter.textContent = current + extraSuffix;

    const scale = 1 + (Math.sin(progress * Math.PI) * 0.1);
    counter.style.transform = `scale(${scale})`;

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      counter.style.transform = "scale(1)";
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
    const telegram = String(formData.get("telegram") || "").trim();
    const selectedPlan = String(formData.get("selected_plan") || "").trim();
    const grade = String(formData.get("grade") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!name || !phone) {
      setFormStatus(status, "Ism va telefon maydonlarini to'ldiring.", false);
      return;
    }

    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Yuborilmoqda';

    try {
      const csrftoken = getCookie('csrftoken');
      const response = await fetch("/api/send_contact/", {
        method: "POST",
        headers: {
            "X-CSRFToken": csrftoken
        },
        body: new URLSearchParams({
          name,
          phone,
          telegram,
          selected_plan: selectedPlan,
          grade,
          message,
        }),
      });

      const result = await response.json();
      setFormStatus(status, result.message, Boolean(result.success));

      if (result.success) {
        form.reset();
        if (typeof triggerConfetti === "function") triggerConfetti();
      }
    } catch (error) {
      setFormStatus(status, "Xatolik yuz berdi. Qayta urinib ko'ring.", false);
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = '<i class="fas fa-paper-plane mr-2"></i>Yuborish';
    }
  });
}

function setFormStatus(element, message, success) {
  element.classList.remove("hidden", "bg-red-100", "text-red-700", "bg-green-100", "text-green-700");
  element.classList.add(success ? "bg-green-100" : "bg-red-100");
  element.classList.add(success ? "text-green-700" : "text-red-700");
  element.textContent = message;
}

function initTelegramValidation() {
  const telegramInput = document.getElementById("telegram");
  if (!telegramInput) return;

  const statusEl = document.createElement("div");
  statusEl.id = "telegram-status";
  statusEl.className = "mt-2 flex items-center gap-2 text-sm transition-all duration-300";
  statusEl.style.minHeight = "24px";
  telegramInput.parentNode.appendChild(statusEl);

  let debounceTimer = null;
  let lastCheckedValue = "";

  telegramInput.addEventListener("input", () => {
    const value = telegramInput.value.trim();
    if (!value) {
      clearTelegramStatus(telegramInput, statusEl);
      lastCheckedValue = "";
      return;
    }

    statusEl.innerHTML = '<i class="fas fa-circle-notch fa-spin text-slate-400"></i><span class="text-slate-400">Tekshirilmoqda...</span>';
    telegramInput.classList.remove("border-green-500", "border-red-400");
    telegramInput.classList.add("border-blue-400");

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      validateTelegram(value, telegramInput, statusEl);
    }, 800);
  });

  telegramInput.addEventListener("blur", () => {
    const value = telegramInput.value.trim();
    if (value && value !== lastCheckedValue) {
      clearTimeout(debounceTimer);
      validateTelegram(value, telegramInput, statusEl);
    }
  });

  async function validateTelegram(value, input, status) {
    if (value === lastCheckedValue) return;
    lastCheckedValue = value;

    const clientCheck = clientSideValidate(value);
    if (!clientCheck.passToServer) {
      showTelegramResult(input, status, clientCheck.valid, clientCheck.message);
      return;
    }

    status.innerHTML = '<i class="fas fa-circle-notch fa-spin text-blue-500"></i><span class="text-blue-500">Telegram tekshirilmoqda...</span>';
    input.classList.remove("border-green-500", "border-red-400");
    input.classList.add("border-blue-400");

    try {
      const csrftoken = getCookie('csrftoken');
      const response = await fetch("/api/check_telegram/", {
        method: "POST",
        headers: {
            "X-CSRFToken": csrftoken
        },
        body: new URLSearchParams({ telegram: value }),
      });

      const result = await response.json();
      showTelegramResult(input, status, result.valid, result.message);
    } catch (error) {
      showTelegramResult(input, status, false, "⚠️ Tekshirishda xatolik. Qayta urinib ko'ring.");
    }
  }

  function clientSideValidate(value) {
    if (/^\+?\d/.test(value)) {
      const cleanPhone = value.replace(/[\s\-]/g, "");
      if (cleanPhone.length < 10) return { passToServer: false, valid: false, message: "❌ Telefon raqam juda qisqa." };
      if (cleanPhone.length > 15) return { passToServer: false, valid: false, message: "❌ Telefon raqam juda uzun." };
      return { passToServer: true };
    }

    let username = value;
    if (username.startsWith("@")) username = username.substring(1);

    if (username.length < 5) return { passToServer: false, valid: false, message: "❌ Username kamida 5 belgi bo'lishi kerak." };
    if (username.length > 32) return { passToServer: false, valid: false, message: "❌ Username 32 belgidan oshmasligi kerak." };
    if (!/^[a-zA-Z][a-zA-Z0-9_]*$/.test(username)) return { passToServer: false, valid: false, message: "❌ Username faqat harf, raqam va _ bo'lishi kerak (harf bilan boshlanishi shart)." };
    return { passToServer: true };
  }

  function showTelegramResult(input, status, valid, message) {
    input.classList.remove("border-blue-400", "border-green-500", "border-red-400");
    if (valid) {
      input.classList.add("border-green-500");
      status.innerHTML = `<i class="fas fa-check-circle text-green-600"></i><span class="text-green-600">${message}</span>`;
    } else {
      input.classList.add("border-red-400");
      status.innerHTML = `<i class="fas fa-times-circle text-red-500"></i><span class="text-red-500">${message}</span>`;
    }
  }

  function clearTelegramStatus(input, status) {
    input.classList.remove("border-blue-400", "border-green-500", "border-red-400");
    status.innerHTML = "";
  }
}

function initTiltCards() {
  const cards = document.querySelectorAll(".card-hover");
  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;
      card.style.transform = `perspective(1000px) scale(1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      card.style.boxShadow = `${-rotateY * 2}px ${rotateX * 2}px 30px rgba(0, 0, 0, 0.1)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = `perspective(1000px) scale(1) rotateX(0deg) rotateY(0deg)`;
      card.style.boxShadow = "";
    });
  });
}

function initTypingEffect() {
  const typingText = document.querySelector(".typing-text");
  if (!typingText) return;
  const words = ["Dasturlash", "Ingliz tili", "SAT", "Dizayn"];
  let wordIndex = 0, charIndex = 0, isDeleting = false, typeSpeed = 200;
  function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      typingText.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 100;
    } else {
      typingText.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 200;
    }
    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      typeSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 500;
    }
    setTimeout(type, typeSpeed);
  }
  type();
}

function initCustomCursor() {
  const cursorDot = document.querySelector(".cursor-dot");
  const cursorOutline = document.querySelector(".cursor-outline");
  if (!cursorDot || !cursorOutline) return;
  window.addEventListener("mousemove", (e) => {
    const posX = e.clientX, posY = e.clientY;
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;
    cursorOutline.animate({ left: `${posX}px`, top: `${posY}px` }, { duration: 500, fill: "forwards" });
  });
}

function initAdvancedReveal() {
  const revealElements = document.querySelectorAll('.reveal-left, .reveal-right');
  if (!revealElements.length) return;
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  revealElements.forEach(el => revealObserver.observe(el));
}

function initHeroParticles() {
  const canvas = document.getElementById('hero-particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  let width, height;
  function resize() {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  }
  window.addEventListener('resize', resize);
  resize();
  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.size = Math.random() * 2;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.fill();
    }
  }
  for (let i = 0; i < 50; i++) particles.push(new Particle());
  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }
  animate();
}

function initTestimonialCarousel() {
    // Logic for carousel if needed
}
function initMagneticButtons() {}
function initMatrixEasterEgg() {}
function initBackToTopCircle() {}
function initCustomContextMenu() {}
function initImageMagnifier() {}
