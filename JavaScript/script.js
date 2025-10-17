document.addEventListener('DOMContentLoaded', () => {

  // --- Effet machine à écrire (s'active uniquement si l'élément #typing existe) ---
  const typingElement = document.getElementById("typing");
  if (typingElement) {
    const text = "Bienvenue sur mon portfolio ! Découvrez mon CV, mes projets et comment me contacter.";
    let i = 0;
    function typeWriter() {
      if (i < text.length) {
        typingElement.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 80);
      }
    }
    typeWriter();
  }

  // --- Menu hamburger responsive ---
  const hamburger = document.querySelector(".hamburger");
  const menu = document.querySelector(".menu");
  if (hamburger && menu) {
    hamburger.addEventListener("click", () => {
      menu.classList.toggle("show");
    });
    document.querySelectorAll(".menu a").forEach(link => {
      link.addEventListener("click", () => {
        menu.classList.remove("show");
      });
    });
  }

  // --- Logique de la page Compétences ---
  const subMenuLinks = document.querySelectorAll(".sub-menu a");
  const sections = document.querySelectorAll("main section[id]");
  if (subMenuLinks.length > 0 && sections.length > 0) {
    // Scrollspy
    window.addEventListener("scroll", () => {
      let current = "";
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 90;
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute("id");
        }
      });
      subMenuLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(current)) {
          link.classList.add("active");
        }
      });
    });
// Clic sur les boutons "Voir les compétences"
document.querySelectorAll(".toggle-btn").forEach(button => {
    button.addEventListener("click", () => {
        const details = button.nextElementSibling;
        details.classList.toggle("show");

        if (details.classList.contains("show")) {
            button.textContent = "Masquer les compétences";
        } else {
            button.textContent = "Voir les compétences validées";
        }
    });
});
  }

// --- GESTION DU THÈME SOMBRE (AVEC ICÔNES SVG) ---
const themeToggle = document.getElementById("theme-toggle");
if (themeToggle) {
  // Au chargement, vérifier si un thème est déjà sauvegardé
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
  }

  // Gérer le clic sur le bouton
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    // Sauvegarder ou supprimer le choix dans le localStorage
    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.removeItem("theme");
    }
  });
}
});