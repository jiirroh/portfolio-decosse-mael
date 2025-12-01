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
    { id: 'typing-about', text: 'Je m\'appelle Maël Decosse, étudiant en BTS SIO SLAM. Passionné par l\'informatique, le développement et l\'administration de serveurs.' },
    { id: 'typing-skill1', text: 'Programmation : Java, PHP, HTML, CSS, JavaScript, LUA, SQL, Python' },
    { id: 'typing-skill2', text: 'Analyse : Modélisation UML et Merise' },
    { id: 'typing-skill3', text: 'Autres : Bonnes pratiques RGPD, Machines Virtuelles et installation d\'OS' },
    { id: 'typing-interets', text: 'En dehors de l\'informatique, je m\'intéresse à la musique, aux jeux vidéo, au sport et à la création de scripts.' }
  ];

  if (document.getElementById(elementsToType[0].id)) {
    const typingSpeed = 40;
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
    typeWriter();
  }

  // --- Logique spécifique à la page Compétences & Projets (pour le sous-menu) ---
  const subMenuLinks = document.querySelectorAll(".sub-menu a");
  const sectionsWithId = document.querySelectorAll("main section[id]");
  if (subMenuLinks.length > 0 && sectionsWithId.length > 0) {
    
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

    document.querySelectorAll(".toggle-btn").forEach(button => {
        button.addEventListener("click", () => {
            const details = button.nextElementSibling;
            details.classList.toggle("show");
            button.textContent = details.classList.contains("show") ? "Masquer les compétences" : "Voir les compétences validées";
        });
    });

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

  // ===== GESTION DE LA VEILLE AUTOMATISÉE (n8n) =====
  const newsContainer = document.getElementById('news-container');
  if (newsContainer) {
    console.log('🔍 Container trouvé, chargement de la veille...');
    chargerVeille(newsContainer);
  }

}); // Fin du DOMContentLoaded

// ===== FONCTION DE CHARGEMENT DE LA VEILLE =====
async function chargerVeille(container) {
    console.log('📡 Début du chargement...');
    
    try {
        const url = 'veille/news.json?t=' + new Date().getTime();
        console.log('🌐 Fetch de:', url);
        
        const response = await fetch(url);
        console.log('📥 Réponse:', response.status);

        if (!response.ok) {
            throw new Error("Fichier news.json introuvable (erreur " + response.status + ")");
        }

        const newsData = await response.json();
        console.log('✅ Données reçues:', newsData);

        if (!newsData || newsData.length === 0) {
            throw new Error("Le fichier news.json est vide");
        }

        container.innerHTML = '';

        newsData.forEach(news => {
            const item = document.createElement('div');
            item.className = 'timeline-item';

            let dateAffichee = news.date;
            try {
                const dateObj = new Date(news.date);
                dateAffichee = dateObj.toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
            } catch (e) { 
                console.warn("Date invalide:", e); 
            }

            const contenuHTML = (typeof marked !== 'undefined') 
                ? marked.parse(news.contenu) 
                : news.contenu.replace(/\n/g, '<br>');

            item.innerHTML = `
                <div class="timeline-date">${dateAffichee}</div>
                <div class="timeline-content">
                    <h4>${news.version}</h4>
                    <div style="margin-top:10px; font-size: 0.95em; line-height: 1.6;">
                        ${contenuHTML}
                    </div>
                    <a href="${news.lien}" target="_blank" class="projet-lien" style="margin-top:15px; font-size:0.8em;">
                        📖 Voir sur GitHub
                    </a>
                </div>
            `;

            container.appendChild(item);
        });

        console.log('🎉 Veille chargée avec succès!');

    } catch (error) {
        console.error("❌ Erreur lors du chargement:", error);
        container.innerHTML = `
            <div class="timeline-item">
                <div class="timeline-content" style="border-left: 4px solid orange;">
                    <p><i>⚠️ Impossible de charger les mises à jour pour le moment.</i></p>
                    <small style="color: #888;">Détails: ${error.message}</small>
                </div>
            </div>`;
    }
}