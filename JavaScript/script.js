document.addEventListener('DOMContentLoaded', () => {

  /* ========================================================
     1. GESTION DU THÈME SOMBRE
     ======================================================== */
  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    // Vérifie si un thème est déjà sauvegardé
    if (localStorage.getItem("theme") === "dark") { document.body.classList.add("dark-mode"); }
    
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      // Sauvegarde la préférence
      if (document.body.classList.contains("dark-mode")) { localStorage.setItem("theme", "dark"); }
      else { localStorage.removeItem("theme"); }
    });
  }

  /* ========================================================
     2. MENU HAMBURGER (RESPONSIVE)
     ======================================================== */
  const hamburger = document.querySelector(".hamburger");
  const menu = document.querySelector(".menu");
  if (hamburger && menu) {
    hamburger.addEventListener("click", () => { menu.classList.toggle("show"); });
    
    // Ferme le menu quand on clique sur un lien
    document.querySelectorAll(".menu a").forEach(link => {
      link.addEventListener("click", () => { menu.classList.remove("show"); });
    });
  }

  /* ========================================================
     3. EFFET MACHINE À ÉCRIRE (Page d'accueil uniquement)
     ======================================================== */
  const elementsToType = [
    { id: 'typing-welcome', text: 'Bienvenue sur mon portfolio !' },
    { id: 'typing-about', text: 'Je m’appelle Maël Decosse, étudiant en BTS SIO SLAM. Passionné par l’informatique, le développement et l’administration de serveurs.' },
    { id: 'typing-skill1', text: 'Programmation : Java, PHP, HTML, CSS, JavaScript, LUA, SQL, Python' },
    { id: 'typing-skill2', text: 'Analyse : Modélisation UML et Merise' },
    { id: 'typing-skill3', text: 'Autres : Bonnes pratiques RGPD, Machines Virtuelles et installation d\'OS' },
    { id: 'typing-interets', text: 'En dehors de l\'informatique, je m\'intéresse à la musique, aux jeux vidéo, au sport et à la création de scripts.' }
  ];

  // On vérifie si on est sur la page d'accueil (si le titre existe)
  if (document.getElementById(elementsToType[0].id)) {
    const typingSpeed = 20; // Vitesse de frappe (ms)
    let textArrayIndex = 0;
    let charIndex = 0;

    // Fonction récursive pour écrire
    function typeWriter() {
      if (textArrayIndex < elementsToType.length) {
        const currentElement = elementsToType[textArrayIndex];
        const targetElement = document.getElementById(currentElement.id);

        // Si l'élément HTML existe, on écrit dedans
        if (targetElement) {
            if (charIndex < currentElement.text.length) {
                targetElement.innerHTML += currentElement.text.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, typingSpeed);
            } else {
                // Mot fini, on passe au suivant après une mini pause
                charIndex = 0;
                textArrayIndex++;
                setTimeout(typeWriter, 100);
            }
        } else {
            // Si l'élément n'existe pas (ex: liste supprimée), on saute à l'index suivant
            textArrayIndex++;
            charIndex = 0;
            typeWriter();
        }
      }
    }
    
    // Lancement du script
    typeWriter();
  }

  /* ========================================================
     4. ACCORDÉONS PAGE COMPÉTENCES
     ======================================================== */
  const toggleButtons = document.querySelectorAll(".toggle-btn");
  if (toggleButtons.length > 0) {
    toggleButtons.forEach(button => {
        button.addEventListener("click", () => {
            const details = button.nextElementSibling;
            if (details) {
                details.classList.toggle("show");
                button.textContent = details.classList.contains("show") ? "Masquer les compétences" : "Voir les compétences validées";
            }
        });
    });
  }

  /* ========================================================
     5. BOUTONS "VOIR PLUS" (Page Projets)
     ======================================================== */
  const boutonsVoirPlus = document.querySelectorAll(".btn-voir-plus");
  if (boutonsVoirPlus.length > 0) {
    boutonsVoirPlus.forEach(btn => {
      btn.addEventListener("click", () => {
        // On cherche le parent .projet-carte puis l'enfant .projet-details
        // C'est plus sûr que nextElementSibling
        const carte = btn.closest('.projet-carte');
        const details = carte ? carte.querySelector('.projet-details') : null;
        
        if (details) {
          details.classList.toggle("show");
          btn.textContent = details.classList.contains("show") ? "Masquer les détails" : "Voir l'étude de cas complète";
        }
      });
    });
  }

  /* ========================================================
     6. ZOOM IMAGE (LIGHTBOX)
     ======================================================== */
  const modal = document.getElementById("image-modal");
  const modalImg = document.getElementById("img-to-zoom");
  const closeBtn = document.querySelector(".modal .close");

  // On cible toutes les images de projets
  const imagesAgrandissables = document.querySelectorAll('.projet-image, .projet-image-demi, .projet-code-img');

  if (modal && modalImg) {
    imagesAgrandissables.forEach(img => {
      img.addEventListener('click', function() {
        modal.style.display = "flex"; // Centre l'image
        modal.style.alignItems = "center";
        modal.style.justifyContent = "center";
        modalImg.src = this.src;
      });
    });

    // Fermeture via la croix
    if (closeBtn) {
      closeBtn.addEventListener('click', () => { modal.style.display = "none"; });
    }

    // Fermeture en cliquant à côté de l'image
    modal.addEventListener('click', (e) => {
      if (e.target === modal) { modal.style.display = "none"; }
    });
  }

  /* ========================================================
     7. VEILLE AUTOMATISÉE (Page Veille)
     ======================================================== */
  const newsContainer = document.getElementById('news-container');
  if (newsContainer) {
    chargerVeille(newsContainer);
  }
});

// Fonction externe pour charger la veille
async function chargerVeille(container) {
    try {
        const url = 'veille/news.json?t=' + new Date().getTime();
        const response = await fetch(url);
        if (!response.ok) throw new Error("Erreur réseau");
        const newsData = await response.json();
        
        container.innerHTML = '';
        newsData.forEach(news => {
            const item = document.createElement('div');
            item.className = 'timeline-item';
            
            let dateAffichee = news.date;
            try { dateAffichee = new Date(news.date).toLocaleDateString('fr-FR'); } catch(e){}

            // Support Markdown si la librairie est chargée
            const contenuHTML = (typeof marked !== 'undefined') ? marked.parse(news.contenu) : news.contenu;

            item.innerHTML = `
                <div class="timeline-date">${dateAffichee}</div>
                <div class="timeline-content">
                    <h4>${news.version}</h4>
                    <div style="margin-top:10px;">${contenuHTML}</div>
                    <a href="${news.lien}" target="_blank" class="projet-lien" style="margin-top:15px; font-size:0.8em;">Voir sur GitHub</a>
                </div>
            `;
            container.appendChild(item);
        });
    } catch (error) {
        container.innerHTML = `<p>Chargement des actualités...</p>`;
    }
}