const text = "Bienvenue sur mon portfolio ! Découvrez mon CV, mes projets et comment me contacter.";
let i = 0;
function typeWriter() {
  if (i < text.length) {
    document.getElementById("typing").innerHTML += text.charAt(i);
    i++;
    setTimeout(typeWriter, 100);
  }
}
window.onload = typeWriter;

// Menu hamburger responsive
const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".menu");

hamburger.addEventListener("click", () => {
  menu.classList.toggle("show");
});

// Fermer le menu mobile quand on clique sur un lien
document.querySelectorAll(".menu a").forEach(link => {
  link.addEventListener("click", () => {
    menu.classList.remove("show");
  });
});
// --- Scrollspy (mettre en surbrillance le lien actif) ---
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".sub-menu a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80; // marge du header
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});

// Boutons "Voir plus" / "Voir moins"
document.querySelectorAll(".toggle-btn").forEach(button => {
  button.addEventListener("click", () => {
    const details = button.nextElementSibling;
    details.classList.toggle("show");
    button.textContent = details.classList.contains("show")
      ? "Voir moins"
      : "Voir plus";
  });
});



