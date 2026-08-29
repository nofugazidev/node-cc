// =========================
// MOBILE NAVIGATION
// =========================

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("show");
    });
}


// =========================
// CURRENT YEAR
// =========================

const year = document.getElementById("year");

if (year) {
    year.textContent = new Date().getFullYear();
}


// =========================
// CONTACT FORM
// =========================

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm) {

    contactForm.addEventListener("submit", (event) => {

        event.preventDefault();

        formMessage.textContent =
            "Thank you! Your message has been received.";

        contactForm.reset();

    });

}