document.addEventListener('DOMContentLoaded', () => {

  // --- Effet machine à écrire (uniquement pour la page d'accueil) ---
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

  // --- Menu hamburger responsive (pour toutes les pages) ---
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

  // --- Logique spécifique à la page Compétences ---
  const subMenuLinks = document.querySelectorAll(".sub-menu a");
  const sections = document.querySelectorAll("main section[id]");
  if (subMenuLinks.length > 0 && sections.length > 0) {
    
    // Scrollspy : surbrillance du lien actif en scrollant
    window.addEventListener("scroll", () => {
      let current = "";
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 90; // Décalage pour le header sticky
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

    // Clic sur un bouton individuel "Voir les compétences"
    document.querySelectorAll(".toggle-btn").forEach(button => {
        button.addEventListener("click", () => {
            const details = button.nextElementSibling;
            details.classList.toggle("show");
            button.textContent = details.classList.contains("show") ? "Masquer les compétences" : "Voir les compétences validées";
        });
    });

    // Clic sur les liens du sous-menu (Bloc 1, 2, 3) pour tout ouvrir/fermer
    subMenuLinks.forEach(link => {
      link.addEventListener("click", () => {
        const targetId = link.getAttribute("href").substring(1); // Récupère "bloc1" depuis "#bloc1"

        sections.forEach(section => {
          const allDetails = section.querySelectorAll(".details");
          const allButtons = section.querySelectorAll(".toggle-btn");

          // Si la section est la cible du clic
          if (section.id === targetId) {
            allDetails.forEach(detail => detail.classList.add("show")); // Ouvre tous les accordéons
            allButtons.forEach(btn => btn.textContent = "Masquer les compétences");
          } else {
            allDetails.forEach(detail => detail.classList.remove("show")); // Ferme tous les autres
            allButtons.forEach(btn => btn.textContent = "Voir les compétences validées");
          }
        });
      });
    });
  }

  // --- GESTION DU THÈME SOMBRE (pour toutes les pages) ---
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