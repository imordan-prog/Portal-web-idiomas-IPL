const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded", isOpen);
});


const navLinks = mainNav.querySelectorAll("a");

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        mainNav.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");
    });
});


/* =========================================================
   ASISTENTE VIRTUAL — ABRIR / CERRAR
========================================================= */

const assistantWidget =
    document.getElementById("assistantWidget");

const assistantButton =
    document.getElementById("assistantButton");

const assistantClose =
    document.getElementById("assistantClose");

const assistantChat =
    document.getElementById("assistantChat");


/* ---------------------------------------------------------
   ABRIR / CERRAR
--------------------------------------------------------- */

assistantButton.addEventListener("click", () => {

    const isOpen =
        assistantWidget.classList.toggle("active");

    assistantButton.setAttribute(
        "aria-expanded",
        isOpen
    );

    assistantChat.setAttribute(
        "aria-hidden",
        !isOpen
    );

});


/* ---------------------------------------------------------
   CERRAR
--------------------------------------------------------- */

assistantClose.addEventListener("click", () => {

    assistantWidget.classList.remove("active");

    assistantButton.setAttribute(
        "aria-expanded",
        "false"
    );

    assistantChat.setAttribute(
        "aria-hidden",
        "true"
    );

});

/* =========================================================
   ASISTENTE — ARRASTRAR
========================================================= */

let assistantDragging = false;

let assistantStartX = 0;
let assistantStartY = 0;

let assistantStartLeft = 0;
let assistantStartTop = 0;


assistantButton.addEventListener("pointerdown", (event) => {

    assistantDragging = true;

    assistantButton.setPointerCapture(event.pointerId);

    const rect =
        assistantWidget.getBoundingClientRect();

    assistantStartX = event.clientX;
    assistantStartY = event.clientY;

    assistantStartLeft = rect.left;
    assistantStartTop = rect.top;

    assistantWidget.style.left =
        `${rect.left}px`;

    assistantWidget.style.top =
        `${rect.top}px`;

    assistantWidget.style.right =
        "auto";

    assistantWidget.style.bottom =
        "auto";

});


assistantButton.addEventListener("pointermove", (event) => {

    if (!assistantDragging) {
        return;
    }


    const deltaX =
        event.clientX - assistantStartX;

    const deltaY =
        event.clientY - assistantStartY;


    let newLeft =
        assistantStartLeft + deltaX;

    let newTop =
        assistantStartTop + deltaY;


    /* -----------------------------------------------------
       Evitar que salga de la pantalla
    ----------------------------------------------------- */

    const maxLeft =
        window.innerWidth -
        assistantWidget.offsetWidth;

    const maxTop =
        window.innerHeight -
        assistantButton.offsetHeight;


    newLeft =
        Math.max(
            0,
            Math.min(newLeft, maxLeft)
        );


    newTop =
        Math.max(
            0,
            Math.min(newTop, maxTop)
        );


    assistantWidget.style.left =
        `${newLeft}px`;

    assistantWidget.style.top =
        `${newTop}px`;

});


assistantButton.addEventListener("pointerup", () => {

    assistantDragging = false;

});


assistantButton.addEventListener("pointercancel", () => {

    assistantDragging = false;

});


/* =========================================================
   INVITACIÓN DEL ASISTENTE
========================================================= */

setTimeout(() => {

    if (
        !assistantWidget.classList.contains("active")
    ) {

        assistantWidget.classList.add("show-hint");


        setTimeout(() => {

            assistantWidget.classList.remove(
                "show-hint"
            );

        }, 4000);

    }

}, 8000);

/* =========================================================
   ABRIR ASISTENTE DESDE LA SECCIÓN PROGRAMAS
========================================================= */

const assistantTriggers =
    document.querySelectorAll(".open-assistant");


assistantTriggers.forEach((trigger) => {

    trigger.addEventListener("click", (event) => {

        event.preventDefault();

        assistantWidget.classList.add("active");

        assistantButton.setAttribute(
            "aria-expanded",
            "true"
        );

        assistantChat.setAttribute(
            "aria-hidden",
            "false"
        );

        /* Llevar el cursor al campo de pregunta */

        setTimeout(() => {

            assistantInput.focus();

        }, 300);

    });

});

