// Initialize GSAP
document.addEventListener("DOMContentLoaded", () => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger)

    // Typewriter effect
    initTypewriterEffect()

    // Interactive element in hero section
    initInteractiveElement()

    // Scroll animations
    initScrollAnimations()
})

// Typewriter effect
function initTypewriterEffect() {
    const typewriterElement = document.getElementById("typewriter")
    const words = ["websites.", "experiences.", "solutions.", "expectations."]
    let wordIndex = 0
    let charIndex = 0
    let isDeleting = false
    let typeSpeed = 100

    function type() {
        const currentWord = words[wordIndex]

        if (isDeleting) {
            typewriterElement.textContent = currentWord.substring(0, charIndex - 1)
            charIndex--
            typeSpeed = 50
        } else {
            typewriterElement.textContent = currentWord.substring(0, charIndex + 1)
            charIndex++
            typeSpeed = 100
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true
            typeSpeed = 1000 // Pause at the end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false
            wordIndex = (wordIndex + 1) % words.length
            typeSpeed = 500 // Pause before starting new word
        }

        setTimeout(type, typeSpeed)
    }

    // Start the typewriter effect
    setTimeout(type, 1000)
}

// Interactive element in hero section
function initInteractiveElement() {
    const interactiveElement = document.getElementById('interactiveElement');

    // Create canvas for the interactive element
    const canvas = document.createElement('canvas');
    canvas.width = interactiveElement.offsetWidth;
    canvas.height = interactiveElement.offsetHeight;
    interactiveElement.appendChild(canvas);

    const ctx = canvas.getContext('2d');

    // Create particles
    const particles = [];
    const particleCount = 100;

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 3 + 1,
            color: getComputedStyle(document.documentElement).getPropertyValue('--primary'),
            speedX: Math.random() * 2 - 1,
            speedY: Math.random() * 2 - 1
        });
    }
}