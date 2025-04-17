// Scroll Animations
export function initAnimations() {
    // Reveal elements on scroll
    const revealElements = document.querySelectorAll('.bento-item');

    // Add reveal class to all elements
    revealElements.forEach(element => {
        element.classList.add('reveal');
    });

    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85
        );
    }

    // Reveal elements that are in viewport
    function revealOnScroll() {
        revealElements.forEach(element => {
            if (isInViewport(element)) {
                element.classList.add('active');
            }
        });
    }

    // Initial check on page load
    revealOnScroll();

    // Check on scroll
    window.addEventListener('scroll', revealOnScroll);

    // Animate skill bars when in viewport
    const skillsSection = document.querySelector('.skills-section');
    const skillBars = document.querySelectorAll('.skill-level');

    function animateSkillBars() {
        if (skillsSection && isInViewport(skillsSection)) {
            skillBars.forEach((bar, index) => {
                setTimeout(() => {
                    bar.style.width = bar.style.width || '0%';
                }, index * 100);
            });
        }
    }

    // Initial check on page load
    animateSkillBars();

    // Check on scroll
    window.addEventListener('scroll', animateSkillBars);

    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero');

    window.addEventListener('scroll', () => {
        if (heroSection) {
            const scrollPosition = window.scrollY;
            heroSection.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        }
    });
}