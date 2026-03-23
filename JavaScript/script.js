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

  // 3. EFFET MACHINE À ÉCRIRE (uniquement sur l'accueil)
  const typingElement = document.getElementById('typing-welcome');
  if (typingElement) {
    const elementsToType = [
      { id: 'typing-welcome', text: 'Bienvenue sur mon portfolio !', speed: 10 }, // Vitesse rapide pour le titre
      { id: 'typing-title-about', text: 'À propos de moi', speed: 10 },
      { id: 'typing-about', text: 'Je m’appelle Maël Decosse, étudiant en BTS SIO SLAM. Passionné par l’informatique, le développement et l’administration de serveurs.', speed: 20 },
      { id: 'typing-title-skills', text: 'Mes Compétences Clés', speed: 10 },
      { id: 'typing-skill1', text: 'Programmation : Java, PHP, HTML, CSS, JavaScript, LUA, SQL, Python', speed: 20 },
      { id: 'typing-skill2', text: 'Analyse : Modélisation UML et Merise', speed: 20 },
      { id: 'typing-skill3', text: 'Autres : Bonnes pratiques RGPD, Machines Virtuelles et installation d\'OS', speed: 20 },
      { id: 'typing-title-interests', text: 'Mes Centres d\'Intérêt', speed: 10 },
      { id: 'typing-interets', text: 'En dehors de l\'informatique, je m\'intéresse à la musique, aux jeux vidéo, au sport et à la création de scripts.', speed: 20 }
    ];

    elementsToType.forEach(elementData => {
      const targetElement = document.getElementById(elementData.id);
      if (targetElement) {
        let charIndex = 0;
        const currentSpeed = elementData.speed || 20;

        function typeChar() {
          if (charIndex < elementData.text.length) {
            targetElement.innerHTML += elementData.text.charAt(charIndex);
            charIndex++;
            setTimeout(typeChar, currentSpeed);
          }
        }

        typeChar();
      }
    });
  }

  // 4. BOUTONS "VOIR PLUS" (Projets, CV, Oral)
  // Cette logique unique gère tous vos boutons de détails
  const boutonsVoirPlus = document.querySelectorAll(".btn-voir-plus, .btn-oral-details, .toggle-btn");
  boutonsVoirPlus.forEach(btn => {
    const texteOriginal = btn.textContent;
    btn.addEventListener("click", () => {
      // On cherche le conteneur le plus proche (carte projet, item certification, ou bloc compétence)
      const parent = btn.closest('.projet-carte') || btn.closest('.certification-item') || btn.closest('.exemple') || btn.closest('.oral-card');
      const details = parent ? parent.querySelector('.projet-details, .details, .oral-details-content') : null;

      if (details) {
        details.classList.toggle("show");
        btn.textContent = details.classList.contains("show") ? "Masquer les détails" : texteOriginal;
      }
    });
  });

  // 5. ZOOM IMAGE (MODALE)
  const modal = document.getElementById("image-modal");
  const modalImg = document.getElementById("img-to-zoom");
  const closeBtn = document.querySelector(".modal .close");
  const imagesAgrandissables = document.querySelectorAll('.projet-image, .projet-image-demi, .projet-code-img');

  if (modal && modalImg) {
    imagesAgrandissables.forEach(img => {
      img.addEventListener('click', function () {
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

  // 6. VEILLE (uniquement sur la page veille)
  const newsContainer = document.getElementById('news-container');
  if (newsContainer) {
    chargerVeille(newsContainer);
  }
});

async function chargerVeille() {
  const liveContainer = document.getElementById('news-container'); // Le flux en direct
  const archivesContainer = document.getElementById('archives-container'); // Le bloc Archives

  try {
    // Ajout d'un paramètre timestamp pour éviter le cache du navigateur
    const response = await fetch('veille/news.json?t=' + Date.now());

    if (!response.ok) throw new Error("Fichier news.json introuvable");

    const newsData = await response.json();

    // On vide les conteneurs avant d'ajouter les données
    if (liveContainer) liveContainer.innerHTML = '';
    if (archivesContainer) archivesContainer.innerHTML = '';

    if (newsData.length === 0) {
      if (liveContainer) liveContainer.innerHTML = "<p>Aucune news pour le moment.</p>";
      return;
    }

    newsData.forEach((news, index) => {
      const item = document.createElement('div');
      item.className = 'timeline-item';

      const dateStr = new Date(news.date).toLocaleDateString('fr-FR');
      // Utilisation de Marked.js pour transformer le Markdown de l'IA en HTML
      const contenuHTML = (typeof marked !== 'undefined') ? marked.parse(news.contenu) : news.contenu;

      // SEPARATION : La première news va dans "Live", les autres dans "Archives"
      if (index === 0 && liveContainer) {
        item.innerHTML = `
            <div class="timeline-date">${dateStr}</div>
            <div class="timeline-content">
                <h4>${news.version}</h4>
                <div class="news-text">${contenuHTML}</div>
                <a href="${news.lien}" target="_blank" class="projet-lien">Voir la source</a>
            </div>
        `;
        liveContainer.appendChild(item);
      } else if (archivesContainer) {
        item.innerHTML = `
            <details style="background: var(--couleur-sous-menu-fond); padding: 10px; border-radius: 8px; margin-bottom: 15px; border: 1px solid var(--couleur-bordure);">
                <summary style="cursor: pointer; font-weight: bold; outline: none; padding: 5px;">
                    <span class="timeline-date">${dateStr}</span> - <span style="font-family: 'Montserrat', sans-serif; color: var(--couleur-texte-sombre);">${news.version}</span>
                </summary>
                <div class="timeline-content" style="margin-top: 10px; padding-left: 10px; border-left: 2px solid var(--couleur-principale);">
                    <div class="news-text">${contenuHTML}</div>
                    <a href="${news.lien}" target="_blank" class="projet-lien">Voir la source</a>
                </div>
            </details>
        `;
        archivesContainer.appendChild(item);
      }
    });

  } catch (error) {
    console.error("Erreur de chargement :", error);
    if (liveContainer) liveContainer.innerHTML = `<p>Erreur lors de la récupération des données.</p>`;
  }
}

// Lancement au chargement de la page
document.addEventListener('DOMContentLoaded', chargerVeille);