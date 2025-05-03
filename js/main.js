// Main JavaScript File

document.addEventListener("DOMContentLoaded", () => {
    // Progress Bar
    window.addEventListener("scroll", updateProgressBar)

    // Mobile Menu Toggle
    const menuToggle = document.querySelector(".menu-toggle")
    const navMenu = document.querySelector(".nav-menu")

    if (menuToggle) {
        menuToggle.addEventListener("click", function () {
            const expanded = this.getAttribute("aria-expanded") === "true" || false
            this.setAttribute("aria-expanded", !expanded)
            navMenu.classList.toggle("active")

            // Prevent scrolling when menu is open
            document.body.classList.toggle("menu-open")
        })
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll(".nav-menu a")
    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            if (navMenu.classList.contains("active")) {
                menuToggle.setAttribute("aria-expanded", "false")
                navMenu.classList.remove("active")
                document.body.classList.remove("menu-open")
            }
        })
    })

    // Header scroll effect
    window.addEventListener("scroll", () => {
        const header = document.querySelector(".site-header")
        if (window.scrollY > 50) {
            header.classList.add("scrolled")
        } else {
            header.classList.remove("scrolled")
        }
    })

    // Reveal elements on scroll
    const revealElements = document.querySelectorAll(".reveal-on-scroll")
    window.addEventListener("scroll", () => {
        revealOnScroll(revealElements)
    })

    // Initialize reveal on load
    revealOnScroll(revealElements)

    // Initialize skill bars
    const skillBars = document.querySelectorAll(".skill-level")
    skillBars.forEach((bar) => {
        const width = bar.getAttribute("data-level")
        setTimeout(() => {
            bar.style.width = width
        }, 500)
    })

    // Testimonial Slider
    initTestimonialSlider()

    // Back to top button
    const backToTopButton = document.querySelector(".back-to-top")
    if (backToTopButton) {
        backToTopButton.addEventListener("click", (e) => {
            e.preventDefault()
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            })
        })
    }
})

// Update progress bar based on scroll position
function updateProgressBar() {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
    const scrollPosition = window.scrollY
    const progressBar = document.getElementById("progressBar")

    if (progressBar) {
        const scrollPercentage = (scrollPosition / windowHeight) * 100
        progressBar.style.width = scrollPercentage + "%"
    }
}

// Reveal elements when they come into view
function revealOnScroll(elements) {
    const windowHeight = window.innerHeight
    const revealPoint = 150

    elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top

        if (elementTop < windowHeight - revealPoint) {
            element.classList.add("active")
        }
    })
}

// Initialize testimonial slider
function initTestimonialSlider() {
    const track = document.querySelector(".testimonial-track")
    const slides = document.querySelectorAll(".testimonial")
    const dots = document.querySelectorAll(".dot")
    const prevButton = document.querySelector(".prev-testimonial")
    const nextButton = document.querySelector(".next-testimonial")

    if (!track || slides.length === 0) return

    let currentIndex = 0

    // Set initial position
    updateSlider()

    // Add event listeners to controls
    if (prevButton) {
        prevButton.addEventListener("click", () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length
            updateSlider()
        })
    }

    if (nextButton) {
        nextButton.addEventListener("click", () => {
            currentIndex = (currentIndex + 1) % slides.length
            updateSlider()
        })
    }

    // Add event listeners to dots
    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            currentIndex = index
            updateSlider()
        })
    })

    // Auto slide every 5 seconds
    let interval = setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length
        updateSlider()
    }, 5000)

    // Pause auto slide on hover
    track.addEventListener("mouseenter", () => {
        clearInterval(interval)
    })

    track.addEventListener("mouseleave", () => {
        interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % slides.length
            updateSlider()
        }, 5000)
    })

    // Update slider position and active dot
    function updateSlider() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`

        dots.forEach((dot, index) => {
            dot.classList.toggle("active", index === currentIndex)
        })
    }
}

// Handle CSS-only modals for keyboard accessibility
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        window.location.hash = ""
    }
})

// Add focus trap for modals
const modals = document.querySelectorAll(".modal")
modals.forEach((modal) => {
    modal.addEventListener("keydown", (e) => {
        if (e.key === "Tab") {
            const focusableElements = modal.querySelectorAll(
                'a[href], button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])',
            )
            const firstElement = focusableElements[0]
            const lastElement = focusableElements[focusableElements.length - 1]

            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus()
                    e.preventDefault()
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus()
                    e.preventDefault()
                }
            }
        }
    })
})
