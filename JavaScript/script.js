document.addEventListener('DOMContentLoaded', () => {

  // --- Effet machine à écrire ---
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

  // --- Logique spécifique à la page Compétences ---
  const subMenuLinks = document.querySelectorAll(".sub-menu a");
  const sections = document.querySelectorAll("main section[id]");
  if (subMenuLinks.length > 0 && sections.length > 0) {
    
    // Scrollspy : surbrillance du lien actif en scrollant
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

    // Clic sur un bouton individuel "Voir les compétences"
    document.querySelectorAll(".toggle-btn").forEach(button => {
        button.addEventListener("click", () => {
            const details = button.nextElementSibling;
            details.classList.toggle("show");
            button.textContent = details.classList.contains("show") ? "Masquer les compétences" : "Voir les compétences validées";
        });
    });

    // NOUVEAU : Clic sur les liens du sous-menu (Bloc 1, 2, 3) pour tout ouvrir
    subMenuLinks.forEach(link => {
      link.addEventListener("click", () => {
        const targetId = link.getAttribute("href").substring(1); // Récupère "bloc1" depuis "#bloc1"

        // On parcourt TOUTES les sections de la page
        sections.forEach(section => {
          const allDetails = section.querySelectorAll(".details");
          const allButtons = section.querySelectorAll(".toggle-btn");

          // Si la section est celle sur laquelle on a cliqué
          if (section.id === targetId) {
            // On ouvre tous ses menus déroulants
            allDetails.forEach(detail => detail.classList.add("show"));
            allButtons.forEach(btn => btn.textContent = "Masquer les compétences");
          } else {
            // Sinon (pour tous les autres blocs), on ferme tout
            allDetails.forEach(detail => detail.classList.remove("show"));
            allButtons.forEach(btn => btn.textContent = "Voir les compétences validées");
          }
        });
      });
    });
  }

  // --- GESTION DU THÈME SOMBRE (AVEC ICÔNES SVG) ---
  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    if (localStorage.getItem("theme") === "dark") {
      document.body.classList.add("dark-mode");
    }
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
      } else {
        localStorage.removeItem("theme");
      }
    });
  }
});