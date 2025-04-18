document.addEventListener("DOMContentLoaded", function () {
  // ======= TAGLINE EFFECT =======
  document.querySelector('.logo-typewriter').textContent =
    "Analyzing the World, One Byte at a Time";

  // ======= HAMBURGER MENU TOGGLE =======
  window.toggleMenu = function () {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    const body = document.body;

    menu.classList.toggle("open");
    icon.classList.toggle("open");

    if (menu.classList.contains("open")) {
      body.classList.add("menu-open");
    } else {
      body.classList.remove("menu-open");
    }
  };

  // ======= EXPERIENCE TOGGLE DETAILS =======
  window.toggleDetails = function (button) {
    if (!button) return;
    const details = button.nextElementSibling;
    if (!details) return;

    const isHidden = details.classList.contains("hidden");
    details.classList.toggle("hidden");
    button.textContent = isHidden ? "Hide Details" : "Show Details";
  };

  // ======= LANGUAGE TOGGLE (Impressum Page) =======
  window.toggleLanguage = function (lang) {
    const en = document.getElementById("imprint-en");
    const de = document.getElementById("imprint-de");
    if (en && de) {
      en.style.display = lang === "en" ? "block" : "none";
      de.style.display = lang === "de" ? "block" : "none";
    }
  };

  // ======= ROTATING TAGLINE (SMOOTH FADE) =======
  const taglines = [
    "The Beautiful Game, Explained with Data.",
    "Where Code Meets the Game.",
    "Powered by Python. Inspired by Football."
  ];
  let index = 0;
  const taglineElement = document.getElementById("tagline");

  function rotateTagline() {
    if (!taglineElement) return;
    taglineElement.classList.add("fade-out");
    setTimeout(() => {
      taglineElement.textContent = taglines[index];
      taglineElement.classList.remove("fade-out");
      index = (index + 1) % taglines.length;
    }, 500);
  }

  rotateTagline();
  setInterval(rotateTagline, 4000);

  // ======= NAVBAR SCROLL BEHAVIOR =======
  let lastScrollTop = 0;
  const desktopNav = document.getElementById("desktop-nav");
  // we no longer need to touch the hamburger icon here
  // const hamburgerIcon = document.querySelector(".hamburger-icon");

  function setDesktopStyles(opacity, translateY, pointer) {
    if (!desktopNav) return;
    desktopNav.style.opacity       = opacity;
    desktopNav.style.transform     = `translateY(${translateY})`;
    desktopNav.style.pointerEvents = pointer;
  }

  let ticking = false;

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const currentScroll   = window.pageYOffset || document.documentElement.scrollTop;
        const isScrollingDown = currentScroll > lastScrollTop;

        setDesktopStyles(
          isScrollingDown ? "0" : "1",
          isScrollingDown ? "-20px" : "0",
          isScrollingDown ? "none" : "auto"
        );

        lastScrollTop = Math.max(0, currentScroll);
        ticking = false;
      });
      ticking = true;
    }
  });

});
