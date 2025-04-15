// Toggle hamburger menu
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");

  if (menu && icon) {
    menu.classList.toggle("open");
    icon.classList.toggle("open");
  }
}

// Toggle job details in experience section
function toggleDetails(button) {
  if (!button) return;

  const details = button.nextElementSibling;
  if (!details) return;

  const isHidden = details.classList.contains("hidden");
  details.classList.toggle("hidden");
  button.textContent = isHidden ? "Hide Details" : "Show Details";
}

//Toogle between languages in impressum site
function toggleLanguage(lang) {
  document.getElementById("imprint-en").style.display = lang === "en" ? "block" : "none";
  document.getElementById("imprint-de").style.display = lang === "de" ? "block" : "none";
}

//Rotating taglines on the homepage
const taglines = [
  "The Beautiful Game, Explained with Data.",
  "Where Code Meets the Game.",
  "Powered by Python. Inspired by Football."
];
let index = 0;
const taglineElement = document.getElementById("tagline");

function rotateTagline() {
  taglineElement.textContent = taglines[index];
  index = (index + 1) % taglines.length;
}

rotateTagline();
setInterval(rotateTagline, 4000); // change every 4 seconds