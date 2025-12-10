document.addEventListener('DOMContentLoaded', () => {

  // --- GESTION DU THÈME SOMBRE ---
  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    if (localStorage.getItem("theme") === "dark") { document.body.classList.add("dark-mode"); }
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      if (document.body.classList.contains("dark-mode")) { localStorage.setItem("theme", "dark"); }
      else { localStorage.removeItem("theme"); }
    });
  }

  // --- MENU HAMBURGER ---
  const hamburger = document.querySelector(".hamburger");
  const menu = document.querySelector(".menu");
  if (hamburger && menu) {
    hamburger.addEventListener("click", () => { menu.classList.toggle("show"); });
    document.querySelectorAll(".menu a").forEach(link => {
      link.addEventListener("click", () => { menu.classList.remove("show"); });
    });
  }

  // --- EFFET TYPEWRITER (CORRIGÉ POUR TITRES) ---
  const elementsToType = [
    { id: 'typing-welcome', text: 'Bienvenue sur mon portfolio !' },
    { id: 'typing-about-title', text: 'À propos de moi' },
    { id: 'typing-skills-title', text: 'Mes Compétences Clés' },
    { id: 'typing-interests-title', text: 'Mes Centres d\'Intérêt' }
  ];

  if (document.getElementById(elementsToType[0].id)) {
    const typingSpeed = 25; // Vitesse plus rapide
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
          // Petite pause avant de passer au titre suivant
          setTimeout(typeWriter, 300);
        }
      }
    }
    typeWriter();
  }

  // --- GESTION PAGE COMPETENCES (Accordeons) ---
  const subMenuLinks = document.querySelectorAll(".sub-menu a");
  const sectionsWithId = document.querySelectorAll("main section[id]");
  
  if (document.querySelector(".toggle-btn")) {
    document.querySelectorAll(".toggle-btn").forEach(button => {
        button.addEventListener("click", () => {
            const details = button.nextElementSibling;
            details.classList.toggle("show");
            button.textContent = details.classList.contains("show") ? "Masquer les compétences" : "Voir les compétences validées";
        });
    });
  }

  // --- GESTION DES NOUVEAUX BOUTONS "VOIR PLUS" (PAGE PROJETS) ---
  const boutonsVoirPlus = document.querySelectorAll(".btn-voir-plus");
  if (boutonsVoirPlus.length > 0) {
    boutonsVoirPlus.forEach(btn => {
      btn.addEventListener("click", () => {
        const details = btn.nextElementSibling; // La div class="projet-details" juste après
        if (details) {
          details.classList.toggle("show");
          // Change le texte du bouton
          if (details.classList.contains("show")) {
            btn.textContent = "Masquer les détails";
          } else {
            btn.textContent = "Voir plus de détails";
          }
        }
      });
    });
  }

  // ===== GESTION DE LA VEILLE AUTOMATISÉE =====
  const newsContainer = document.getElementById('news-container');
  if (newsContainer) {
    chargerVeille(newsContainer);
  }
});

// Fonction Veille
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
        container.innerHTML = `<p>Impossible de charger la veille.</p>`;
    }
}