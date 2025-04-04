const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const body = document.body;
const desktopCta = document.querySelector('.desktop-cta');
const header = document.querySelector('header');

// Handle mobile navigation toggle
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
    body.classList.toggle('menu-active');
});

// Hide desktop CTA on mobile
function updateCTA() {
    if (window.innerWidth <= 768) {
        desktopCta.style.display = 'none';
    } else {
        desktopCta.style.display = 'block';
    }
}

// Handle scroll effect for header
function handleScroll() {
    // Get scroll position
    const scrollPosition = window.scrollY;

    // Check if we've scrolled past the point where we want header to change
    // Using the viewport height as a threshold (when scrolled past hero section)
    if (scrollPosition > 50) {
        header.classList.remove('transparent');
        header.classList.add('scrolled');
    } else {
        header.classList.add('transparent');
        header.classList.remove('scrolled');
    }
}

// Initial checks
updateCTA();
handleScroll();

// Update on resize and scroll
window.addEventListener('resize', updateCTA);
window.addEventListener('scroll', handleScroll);

// Close menu when clicking a link
const navItems = document.querySelectorAll('.nav-links li a');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            body.classList.remove('menu-active');
        }
    });
});