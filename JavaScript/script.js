document.addEventListener('DOMContentLoaded', () => {

  // --- GESTION DU THÈME SOMBRE (pour toutes les pages) ---
  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    if (localStorage.getItem("theme") === "dark") { document.body.classList.add("dark-mode"); }
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      if (document.body.classList.contains("dark-mode")) { localStorage.setItem("theme", "dark"); }
      else { localStorage.removeItem("theme"); }
    });
  }

  // --- MENU HAMBURGER RESPONSIVE (pour toutes les pages) ---
  const hamburger = document.querySelector(".hamburger");
  const menu = document.querySelector(".menu");
  if (hamburger && menu) {
    hamburger.addEventListener("click", () => { menu.classList.toggle("show"); });
    document.querySelectorAll(".menu a").forEach(link => {
      link.addEventListener("click", () => { menu.classList.remove("show"); });
    });
  }

  // --- EFFET TYPEWRITER GLOBAL (pour la page d'accueil) ---
  const elementsToType = [
    { id: 'typing-welcome', text: 'Bienvenue sur mon portfolio !' },
    { id: 'typing-about', text: 'Je m’appelle Maël Decosse, étudiant en BTS SIO SLAM. Passionné par l’informatique, le développement et l’administration de serveurs.' },
    { id: 'typing-skill1', text: 'Programmation : Java, PHP, HTML, CSS, JavaScript, LUA, SQL, Python' },
    { id: 'typing-skill2', text: 'Analyse : Modélisation UML et Merise' },
    { id: 'typing-skill3', text: 'Autres : Bonnes pratiques RGPD, Machines Virtuelles et installation d\'OS' },
    { id: 'typing-interets', text: 'En dehors de l\'informatique, je m\'intéresse à la musique, aux jeux vidéo, au sport et à la création de scripts.' }
  ];

  // On lance l'effet seulement si le premier élément de la liste existe sur la page
  if (document.getElementById(elementsToType[0].id)) {
    const typingSpeed = 40; // Vitesse en ms (plus bas = plus rapide)
    let textArrayIndex = 0;
    let charIndex = 0;

    function typeWriter() {
      if (textArrayIndex < elementsToType.length) {
        const currentElement = elementsToType[textArrayIndex];
        const targetElement = document.getElementById(currentElement.id);

        if (targetElement && charIndex < currentElement.text.length) {
          targetElement.innerHTML += currentElement.text.charAt(charIndex);
          charIndex++;
          setTimeout(typeWriter, typingSpeed);
        } else {
          charIndex = 0;
          textArrayIndex++;
          typeWriter();
        }
      }
    }
    typeWriter(); // Démarrage de l'animation
  }

  // --- Logique spécifique à la page Compétences & Projets (pour le sous-menu) ---
  const subMenuLinks = document.querySelectorAll(".sub-menu a");
  const sectionsWithId = document.querySelectorAll("main section[id]");
  if (subMenuLinks.length > 0 && sectionsWithId.length > 0) {
    
    // Scrollspy
    window.addEventListener("scroll", () => {
      let current = "";
      sectionsWithId.forEach(section => {
        const sectionTop = section.offsetTop - 90;
        if (window.scrollY >= sectionTop) { current = section.getAttribute("id"); }
      });
      subMenuLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(current)) { link.classList.add("active"); }
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
        const targetId = link.getAttribute("href").substring(1);
        sectionsWithId.forEach(section => {
          const allDetails = section.querySelectorAll(".details");
          const allButtons = section.querySelectorAll(".toggle-btn");
          if (section.id === targetId) {
            allDetails.forEach(detail => detail.classList.add("show"));
            allButtons.forEach(btn => btn.textContent = "Masquer les compétences");
          } else {
            allDetails.forEach(detail => detail.classList.remove("show"));
            allButtons.forEach(btn => btn.textContent = "Voir les compétences validées");
          }
        });
      });
    });
  }
});