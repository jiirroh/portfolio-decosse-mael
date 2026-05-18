// Fichier: JS/reservation.js

// 1. On récupère tous les champs de quantité
const champsQuantite = document.querySelectorAll('.ticket-quantity');
// 2. On récupère l'élément HTML où on doit afficher le total
const elementTotal = document.getElementById('total-price');
// 3. On récupère les champs email et téléphone
const champEmail = document.getElementById('email');
const champTelephone = document.getElementById('telephone');
const formulaire = document.getElementById('reservation-form');

// 4. On crée la fonction qui sera appelée pour tout recalculer
function mettreAJourTotal() {
    let totalFinal = 0;
    
    // 5. On boucle sur chaque champ de quantité
    for (let i = 0; i < champsQuantite.length; i++) {
        const champ = champsQuantite[i];
        // 6. On récupère la quantité (en nombre)
        const quantite = Number(champ.value) || 0;
        // 7. On récupère le prix du billet (stocké dans "data-prix")
        const prixUnitaire = Number(champ.dataset.prix) || 0;
        // 8. On ajoute le sous-total au total final
        totalFinal += quantite * prixUnitaire;
    }
    
    // 9. On affiche le résultat dans le HTML
    elementTotal.textContent = totalFinal.toFixed(2).replace('.', ',') + ' €';
}

// 10. On écoute les changements sur chaque champ
for (let i = 0; i < champsQuantite.length; i++) {
    champsQuantite[i].addEventListener('input', mettreAJourTotal);
}

// 11. Validation personnalisée : vérifier que l'email ou le téléphone est rempli
formulaire.addEventListener('submit', function(event) {
    const emailValue = champEmail.value.trim();
    const telephoneValue = champTelephone.value.trim();
    
    // Si aucun des deux n'est rempli, on empêche la soumission
    if (!emailValue && !telephoneValue) {
        event.preventDefault();
        alert('Veuillez renseigner au moins une adresse email ou un numéro de téléphone.');
        return false;
    }
    
    // Si l'email est rempli, on valide le format
    if (emailValue && !emailValue.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        event.preventDefault();
        alert('Veuillez entrer une adresse email valide.');
        return false;
    }
    
    return true;
});