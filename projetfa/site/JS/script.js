const champsQuantite = document.querySelectorAll('.ticket-quantity');
const elementTotal = document.getElementById('total-price');

function afficherTotal() {
    let totalFinal = 0;
    
    champsQuantite.forEach(champ => {
        const quantite = Number(champ.value) || 0;
        const prixUnitaire = Number(champ.dataset.prix) || 0;
        totalFinal += quantite * prixUnitaire;
    });
    
    elementTotal.textContent = totalFinal.toFixed(2).replace('.', ',') + ' €';
}

// Attacher l'écouteur et initialiser l'affichage
champsQuantite.forEach(champ => champ.addEventListener('input', afficherTotal));
afficherTotal();

// Carousel (réutilisable : ne s'exécute que si des .carousel-image sont présents)
(function initCarousel() {
    const images = document.querySelectorAll('.carousel-image');
    if (!images || images.length === 0) return;
    let currentImage = 0;
    function nextImage() {
        images[currentImage].classList.remove('active');
        currentImage = (currentImage + 1) % images.length;
        images[currentImage].classList.add('active');
    }
    setInterval(nextImage, 5000);
})();