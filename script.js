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
    // Toggle privacy policy sections
    const privacyEn = document.getElementById("privacy-en");
    const privacyDe = document.getElementById("privacy-de");
    if (privacyEn && privacyDe) {
      privacyEn.style.display = lang === "en" ? "block" : "none";
      privacyDe.style.display = lang === "de" ? "block" : "none";
    }
  
    // Toggle imprint sections
    const imprintEn = document.getElementById("imprint-en");
    const imprintDe = document.getElementById("imprint-de");
    if (imprintEn && imprintDe) {
      imprintEn.style.display = lang === "en" ? "block" : "none";
      imprintDe.style.display = lang === "de" ? "block" : "none";
    }
  
    // Toggle cookie consent banner language
    const cookieEn = document.getElementById("cookie-text-en");
    const cookieDe = document.getElementById("cookie-text-de");
    if (cookieEn && cookieDe) {
      cookieEn.style.display = lang === "en" ? "block" : "none";
      cookieDe.style.display = lang === "de" ? "block" : "none";
    }
  };

  // —— BACK‑TO‑TOP CLICK ——  
  backToTopBtn?.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" })
  );

  // —— SECTION ARROW NAVIGATION ——  
  sectionArrows.forEach(arrow => {
    arrow.addEventListener("click", () => {
      if (arrow.classList.contains("back-to-top")) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const nextSection = arrow.closest("section")?.nextElementSibling;
        nextSection?.scrollIntoView({ behavior: "smooth" });
      }
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
// —— Track Virtual Pageviews or Events —— 
window.addEventListener('DOMContentLoaded', () => {
  const downloadBtn = document.getElementById('download-btn');
  if (!downloadBtn) return;

  downloadBtn.addEventListener('click', () => {
    // send the custom GA4 event
    gtag('event', 'download_cv', {
      method: 'button_click'
    });
  });
});

// —— Consent Opt-in & GA loader (Multilingual) —— 
(function () {
  const banner     = document.getElementById('cookie-consent-banner');
  const acceptBtn  = document.getElementById('accept-cookies');
  const declineBtn = document.getElementById('decline-cookies');
  const manageBtn  = document.getElementById('manage-cookies');
  const GA_ID      = 'G-QKQ0F9HJ5M'; // Replace with your actual GA ID
  const consent    = localStorage.getItem('cookieConsent');
  const lang       = navigator.language || navigator.userLanguage;

  // Language toggle
  if (lang.startsWith('de')) {
    document.getElementById('cookie-text-en')?.style.setProperty('display', 'none');
    document.getElementById('cookie-text-de')?.style.setProperty('display', 'block');
  } else {
    document.getElementById('cookie-text-en')?.style.setProperty('display', 'block');
    document.getElementById('cookie-text-de')?.style.setProperty('display', 'none');
  }

  function initGA() {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };

    gtag('js', new Date());
    gtag('config', GA_ID, {
      anonymize_ip: true,
      page_path: window.location.pathname
    });
  }

  if (!consent) {
    banner.style.display = 'block';
  } else if (consent === 'accepted') {
    initGA();
  }

  acceptBtn?.addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'accepted');
    banner.style.display = 'none';
    initGA();
  });

  declineBtn?.addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'declined');
    banner.style.display = 'none';
  });

  manageBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('cookieConsent');
    banner.style.display = 'block';
  });
})();


// —— Current Year Function - Copyright —— 
document.getElementById('year').textContent = new Date().getFullYear();
