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