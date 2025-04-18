document.addEventListener("DOMContentLoaded", () => {
  // —— CACHE ELEMENTS ——  
  const body           = document.body;
  const menuLinks      = document.querySelector(".menu-links");
  const hamburgerIcon  = document.querySelector(".hamburger-icon");
  const navBar         = document.querySelector("nav");
  const logoTyper      = document.querySelector(".logo-typewriter");
  const taglineEl      = document.getElementById("tagline");
  const backToTopBtn   = document.getElementById("back-to-top");
  const sectionArrows  = document.querySelectorAll(".section-arrow");
  const imprintEn      = document.getElementById("imprint-en");
  const imprintDe      = document.getElementById("imprint-de");

  // —— CONFIG & STATE ——  
  const mobileBreakpoint = 600;
  let lastY    = window.scrollY;
  let ticking  = false;

  // —— HELPERS ——  
  function fade(element, done) {
    element.classList.add("fade-out");
    setTimeout(() => {
      done();
      element.classList.remove("fade-out");
    }, 500);
  }

  function debounce(fn, delay = 200) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  }

  // —— INITIAL SETUP ——  
  // Reset menu state
  body.classList.remove("menu-open");
  menuLinks?.classList.remove("open");
  hamburgerIcon?.classList.remove("open");

  // Typewriter logo
  if (logoTyper) {
    logoTyper.textContent = "Analyzing the World, One Byte at a Time";
  }

  // Rotating taglines
  (function startTaglineRotation() {
    const texts = [
      "The Beautiful Game,<br>Explained with Data.",
      "Powered by Python.<br>Inspired by Football."
    ];
    let i = 0;

    // Show the first tagline immediately
    if (taglineEl) taglineEl.innerHTML = texts[0];

    setInterval(() => {
      if (!taglineEl) return;
      fade(taglineEl, () => {
        i = (i + 1) % texts.length;
        taglineEl.innerHTML = texts[i];
      });
    }, 4000);
  })();

  // —— SCROLL HANDLING (throttled) ——  
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(handleScroll);
      ticking = true;
    }
  }, { passive: true });

  function handleScroll() {
    const y = window.scrollY;
    const isMobile = window.innerWidth <= mobileBreakpoint;

    // 1) Mobile: slide hamburger up/down
    if (hamburgerIcon) {
      hamburgerIcon.style.transform = isMobile && y > lastY
        ? "translateY(-100%)"
        : "translateY(0)";
    }

    // 2) Desktop nav & hamburger hide/show
    [navBar, hamburgerIcon].forEach(el => {
      if (!el) return;
      const hiding = y > lastY;
      el.style.opacity       = hiding ? "0" : "1";
      el.style.transform     = hiding && !isMobile
        ? "translateY(-20px)"
        : "none";
      el.style.pointerEvents = hiding ? "none" : "auto";
    });

    // 3) Back‑to‑top visibility
    backToTopBtn?.classList.toggle("visible", y > 300);

    lastY = y;
    ticking = false;
  }

  // —— MENU TOGGLE ——  
  window.toggleMenu = () => {
    menuLinks?.classList.toggle("open");
    hamburgerIcon?.classList.toggle("open");
    body.classList.toggle(
      "menu-open",
      menuLinks?.classList.contains("open")
    );
  };

  // —— DETAILS EXPAND/COLLAPSE ——  
  window.toggleDetails = btn => {
    const details = btn.nextElementSibling;
    if (!details) return;
    const hidden = details.classList.toggle("hidden");
    btn.textContent = hidden ? "Hide Details" : "Show Details";
  };

  // —— LANGUAGE SWITCHER ——  
  window.toggleLanguage = lang => {
    if (imprintEn && imprintDe) {
      imprintEn.style.display = lang === "en" ? "block" : "none";
      imprintDe.style.display = lang === "de" ? "block" : "none";
    }
  };

  // —— BACK‑TO‑TOP CLICK ——  
  backToTopBtn?.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" })
  );

  // —— SECTION ARROW NAVIGATION ——  
  sectionArrows.forEach(arrow => {
    arrow.addEventListener("click", () => {
      const nextSection = arrow.closest("section")?.nextElementSibling;
      nextSection?.scrollIntoView({ behavior: "smooth" });
    });
  });

  // —— OPTIONAL RESIZE HANDLER ——  
  window.addEventListener(
    "resize",
    debounce(() => {
      // e.g. recalc breakpoints or reposition if needed
    }, 250)
  );
});
