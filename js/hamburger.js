const burger = document.getElementById("burger");
const navButtons = document.getElementById("nav_buttons");



burger.addEventListener("click", () => {

    navButtons.classList.toggle("active");

});