/* =========================================================
   CARRUSEL AUTOMÁTICO — VALORES
========================================================= */

const valueSlides =
    document.querySelectorAll(".value-slide");

const valueIndicators =
    document.querySelectorAll(".value-indicator");

let currentValue = 0;

let valueInterval;


/* ---------------------------------------------------------
   MOSTRAR VALOR
--------------------------------------------------------- */

function showValue(index) {

    valueSlides.forEach((slide, i) => {

        slide.classList.toggle(
            "active",
            i === index
        );

    });


    valueIndicators.forEach((indicator, i) => {

        indicator.classList.toggle(
            "active",
            i === index
        );

    });


    currentValue = index;

}


/* ---------------------------------------------------------
   SIGUIENTE VALOR
--------------------------------------------------------- */

function nextValue() {

    const nextIndex =
        (currentValue + 1) %
        valueSlides.length;

    showValue(nextIndex);

}


/* ---------------------------------------------------------
   INICIAR AUTOMÁTICO
--------------------------------------------------------- */

function startValuesCarousel() {

    valueInterval = setInterval(
        nextValue,
        3000
    );

}


/* ---------------------------------------------------------
   DETENER AUTOMÁTICO
--------------------------------------------------------- */

function stopValuesCarousel() {

    clearInterval(valueInterval);

}


/* ---------------------------------------------------------
   INDICADORES MANUALES
--------------------------------------------------------- */

valueIndicators.forEach((indicator) => {

    indicator.addEventListener("click", () => {

        const index =
            Number(indicator.dataset.value);

        showValue(index);

        stopValuesCarousel();

        startValuesCarousel();

    });

});


/* ---------------------------------------------------------
   INICIAR
--------------------------------------------------------- */

showValue(0);

startValuesCarousel();


/* =========================================================
   PAUSA DEL CARRUSEL AL INTERACTUAR
========================================================= */

const valuesCarousel =
    document.getElementById("valuesCarousel");


valuesCarousel.addEventListener("mouseenter", () => {

    stopValuesCarousel();

});


valuesCarousel.addEventListener("mouseleave", () => {

    startValuesCarousel();

});

/* =========================================================
   CARRUSEL MANUAL — IDIOMAS
========================================================= */

const languagesTrack =
    document.querySelector(".languages-track");

const languagesPrev =
    document.querySelector(".languages-prev");

const languagesNext =
    document.querySelector(".languages-next");

const languageCards =
    document.querySelectorAll(".language-card");


let languagePosition = 0;


/* ---------------------------------------------------------
   ACTUALIZAR CARRUSEL
--------------------------------------------------------- */

function updateLanguagesCarousel() {

    if (!languagesTrack || !languageCards.length) {
        return;
    }


    const cardWidth =
        languageCards[0].offsetWidth;

    const gap = 24;


    languagesTrack.style.transform =
        `translateX(-${languagePosition * (cardWidth + gap)}px)`;


    languagesPrev.disabled =
        languagePosition === 0;


    const visibleCards =
        window.innerWidth <= 600
            ? 1
            : window.innerWidth <= 900
                ? 2
                : 3;


    const maxPosition =
        languageCards.length - visibleCards;


    languagesNext.disabled =
        languagePosition >= maxPosition;

}


/* ---------------------------------------------------------
   SIGUIENTE
--------------------------------------------------------- */

languagesNext.addEventListener("click", () => {

    const visibleCards =
        window.innerWidth <= 600
            ? 1
            : window.innerWidth <= 900
                ? 2
                : 3;


    const maxPosition =
        languageCards.length - visibleCards;


    if (languagePosition < maxPosition) {

        languagePosition++;

        updateLanguagesCarousel();

    }

});


/* ---------------------------------------------------------
   ANTERIOR
--------------------------------------------------------- */

languagesPrev.addEventListener("click", () => {

    if (languagePosition > 0) {

        languagePosition--;

        updateLanguagesCarousel();

    }

});


/* ---------------------------------------------------------
   REDIMENSIONAMIENTO
--------------------------------------------------------- */

window.addEventListener("resize", () => {

    updateLanguagesCarousel();

});


/* ---------------------------------------------------------
   INICIAR
--------------------------------------------------------- */

updateLanguagesCarousel();