// ---------------------------------------------------------
// Animation au scroll
// ---------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
    
    const articles = document.querySelectorAll(".anim");

    const observer = new IntersectionObserver((elements) => {
        
        elements.forEach((element) => {
            if (element.isIntersecting) {
                element.target.classList.add("visible");
                observer.unobserve(element.target);
            }
        });
        
    }, {
        threshold: 0.2 
    });

    // On donne un décalage (delay) à chaque carte : 0s, 0.2s, 0.4s...
    articles.forEach((article, index) => {
        article.style.transitionDelay = `${index * 0.2}s`; // Le JS fait le délai !
        observer.observe(article);
    });
});

// ---------------------------------------------------------
// Bouton Retour en haut
// ---------------------------------------------------------
const backToTop = document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        backToTop.classList.add("visible");
    } else {
        backToTop.classList.remove("visible");
    }
});

backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});