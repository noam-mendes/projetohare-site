const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if(window.scrollY > 80){

        navbar.classList.add("scrolled");

    }else{

        navbar.classList.remove("scrolled");

    }

});

const mobileButton = document.querySelector("#mobile-button");
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