// Import modules
import { initModal } from './modal.js';
import { initAnimations } from './animations.js';
import { initCustomCursor } from './cursor.js';
import { initFormValidation } from './form.js';

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize mobile navigation
    initMobileNav();

    // Initialize project modal
    initModal();

    // Initialize scroll animations
    initAnimations();

    // Initialize custom cursor
    initCustomCursor();

    // Initialize form validation
    initFormValidation();

    // Initialize typing animation
    initTypingAnimation();
});

// Mobile Navigation
function initMobileNav() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');

            // Toggle hamburger animation
            const spans = navToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Close mobile menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');

                // Reset hamburger icon
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    });
}

// Typing Animation
function initTypingAnimation() {
    const typingText = document.querySelector('.typing-text');
    if (!typingText) return;

    const text = typingText.textContent;
    typingText.textContent = '';
    typingText.style.width = '0';

    let charIndex = 0;
    const typeSpeed = 100; // ms per character

    function type() {
        if (charIndex < text.length) {
            typingText.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(type, typeSpeed);
        } else {
            // Reset after typing is complete
            setTimeout(() => {
                typingText.textContent = '';
                charIndex = 0;
                setTimeout(type, typeSpeed);
            }, 2000);
        }
    }

    // Start typing animation
    setTimeout(type, 1000);
}

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.padding = '0.5rem 0';
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.padding = '1rem 0';
        header.style.boxShadow = 'none';
    }
});