const text = "Bienvenue sur mon portfolio ! Découvrez mon CV, mes projets et comment me contacter.";
let i = 0;
function typeWriter() {
  if (i < text.length) {
    document.getElementById("typing").innerHTML += text.charAt(i);
    i++;
    setTimeout(typeWriter, 100);
  }
}
window.onload = typeWriter;

// Menu hamburger responsive
const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".menu");

hamburger.addEventListener("click", () => {
  menu.classList.toggle("show");
});

// Fermer le menu mobile quand on clique sur un lien
document.querySelectorAll(".menu a").forEach(link => {
  link.addEventListener("click", () => {
    menu.classList.remove("show");
  });
});
// --- Scrollspy (mettre en surbrillance le lien actif) ---
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".sub-menu a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80; // marge du header
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});

// --- Effet déroulant et mise en avant sur clic du sous-menu ---
document.querySelectorAll(".sub-menu a").forEach(link => {
  link.addEventListener("click", e => {
    // Récupérer l'ID ciblé (#bloc1, #bloc2, etc.)
    const targetId = link.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);

    // Fermer les autres sections si tu veux un effet accordéon global
    document.querySelectorAll("main section").forEach(sec => {
      if (sec !== targetSection) sec.classList.remove("expanded");
    });

    // Basculer l'ouverture de la section cliquée
    targetSection.classList.toggle("expanded");

    // Effet de surbrillance temporaire
    targetSection.classList.add("active-section");
    setTimeout(() => targetSection.classList.remove("active-section"), 1500);
  });
});
// --- Quand on clique sur Bloc 1 / 2 / 3, ouvrir automatiquement tous les "Voir plus" du bloc ---
document.querySelectorAll(".sub-menu a").forEach(link => {
  link.addEventListener("click", e => {
    const targetId = link.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);

    // 1️⃣ Ferme les autres sections si tu veux un effet accordéon
    document.querySelectorAll("main section").forEach(sec => {
      if (sec !== targetSection) sec.classList.remove("expanded");
    });

    // 2️⃣ Ouvre la section cliquée
    targetSection.classList.add("expanded");
    targetSection.classList.add("active-section");
    setTimeout(() => targetSection.classList.remove("active-section"), 1500);

    // 3️⃣ Ouvre tous les détails "Voir plus" de ce bloc
    targetSection.querySelectorAll(".details").forEach(detail => {
      detail.classList.add("show");
    });

    // 4️⃣ Change le texte des boutons en "Voir moins"
    targetSection.querySelectorAll(".toggle-btn").forEach(btn => {
      btn.textContent = "Voir moins";
    });
  });
});




