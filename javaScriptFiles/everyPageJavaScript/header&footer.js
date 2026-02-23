const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

hamburger.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
});

const header = document.querySelector(".header");
const hero = document.querySelector(".hero");
window.addEventListener("scroll", () => {

    const scrollY = window.scrollY;

    if (scrollY > 0) {
        header.classList.add("headerBlack");
        hero.classList.add("transparent");
    } else {
        header.classList.remove("headerBlack");
        hero.classList.remove("transparent");
    }
});
