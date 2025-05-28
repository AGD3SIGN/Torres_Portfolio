// DOM Elements
const themeToggle = document.getElementById("themeToggle")
const hamburger = document.getElementById("hamburger")
const mobileNav = document.getElementById("mobileNav")
const mobileNavLinks = document.querySelectorAll(".mobile-nav__link")
const header = document.querySelector(".header")
const scrollTopBtn = document.getElementById("scrollTop")
const progressBar = document.getElementById("progressBar")
const projectCards = document.querySelectorAll(".project-card")
const modals = document.querySelectorAll(".modal")
const modalCloseButtons = document.querySelectorAll(".modal__close")
const testimonialSlider = document.getElementById("testimonialsSlider")
const testimonials = testimonialSlider.querySelectorAll(".testimonial")
const testimonialPrev = document.getElementById("testimonialPrev")
const testimonialNext = document.getElementById("testimonialNext")

// Theme Toggle
function initThemeToggle() {
    const currentTheme = localStorage.getItem("theme") || "light"
    document.documentElement.setAttribute("data-theme", currentTheme)

    themeToggle.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme")
        const newTheme = currentTheme === "light" ? "dark" : "light"

        document.documentElement.setAttribute("data-theme", newTheme)
        localStorage.setItem("theme", newTheme)
    })
}

// Mobile Navigation
function initMobileNav() {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active")
        mobileNav.classList.toggle("active")
        document.body.classList.toggle("no-scroll")
    })

    mobileNavLinks.forEach((link) => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active")
            mobileNav.classList.remove("active")
            document.body.classList.remove("no-scroll")
        })
    })
}

// Header Scroll
function initHeaderScroll() {
    let lastScrollTop = 0

    window.addEventListener("scroll", () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop

        if (scrollTop > lastScrollTop && scrollTop > 100) {
            header.classList.add("hidden")
        } else {
            header.classList.remove("hidden")
        }

        lastScrollTop = scrollTop
    })
}

// Scroll to Top Button
function initScrollToTop() {
    window.addEventListener("scroll", () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add("active")
        } else {
            scrollTopBtn.classList.remove("active")
        }
    })

    scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    })
}

// Progress Bar
function initProgressBar() {
    window.addEventListener("scroll", () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
        const scrolled = (window.scrollY / windowHeight) * 100
        progressBar.style.width = scrolled + "%"
    })
}

// Project Modals
function initProjectModals() {
    projectCards.forEach((card) => {
        card.addEventListener("click", () => {
            const projectId = card.getAttribute("data-project")
            const modal = document.getElementById(projectId + "Modal")

            if (modal) {
                modal.classList.add("active")
                document.body.classList.add("no-scroll")
            }
        })
    })

    modalCloseButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const modal = button.closest(".modal")
            modal.classList.remove("active")
            document.body.classList.remove("no-scroll")
        })
    })

    window.addEventListener("click", (e) => {
        modals.forEach((modal) => {
            if (e.target === modal) {
                modal.classList.remove("active")
                document.body.classList.remove("no-scroll")
            }
        })
    })
}

// Testimonials Slider
function initTestimonialsSlider() {
    let currentIndex = 0

    function showTestimonial(index) {
        testimonials.forEach((testimonial) => {
            testimonial.classList.remove("active")
        })

        testimonials[index].classList.add("active")
    }

    function nextTestimonial() {
        currentIndex = (currentIndex + 1) % testimonials.length
        showTestimonial(currentIndex)
    }

    function prevTestimonial() {
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length
        showTestimonial(currentIndex)
    }

    testimonialNext.addEventListener("click", nextTestimonial)
    testimonialPrev.addEventListener("click", prevTestimonial)

    // Show first testimonial
    showTestimonial(currentIndex)

    // Auto slide every 5 seconds
    setInterval(nextTestimonial, 5000)
}

// Skills Animation
function initSkillsAnimation() {
    const skillBars = document.querySelectorAll(".skill__progress")

    function animateSkills() {
        skillBars.forEach((bar) => {
            const width = bar.getAttribute("data-width")
            bar.style.width = width + "%"
        })
    }

    // Animate on page load
    window.addEventListener("load", animateSkills)
}

// Initialize all functions
function init() {
    initThemeToggle()
    initMobileNav()
    initHeaderScroll()
    initScrollToTop()
    initProgressBar()
    initProjectModals()
    initTestimonialsSlider()
    initSkillsAnimation()
}

// Run initialization when DOM is loaded
document.addEventListener("DOMContentLoaded", init)
