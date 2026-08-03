const openAlbumButton = document.getElementById("open-album-warning");
const albumModal = document.getElementById("album-warning-modal");
const confirmAlbumButton = document.getElementById("confirm-album-access");
const closeAlbumButtons = document.querySelectorAll(
    "[data-close-album-warning]"
);

function openAlbumWarning() {
    albumModal.hidden = false;
    document.body.classList.add("modal-open");
    confirmAlbumButton.focus();
}

function closeAlbumWarning() {
    albumModal.hidden = true;
    document.body.classList.remove("modal-open");
    openAlbumButton.focus();
}

openAlbumButton.addEventListener("click", openAlbumWarning);

closeAlbumButtons.forEach((button) => {
    button.addEventListener("click", closeAlbumWarning);
});

confirmAlbumButton.addEventListener("click", () => {
    const albumUrl = openAlbumButton.dataset.albumUrl;

    window.open(albumUrl, "_blank", "noopener,noreferrer");

    closeAlbumWarning();
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !albumModal.hidden) {
        closeAlbumWarning();
    }
});