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
        article.style.transitionDelay = `${index * 0.1}s`; // Le JS fait le délai !
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

// ---------------------------------------------------------
// Gestion du formulaire (Envoi sans quitter la page)
// ---------------------------------------------------------

const form = document.querySelector("#contact form");
const successMessage = document.getElementById("form-success");

if (form) { // On vérifie qu'on est bien sur une page avec le formulaire
    form.addEventListener("submit", function(event) {
        // 1. On empêche la page de se recharger (on annule le comportement par défaut)
        event.preventDefault(); 

        // 2. On prépare les données du formulaire
        const formData = new FormData(form);

        // 3. On envoie à Formspree en arrière-plan (Fetch)
        fetch(form.action, {
            method: "POST",
            body: formData,
            headers: {
                'Accept': 'application/json' // Indispensable pour que Formspree comprenne
            }
        })
        .then(response => {
            // 4. Si Formspree répond OK
            if (response.ok) {
                form.reset(); // MAGIE : Vide toutes les cases du formulaire
                successMessage.style.display = "block"; // Affiche le message de succès
                
                // Optionnel : Cacher le message après 5 secondes
                setTimeout(() => {
                    successMessage.style.display = "none";
                }, 5000);
            } else {
                alert("Oups, il y a eu une erreur. Réessayez.");
            }
        })
        .catch(error => {
            alert("Erreur de connexion. Vérifiez votre internet.");
        });
    });
}