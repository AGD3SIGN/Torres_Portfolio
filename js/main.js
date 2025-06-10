// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const mobileThemeToggle = document.getElementById('mobileThemeToggle');
const body = document.body;

function toggleTheme() {
    body.classList.toggle('dark');
}

themeToggle.addEventListener('click', toggleTheme);
mobileThemeToggle.addEventListener('click', toggleTheme);

// Mobile Menu
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const overlay = document.getElementById('overlay');

function toggleMobileMenu() {
    menuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    overlay.classList.toggle('active');
    body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
}

menuBtn.addEventListener('click', toggleMobileMenu);
overlay.addEventListener('click', toggleMobileMenu);

// Close mobile menu when clicking links
const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (mobileMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    });
});

// Active link management
const allNavLinks = document.querySelectorAll('.nav-link, .mobile-nav-links a');
allNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        // Remove active from all links
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        document.querySelectorAll('.mobile-nav-links a').forEach(l => l.classList.remove('active'));

        // Add active to clicked link and its counterpart
        const href = link.getAttribute('href');
        document.querySelectorAll(`[href="${href}"]`).forEach(l => l.classList.add('active'));
    });
});

// Close mobile menu on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
        toggleMobileMenu();
    }
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Typing animation with word cycling
function typeWriter() {
    const words = ['Websites', 'Experiences', 'Solutions', 'Interfaces', 'Applications'];
    const typingElement = document.getElementById('typing-text');
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            // Remove characters
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;

            if (charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                setTimeout(type, 500); // Pause before typing next word
                return;
            }
        } else {
            // Add characters
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;

            if (charIndex === currentWord.length) {
                isDeleting = true;
                setTimeout(type, 2000); // Pause before deleting
                return;
            }
        }

        // Typing speed
        const speed = isDeleting ? 50 : 100;
        setTimeout(type, speed);
    }

    type();
}

// Start typing animation when page loads
window.addEventListener('load', () => {
    setTimeout(typeWriter, 1000);
});
