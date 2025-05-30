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
    const words = ["websites.", "experiences.", "solutions.", "interfaces."]
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
    const heroBlob = document.getElementById("heroBlob")
    const floatingElements = document.querySelectorAll(".floating-element")

    // Mouse tracking for blob
    document.addEventListener("mousemove", (e) => {
        if (heroBlob) {
            const rect = heroBlob.getBoundingClientRect()
            const x = e.clientX - rect.left - rect.width / 2
            const y = e.clientY - rect.top - rect.height / 2

            heroBlob.style.transform = `translate(calc(-50% + ${x * 0.1}px), calc(-50% + ${y * 0.1}px))`
        }
    })

    // Add hover effects to floating elements
    floatingElements.forEach((element, index) => {
        element.addEventListener("mouseenter", () => {
            element.style.transform = "translateY(-20px) scale(1.1)"
            element.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.2)"
        })

        element.addEventListener("mouseleave", () => {
            element.style.transform = "translateY(-20px) scale(1)"
            element.style.boxShadow = "var(--card-shadow)"
        })
    })
}

function initScrollAnimations() {
    // Add scroll triggered animations here
}
