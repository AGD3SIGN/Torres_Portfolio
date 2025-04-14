// Mobile Navigation
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active")
    navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a nav link
document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active")
        navMenu.classList.remove("active")
    })
})

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault()

        const targetId = this.getAttribute("href")
        const targetElement = document.querySelector(targetId)

        if (targetElement) {
            const headerHeight = document.querySelector("header").offsetHeight
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth",
            })
        }
    })
})

// Image Modal
const modal = document.getElementById("imageModal")
const modalImg = document.getElementById("modalImage")
const modalCaption = document.getElementById("modalCaption")
const closeModal = document.querySelector(".close-modal")
const workItems = document.querySelectorAll(".work-item")

workItems.forEach((item) => {
    item.addEventListener("click", function () {
        modal.style.display = "block"
        modalImg.src = this.querySelector("img").src
        modalCaption.innerHTML = this.getAttribute("data-category")
    })
})

closeModal.addEventListener("click", () => {
    modal.style.display = "none"
})

// Close modal when clicking outside the image
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none"
    }
})

// Form submission
const contactForm = document.querySelector(".contact-form")

contactForm.addEventListener("submit", function (e) {
    e.preventDefault()

    // Get form values
    const name = this.querySelector('input[type="text"]').value
    const email = this.querySelector('input[type="email"]').value
    const message = this.querySelector("textarea").value

    // Here you would typically send the form data to a server
    // For this example, we'll just log it to the console
    console.log("Form submitted:", { name, email, message })

    // Show success message
    alert("Thank you for your message! We will get back to you soon.")

    // Reset form
    this.reset()
})

// Add animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll(".feature, .portfolio-item, .work-item")

    elements.forEach((element) => {
        const elementPosition = element.getBoundingClientRect().top
        const windowHeight = window.innerHeight

        if (elementPosition < windowHeight - 100) {
            element.style.opacity = "1"
            element.style.transform = "translateY(0)"
        }
    })
}

// Set initial state for animation
document.querySelectorAll(".feature, .portfolio-item, .work-item").forEach((element) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(20px)"
    element.style.transition = "opacity 0.5s ease, transform 0.5s ease"
})

// Listen for scroll events
window.addEventListener("scroll", animateOnScroll)
window.addEventListener("load", animateOnScroll)

// Image optimization - lazy loading
document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll("img")

    if ("loading" in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        images.forEach((img) => {
            img.setAttribute("loading", "lazy")
        })
    } else {
        // Fallback for browsers that don't support lazy loading
        const lazyLoadImages = () => {
            images.forEach((img) => {
                if (img.getBoundingClientRect().top <= window.innerHeight && img.getBoundingClientRect().bottom >= 0) {
                    img.src = img.dataset.src
                    img.classList.remove("lazy")
                }
            })
        }

        window.addEventListener("scroll", lazyLoadImages)
        window.addEventListener("resize", lazyLoadImages)
        window.addEventListener("orientationchange", lazyLoadImages)
        lazyLoadImages()
    }
})
