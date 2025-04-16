document.addEventListener("DOMContentLoaded", function () {
  
  // ======= TAGLINE EFFECT =======
  document.querySelector('.logo-typewriter').textContent = "Analyzing the World, One Byte at a Time";

  
  // ======= HAMBURGER MENU TOGGLE =======
  function toggleMenu() {
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
  }

  window.addEventListener("DOMContentLoaded", () => {
    document.body.classList.remove("menu-open");
  
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
  
    if (menu) menu.classList.remove("open");
    if (icon) icon.classList.remove("open");
  });

  // ======= EXPERIENCE TOGGLE DETAILS =======
  window.toggleDetails = function (button) {
    if (!button) return;

    const details = button.nextElementSibling;
    if (!details) return;

    const isHidden = details.classList.contains("hidden");
    details.classList.toggle("hidden");
    button.textContent = isHidden ? "Hide Details" : "Show Details";
  };

  // ======= LANGUAGE TOGGLE (e.g. Impressum Page) =======
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

  // Step 1: Fade out
  taglineElement.classList.add("fade-out");

  // Step 2: Wait for fade-out to finish, then change text and fade back in
  setTimeout(() => {
    taglineElement.textContent = taglines[index];
    taglineElement.classList.remove("fade-out");
    index = (index + 1) % taglines.length;
  }, 500); // 500ms matches the CSS transition duration
}

// Initial call and interval
rotateTagline();
setInterval(rotateTagline, 4000); // Every 4s, with fade timing baked in

  // ======= NAVBAR SCROLL BEHAVIOR =======
  let lastScrollTop = 0;
  const navBar = document.querySelector("nav");

  function setNavStyles(opacity, translateY, pointer) {
    [navBar, hamburgerIcon].forEach(el => {
      if (el) {
        el.style.opacity = opacity;
        el.style.transform = `translateY(${translateY})`;
        el.style.pointerEvents = pointer;
      }
    });
  }

  let ticking = false;

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        const isScrollingDown = currentScroll > lastScrollTop;

        setNavStyles(
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


window.addEventListener("load", () => {
  document.body.classList.remove("menu-open");
  document.querySelector(".menu-links")?.classList.remove("open");
  document.querySelector(".hamburger-icon")?.classList.remove("open");
});
