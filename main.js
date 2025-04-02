// Sticky Header
window.addEventListener('scroll', function () {
    const header = document.querySelector('.header');
    header.classList.toggle('sticky', window.scrollY > 0);
});

// Menu Toggle
const menuBtn = document.querySelector('.menu-btn');
const navOverlay = document.querySelector('.nav-overlay');
let menuOpen = false;

menuBtn.addEventListener('click', function () {
    if (!menuOpen) {
        menuBtn.classList.add('open');
        navOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        menuOpen = true;
    } else {
        menuBtn.classList.remove('open');
        navOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable scrolling
        menuOpen = false;
    }
});

// Close menu when clicking a link
const menuLinks = document.querySelectorAll('.menu-link');
menuLinks.forEach(link => {
    link.addEventListener('click', function () {
        menuBtn.classList.remove('open');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
        menuOpen = false;
    });
});