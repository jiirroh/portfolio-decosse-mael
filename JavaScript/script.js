document.addEventListener('DOMContentLoaded', () => {
  console.log("Le Script JS est bien chargé !");

  // 1. GESTION DU THÈME SOMBRE
  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    if (localStorage.getItem("theme") === "dark") { document.body.classList.add("dark-mode"); }
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      if (document.body.classList.contains("dark-mode")) { localStorage.setItem("theme", "dark"); }
      else { localStorage.removeItem("theme"); }
    });
  }

  // 2. MENU HAMBURGER
  const hamburger = document.querySelector(".hamburger");
  const menu = document.querySelector(".menu");
  if (hamburger && menu) {
    hamburger.addEventListener("click", () => { menu.classList.toggle("show"); });
    document.querySelectorAll(".menu a").forEach(link => {
      link.addEventListener("click", () => { menu.classList.remove("show"); });
    });
  }

  // 3. EFFET MACHINE À ÉCRIRE
  const elementsToType = [
    { id: 'typing-welcome', text: 'Bienvenue sur mon portfolio !' },
    { id: 'typing-about', text: 'Je m’appelle Maël Decosse, étudiant en BTS SIO SLAM. Passionné par l’informatique, le développement et l’administration de serveurs.' },
    { id: 'typing-skill1', text: 'Programmation : Java, PHP, HTML, CSS, JavaScript, LUA, SQL, Python' },
    { id: 'typing-skill2', text: 'Analyse : Modélisation UML et Merise' },
    { id: 'typing-skill3', text: 'Autres : Bonnes pratiques RGPD, Machines Virtuelles et installation d\'OS' },
    { id: 'typing-interets', text: 'En dehors de l\'informatique, je m\'intéresse à la musique, aux jeux vidéo, au sport et à la création de scripts.' }
  ];

  if (document.getElementById(elementsToType[0].id)) {
    const typingSpeed = 20; 
    let textArrayIndex = 0;
    let charIndex = 0;

    function typeWriter() {
      if (textArrayIndex < elementsToType.length) {
        const currentElement = elementsToType[textArrayIndex];
        const targetElement = document.getElementById(currentElement.id);
        if (targetElement) {
            if (charIndex < currentElement.text.length) {
                targetElement.innerHTML += currentElement.text.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, typingSpeed);
            } else {
                charIndex = 0;
                textArrayIndex++;
                setTimeout(typeWriter, 100);
            }
        } else {
            textArrayIndex++;
            charIndex = 0;
            setTimeout(typeWriter, 100);
        }
      }
    }
    typeWriter();
  }

  // 4. ACCORDÉONS COMPÉTENCES (Page compétences)
  const toggleButtons = document.querySelectorAll(".toggle-btn");
  toggleButtons.forEach(button => {
      button.addEventListener("click", () => {
          const details = button.nextElementSibling;
          if (details) {
              details.classList.toggle("show");
              button.textContent = details.classList.contains("show") ? "Masquer les compétences" : "Voir les compétences validées";
          }
      });
  });

  // 5. BOUTONS VOIR PLUS (Projets & Certifications - Logique unique)
  const boutonsVoirPlus = document.querySelectorAll(".btn-voir-plus");
  boutonsVoirPlus.forEach(btn => {
    const texteOriginal = btn.textContent;
    btn.addEventListener("click", () => {
      const carte = btn.closest('.projet-carte') || btn.closest('.certification-item');
      const details = carte ? carte.querySelector('.projet-details') : null;
      if (details) {
        details.classList.toggle("show");
        btn.textContent = details.classList.contains("show") ? "Masquer les détails" : texteOriginal;
      }
    });
  });

  // 6. ZOOM IMAGE
  const modal = document.getElementById("image-modal");
  const modalImg = document.getElementById("img-to-zoom");
  const closeBtn = document.querySelector(".modal .close");
  const imagesAgrandissables = document.querySelectorAll('.projet-image, .projet-image-demi, .projet-code-img');

  if (modal && modalImg) {
    imagesAgrandissables.forEach(img => {
      img.addEventListener('click', function() {
        modal.style.display = "flex";
        modal.style.alignItems = "center";
        modal.style.justifyContent = "center";
        modalImg.src = this.src;
      });
    });
    if (closeBtn) {
      closeBtn.addEventListener('click', () => { modal.style.display = "none"; });
    }
    modal.addEventListener('click', (e) => {
      if (e.target === modal) { modal.style.display = "none"; }
    });
  }

  // 7. VEILLE
  const newsContainer = document.getElementById('news-container');
  if (newsContainer) { chargerVeille(newsContainer); }
});

// ... (Le reste des fonctions chargerVeille, activateCheat, etc. reste inchangé) ...