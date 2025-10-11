// On attend que le DOM (la structure de la page) soit entièrement chargé avant d'exécuter le script
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
        setTimeout(typeWriter, 80); // Vitesse ajustée pour un effet plus fluide
      }
    }
    typeWriter();
  }

  // --- Menu hamburger responsive (s'active si .hamburger et .menu existent) ---
  const hamburger = document.querySelector(".hamburger");
  const menu = document.querySelector(".menu");

  if (hamburger && menu) {
    hamburger.addEventListener("click", () => {
      menu.classList.toggle("show");
    });

    // Ferme le menu mobile quand on clique sur un lien
    document.querySelectorAll(".menu a").forEach(link => {
      link.addEventListener("click", () => {
        menu.classList.remove("show");
      });
    });
  }

  // --- Logique spécifique à la page Compétences ---
  const subMenuLinks = document.querySelectorAll(".sub-menu a");
  const sections = document.querySelectorAll("main section[id]");

  // Ce bloc de code ne s'exécutera que si le sous-menu et les sections sont trouvés
  if (subMenuLinks.length > 0 && sections.length > 0) {
    
    // --- Scrollspy : met en surbrillance le lien du sous-menu correspondant à la section visible ---
    window.addEventListener("scroll", () => {
      let current = "";
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 90; // Marge pour le header sticky
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

    // --- Clic sur un lien du sous-menu (Bloc 1, 2, 3) pour tout déplier ---
    subMenuLinks.forEach(link => {
      link.addEventListener("click", () => {
        const targetId = link.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
          // Ouvre tous les détails de la section cliquée
          targetSection.querySelectorAll(".details").forEach(detail => detail.classList.add("show"));
          targetSection.querySelectorAll(".toggle-btn").forEach(btn => btn.textContent = "Voir moins");

          // Effet de surbrillance
          targetSection.classList.add("active-section");
          setTimeout(() => targetSection.classList.remove("active-section"), 1500);
        }
      });
    });

    // --- Clic sur un bouton "Voir plus" / "Voir moins" individuel ---
    document.querySelectorAll(".toggle-btn").forEach(button => {
        button.addEventListener("click", () => {
            const details = button.nextElementSibling; // Cible l'élément .details juste après le bouton
            details.classList.toggle("show");

            // Met à jour le texte du bouton
            if (details.classList.contains("show")) {
                button.textContent = "Voir moins";
            } else {
                button.textContent = "Voir plus";
            }
        });
    });
  }
  // --- GESTION DU THÈME SOMBRE ---
const themeToggle = document.getElementById("theme-toggle");

if (themeToggle) {
  // Vérifier si un thème est déjà sauvegardé dans le localStorage
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle.textContent = "☀️";
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    // Sauvegarder le choix dans le localStorage
    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
      themeToggle.textContent = "☀️";
    } else {
      localStorage.removeItem("theme");
      themeToggle.textContent = "🌙";
    }
  });
}
});