document.addEventListener('DOMContentLoaded', () => {

  // --- Effet machine à écrire (s'active uniquement si l'élément #typing existe) ---
  const typingElement = document.getElementById("typing");
  if (typingElement) {
    const text = "Bienvenue sur mon portfolio ! Découvrez mon CV, mes projets et comment me contacter.";
    let i = 0;
    function typeWriter() {
      if (i < text.length) {
        typingElement.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 80);
      }
    }
    typeWriter();
  }

  // --- Menu hamburger responsive ---
  const hamburger = document.querySelector(".hamburger");
  const menu = document.querySelector(".menu");
  if (hamburger && menu) {
    hamburger.addEventListener("click", () => {
      menu.classList.toggle("show");
    });
    document.querySelectorAll(".menu a").forEach(link => {
      link.addEventListener("click", () => {
        menu.classList.remove("show");
      });
    });
  }

  // --- Logique de la page Compétences ---
  const subMenuLinks = document.querySelectorAll(".sub-menu a");
  const sections = document.querySelectorAll("main section[id]");
  if (subMenuLinks.length > 0 && sections.length > 0) {
    // Scrollspy
    window.addEventListener("scroll", () => {
      let current = "";
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 90;
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute("id");
        }
      });
      subMenuLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(current)) {
          link.classList.add("active");
        }
      });
    });
    // Clic sur bouton "Voir plus"
    document.querySelectorAll(".toggle-btn").forEach(button => {
        button.addEventListener("click", () => {
            const details = button.nextElementSibling;
            details.classList.toggle("show");
            button.textContent = details.classList.contains("show") ? "Voir moins" : "Compétences associées";
        });
    });
  }

  // --- NOUVEAU : GESTION DU THÈME SOMBRE ---
  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    if (localStorage.getItem("theme") === "dark") {
      document.body.classList.add("dark-mode");
      themeToggle.textContent = "☀️";
    }
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
        themeToggle.textContent = "☀️";
      } else {
        localStorage.removeItem("theme");
        themeToggle.textContent = "🌙";
      }
    });
  }

  // --- NOUVEAU : CURSEUR PERSONNALISÉ ---
  const cursorDot = document.querySelector(".cursor-dot");
  const cursorOutline = document.querySelector(".cursor-outline");
  if (cursorDot && cursorOutline) {
    window.addEventListener("mousemove", (e) => {
      const posX = e.clientX;
      const posY = e.clientY;
      cursorDot.style.left = `${posX}px`;
      cursorDot.style.top = `${posY}px`;
      cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
      }, { duration: 500, fill: "forwards" });
    });
    document.querySelectorAll("a, button, .hamburger").forEach((link) => {
      link.addEventListener("mouseenter", () => {
        cursorOutline.style.transform = "translate(-50%, -50%) scale(1.5)";
      });
      link.addEventListener("mouseleave", () => {
        cursorOutline.style.transform = "translate(-50%, -50%) scale(1)";
      });
    });
  }

});