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
      { id: 'typing-welcome', text: 'Bienvenue sur mon portfolio !' },
      { id: 'typing-about', text: 'Je m’appelle Maël Decosse, étudiant en BTS SIO SLAM. Passionné par l’informatique, le développement et l’administration de serveurs.' },
      { id: 'typing-skill1', text: 'Programmation : Java, PHP, HTML, CSS, JavaScript, LUA, SQL, Python' },
      { id: 'typing-skill2', text: 'Analyse : Modélisation UML et Merise' },
      { id: 'typing-skill3', text: 'Autres : Bonnes pratiques RGPD, Machines Virtuelles et installation d\'OS' },
      { id: 'typing-interets', text: 'En dehors de l\'informatique, je m\'intéresse à la musique, aux jeux vidéo, au sport et à la création de scripts.' }
    ];

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

            item.innerHTML = `
                <div class="timeline-date">${dateStr}</div>
                <div class="timeline-content">
                    <h4>${news.version}</h4>
                    <div class="news-text">${contenuHTML}</div>
                    <a href="${news.lien}" target="_blank" class="projet-lien">Voir la source</a>
                </div>
            `;

            // SEPARATION : La première news va dans "Live", les autres dans "Archives"
            if (index === 0 && liveContainer) {
                liveContainer.appendChild(item);
            } else if (archivesContainer) {
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