document.addEventListener('DOMContentLoaded', () => {
  console.log("Le Script JS est bien chargé !"); // Test pour vérifier le chargement

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

  // 3. EFFET MACHINE À ÉCRIRE (Uniquement si l'élément existe)
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
            // Si un élément manque, on passe au suivant sans planter
            textArrayIndex++;
            charIndex = 0;
            setTimeout(typeWriter, 100);
        }
      }
    }
    typeWriter();
  }

  // 4. ACCORDÉONS COMPÉTENCES
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

  // 5. BOUTONS PROJETS (Indestructible)
  const boutonsVoirPlus = document.querySelectorAll(".btn-voir-plus");
  boutonsVoirPlus.forEach(btn => {
    btn.addEventListener("click", () => {
      const carte = btn.closest('.projet-carte');
      const details = carte ? carte.querySelector('.projet-details') : null;
      
      if (details) {
        details.classList.toggle("show");
        btn.textContent = details.classList.contains("show") ? "Masquer les détails" : "Voir l'étude de cas complète";
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
  if (newsContainer) {
    chargerVeille(newsContainer);
  }
});

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
        container.innerHTML = `<p>Chargement des actualités...</p>`;
    }
}
// --- SYSTÈME DE CHEAT CODE POUR L'ORAL ---
let inputSequence = "";
const secretCode = "oral";

document.addEventListener('keydown', (e) => {
    // On ajoute la touche pressée à notre séquence (en minuscule)
    inputSequence += e.key.toLowerCase();

    // On ne garde que les 4 derniers caractères
    inputSequence = inputSequence.slice(-secretCode.length);

    // Vérification
    if (inputSequence === secretCode) {
        activateCheat();
    }
});

function activateCheat() {
    // Petit effet visuel pour confirmer l'activation
    const notify = document.createElement('div');
    notify.style.cssText = `
        position: fixed; top: 20px; left: 50%; transform: translateX(-50%);
        background: #ffcc00; color: black; padding: 15px 30px;
        border-radius: 5px; font-weight: bold; z-index: 9999;
        font-family: 'Arial Black', sans-serif; border: 3px solid black;
        box-shadow: 0 0 20px rgba(0,0,0,0.5);
    `;
    notify.innerText = "CHEAT ACTIVATED: ORAL MODE";
    document.body.appendChild(notify);

    // Redirection après 1.5 seconde
    setTimeout(() => {
        window.location.href = 'oral.html';
    }, 1500);
}