const carousel = document.querySelector(".carousel-container");
const slides = document.querySelectorAll(".slide");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const dotsContainer = document.querySelector(".dots");

let index = 0;

// 1. Création des points
slides.forEach((slide, i) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (i === 0) {
        dot.classList.add("active");
    }
    dotsContainer.appendChild(dot);
    
    dot.addEventListener("click", () => {
        index = i;
        showSlide();
    });
});

// 2. Fonction d'affichage
function showSlide() {
    carousel.style.transform = "translateX(-" + (index * 100) + "%)";
    const dots = document.querySelectorAll(".dot");
    dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
    });
}

// 3. Contrôles des flèches
next.addEventListener("click", () => {
    index++;
    if (index >= slides.length) {
        index = 0;
    }
    showSlide();
});

prev.addEventListener("click", () => {
    index--;
    if (index < 0) {
        index = slides.length - 1;
    }
    showSlide();
});

// 4. Défilement automatique
setInterval(() => {
    index++;
    if (index >= slides.length) {
        index = 0;
    }
    showSlide();
}, 3000);

// ---------------------------------------------------------
// Gestion de la flèche "Retour en haut" sur Mobile
// ---------------------------------------------------------

const backToTopButton = document.querySelector('.back-to-top');

// On demande au navigateur de surveiller le mouvement de la page (le scroll)
window.addEventListener('scroll', () => {
    
    // Si l'utilisateur a descendu de plus de 300 pixels vers le bas...
    if (window.scrollY > 300) {
        // ... on ajoute la classe "visible" à la flèche (le CSS va l'afficher)
        backToTopButton.classList.add('visible');
    } else {
        // ... sinon on enlève la classe "visible" (le CSS va la cacher)
        backToTopButton.classList.remove('visible');
    }
});