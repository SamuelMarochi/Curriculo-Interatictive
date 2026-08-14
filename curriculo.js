/* ============================================================
   CURRÍCULO — JAVASCRIPT PURO
   Samuel José Grassi Marochi
============================================================ */


/* ============================================================
   NAVBAR — EFEITO AO ROLAR
============================================================ */

const navbar = document.querySelector(".navbar");


function updateNavbar() {

    if (!navbar) {
        return;
    }

    if (window.scrollY > 40) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

}


/*
 * Executa uma vez ao carregar.
 */
updateNavbar();


/*
 * Atualiza durante o scroll.
 *
 * requestAnimationFrame evita executar alterações
 * excessivamente durante a rolagem.
 */

let scrollTicking = false;


window.addEventListener(
    "scroll",
    () => {

        if (!scrollTicking) {

            window.requestAnimationFrame(() => {

                updateNavbar();

                scrollTicking = false;

            });

            scrollTicking = true;
        }

    },
    {
        passive: true
    }
);



/* ============================================================
   INTERSECTION OBSERVER
   Anima elementos quando entram na tela
============================================================ */

const revealElements = document.querySelectorAll(
    ".reveal, .reveal-card"
);


if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
        (entries, observerInstance) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("is-visible");

                    observerInstance.unobserve(entry.target);

                }

            });

        },
        {
            root: null,

            /*
             * O elemento começa a aparecer
             * um pouco antes de entrar totalmente na tela.
             */
            rootMargin: "0px 0px -60px 0px",

            threshold: 0.08
        }
    );


    revealElements.forEach((element) => {

        observer.observe(element);

    });

} else {

    /*
     * Fallback para navegadores antigos.
     */
    revealElements.forEach((element) => {

        element.classList.add("is-visible");

    });

}



/* ============================================================
   SCROLL SUAVE PARA LINKS INTERNOS
============================================================ */

const internalLinks = document.querySelectorAll(
    'a[href^="#"]'
);


internalLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetId = link.getAttribute("href");


        if (
            !targetId ||
            targetId === "#"
        ) {
            return;
        }


        const target = document.querySelector(targetId);


        if (!target) {
            return;
        }


        event.preventDefault();


        const navbarHeight =
            navbar
                ? navbar.offsetHeight
                : 0;


        const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            navbarHeight -
            15;


        window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
        });


        /*
         * Atualiza a URL sem provocar
         * um salto imediato na página.
         */
        if (
            window.history &&
            window.history.pushState
        ) {

            window.history.pushState(
                null,
                "",
                targetId
            );

        }

    });

});



/* ============================================================
   ANIMAÇÃO EXTRA DOS CARDS
============================================================ */

const cards = document.querySelectorAll(
    ".qualification-card"
);


cards.forEach((card) => {

    card.addEventListener(
        "mouseenter",
        () => {

            const star =
                card.querySelector(".card-star");


            if (star) {

                star.style.transform =
                    "rotate(45deg) scale(1.15)";

            }

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            const star =
                card.querySelector(".card-star");


            if (star) {

                star.style.transform =
                    "rotate(0deg) scale(1)";

            }

        }
    );

});



/* ============================================================
   TELEFONE / E-MAIL
   Feedback visual simples ao clicar
============================================================ */

const actionLinks = document.querySelectorAll(
    'a[href^="tel:"], a[href^="mailto:"]'
);


actionLinks.forEach((link) => {

    link.addEventListener("click", () => {

        link.classList.add("clicked");


        window.setTimeout(() => {

            link.classList.remove("clicked");

        }, 300);

    });

});



/* ============================================================
   DETECÇÃO DE TOUCH
============================================================ */

const isTouchDevice =
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0;


if (isTouchDevice) {

    document.body.classList.add("touch-device");

}



/* ============================================================
   ANO AUTOMÁTICO
   Preparado para futuros elementos com .current-year
============================================================ */

const currentYearElements =
    document.querySelectorAll(".current-year");


currentYearElements.forEach((element) => {

    element.textContent =
        new Date().getFullYear();

});



/* ============================================================
   CONSOLE
============================================================ */

console.log(
    "Currículo de Samuel José Grassi Marochi carregado com sucesso."
);
