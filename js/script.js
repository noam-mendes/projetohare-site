const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});

const mobileButton = document.querySelector("#mobile-button");

const mobileMenuLinks = document.querySelectorAll(
    ".navbar .mobile-menu-card a, .navbar .nav-item a"
);

mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navbar.classList.remove("menu-open");

        mobileButton.setAttribute("aria-expanded", "false");
        mobileButton.setAttribute("aria-label", "Abrir menu");

        document.body.style.overflow = "";
    });
});

const navLinks = document.querySelectorAll(".navbar ul a");

mobileButton.addEventListener("click", () => {
    const menuIsOpen = navbar.classList.toggle("menu-open");

    mobileButton.setAttribute(
        "aria-expanded",
        String(menuIsOpen)
    );

    document.body.style.overflow = menuIsOpen ? "hidden" : "";
});

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navbar.classList.remove("menu-open");
        mobileButton.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
    });
});

/* ==================================================
   CONTAGEM REGRESSIVA — SÃO CRISTÓVÃO
================================================== */

const releaseDate = new Date("2026-08-24T00:01:00-03:00");

const releaseCountdown = document.querySelector("#release-countdown");
const countdownDays = document.querySelector("#countdown-days");
const countdownHours = document.querySelector("#countdown-hours");
const countdownMinutes = document.querySelector("#countdown-minutes");
const countdownSeconds = document.querySelector("#countdown-seconds");
const countdownFinished = document.querySelector("#countdown-finished");
const releaseMainButton = document.querySelector("#release-main-button");
const releaseDateText = document.querySelector("#release-date-text");

let countdownInterval;

function formatCountdownNumber(value) {
    return String(value).padStart(2, "0");
}

function finishReleaseCountdown() {
    if (!releaseCountdown) {
        return;
    }

    releaseCountdown.classList.add("is-finished");

    if (countdownFinished) {
        countdownFinished.hidden = false;
    }

    if (releaseMainButton) {
        const releaseUrl = releaseMainButton.dataset.releaseUrl?.trim();

        releaseMainButton.textContent = "Ouvir agora";

        if (releaseUrl) {
            releaseMainButton.href = releaseUrl;
            releaseMainButton.target = "_blank";
            releaseMainButton.rel = "noopener noreferrer";
        }
    }

    if (countdownInterval) {
        clearInterval(countdownInterval);
    }

    if (releaseDateText) {
        releaseDateText.hidden = true;
    }
}

function updateReleaseCountdown() {
    if (
        !releaseCountdown ||
        !countdownDays ||
        !countdownHours ||
        !countdownMinutes ||
        !countdownSeconds
    ) {
        return;
    }

    const now = new Date();
    const remainingTime = releaseDate.getTime() - now.getTime();

    if (remainingTime <= 0) {
        countdownDays.textContent = "00";
        countdownHours.textContent = "00";
        countdownMinutes.textContent = "00";
        countdownSeconds.textContent = "00";

        finishReleaseCountdown();
        return;
    }

    const totalSeconds = Math.floor(remainingTime / 1000);

    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    countdownDays.textContent = formatCountdownNumber(days);
    countdownHours.textContent = formatCountdownNumber(hours);
    countdownMinutes.textContent = formatCountdownNumber(minutes);
    countdownSeconds.textContent = formatCountdownNumber(seconds);
}

updateReleaseCountdown();

countdownInterval = window.setInterval(
    updateReleaseCountdown,
    1000
);