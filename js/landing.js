const staticAudio = new Audio("assets/audio/static.mp3");

staticAudio.loop = true;
staticAudio.volume = 0.08;

const audioButton = document.getElementById("audio-toggle");

let audioEnabled = false;

const countdownTarget = new Date("2026-08-06T18:00:00-03:00").getTime();

const daysElement = document.getElementById("countdown-days");
const hoursElement = document.getElementById("countdown-hours");
const minutesElement = document.getElementById("countdown-minutes");
const secondsElement = document.getElementById("countdown-seconds");

function formatNumber(value) {
    return String(value).padStart(2, "0");
}

function updateCountdown() {
    const now = Date.now();
    const distance = countdownTarget - now;

    if (distance <= 0) {
        daysElement.textContent = "00";
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";

        clearInterval(countdownInterval);

        /*
         * Dá tempo para o GitHub Actions concluir o commit
         * e para o Cloudflare publicar o novo index.html.
         */
        setTimeout(() => {
            window.location.reload();
        }, 120000);

        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));

    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) /
        (1000 * 60)
    );

    const seconds = Math.floor(
        (distance % (1000 * 60)) /
        1000
    );

    daysElement.textContent = formatNumber(days);
    hoursElement.textContent = formatNumber(hours);
    minutesElement.textContent = formatNumber(minutes);
    secondsElement.textContent = formatNumber(seconds);
}

updateCountdown();

const countdownInterval = setInterval(updateCountdown, 1000);

audioButton.addEventListener("click", async () => {

    if (!audioEnabled) {

        try {

            await staticAudio.play();

            audioEnabled = true;

            audioButton.innerHTML =
                '<i class="fa-solid fa-volume-high"></i>';

            audioButton.setAttribute(
                "aria-label",
                "Desativar som"
            );

        } catch (err) {

            console.error(err);

        }

    } else {

        staticAudio.pause();

        staticAudio.currentTime = 0;

        audioEnabled = false;

        audioButton.innerHTML =
            '<i class="fa-solid fa-volume-xmark"></i>';

        audioButton.setAttribute(
            "aria-label",
            "Ativar som"
        );

    }

});