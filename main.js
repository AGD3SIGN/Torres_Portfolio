// Select DOM elements
const menuBtn = document.getElementById('menuBtn');
const menuIcon = document.getElementById('menuIcon');
const navOverlay = document.getElementById('navOverlay');
const mobileNavLinks = document.querySelectorAll('.mobile-nav a');

// Toggle menu state
let menuOpen = false;

// Toggle navigation overlay
function toggleMenu() {
    if (!menuOpen) {
        navOverlay.classList.add('active');
        menuIcon.classList.remove('ri-menu-line');
        menuIcon.classList.add('ri-close-line');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        menuOpen = true;
    } else {
        navOverlay.classList.remove('active');
        menuIcon.classList.remove('ri-close-line');
        menuIcon.classList.add('ri-menu-line');
        document.body.style.overflow = ''; // Allow scrolling when menu is closed
        menuOpen = false;
    }
}

// Event listeners
menuBtn.addEventListener('click', toggleMenu);

// Close menu when a link is clicked
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (menuOpen) {
            toggleMenu();
        }
    });
});