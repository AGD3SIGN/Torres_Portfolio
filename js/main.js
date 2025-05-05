/**
 * Portfolio Website JavaScript
 * A comprehensive JS file for a freelance web designer portfolio
 */

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Initialize variables
    const header = document.getElementById("header")
    const menuToggle = document.querySelector(".menu-toggle")
    const body = document.body
    const themeToggle = document.getElementById("themeToggle")
    const backToTop = document.getElementById("backToTop")
    const progressBar = document.getElementById("progressBar")
    const animatedElements = document.querySelectorAll(".animate-in")
    const carouselItems = document.querySelectorAll(".carousel-item")
    const carouselPrev = document.querySelector(".carousel-prev")
    const carouselNext = document.querySelector(".carousel-next")
    const carouselDots = document.querySelector(".carousel-dots")
    const testimonialSlides = document.querySelectorAll(".testimonial-slide")
    const testimonialPrev = document.querySelector(".testimonial-prev")
    const testimonialNext = document.querySelector(".testimonial-next")
    const testimonialDots = document.querySelector(".testimonial-dots")
    const filterBtns = document.querySelectorAll(".filter-btn")
    const portfolioItems = document.querySelectorAll(".portfolio-item")
    const portfolioLinks = document.querySelectorAll(".portfolio-link")
    const projectModal = document.getElementById("projectModal")
    const modalClose = document.querySelector(".modal-close")
    const modalBody = document.querySelector(".modal-body")
    const contactForm = document.getElementById("contactForm")
    const navLinks = document.querySelectorAll(".nav-link")
    const mobileNavLinks = document.querySelectorAll(".mobile-nav-link")

    // Check for saved theme preference or use default
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "light") {
        body.classList.add("light-theme")
    }

    // Theme Toggle Functionality
    themeToggle.addEventListener("click", () => {
        body.classList.toggle("light-theme")

        // Save theme preference
        if (body.classList.contains("light-theme")) {
            localStorage.setItem("theme", "light")
        } else {
            localStorage.setItem("theme", "dark")
        }
    })

    // Mobile Menu Toggle
    menuToggle.addEventListener("click", () => {
        body.classList.toggle("menu-open")
        menuToggle.setAttribute("aria-expanded", body.classList.contains("menu-open"))
    })

    // Close mobile menu when clicking a link
    mobileNavLinks.forEach((link) => {
        link.addEventListener("click", () => {
            body.classList.remove("menu-open")
            menuToggle.setAttribute("aria-expanded", "false")
        })
    })

    // Header scroll effect
    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add("scrolled")
        } else {
            header.classList.remove("scrolled")
        }

        // Back to top button visibility
        if (window.scrollY > 500) {
            backToTop.classList.add("visible")
        } else {
            backToTop.classList.remove("visible")
        }

        // Progress bar
        const scrollPosition = window.scrollY
        const totalHeight = document.body.scrollHeight - window.innerHeight
        const progress = (scrollPosition / totalHeight) * 100
        progressBar.style.width = progress + "%"

        // Animate elements when they come into view
        animatedElements.forEach((element) => {
            if (isElementInViewport(element)) {
                element.classList.add("visible")
            }
        })

        // Active nav link based on scroll position
        const scrollSections = document.querySelectorAll("section")
        let currentSection = ""

        scrollSections.forEach((section) => {
            const sectionTop = section.offsetTop - 100
            const sectionHeight = section.offsetHeight

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute("id")
            }
        })

        navLinks.forEach((link) => {
            link.classList.remove("active")
            if (link.getAttribute("href") === "#" + currentSection) {
                link.classList.add("active")
            }
        })
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Call once on load

    // Back to top button
    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    })

    // Check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect()
        return rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 && rect.bottom >= 0
    }

    // Featured Projects Carousel
    let currentSlide = 0
    const totalSlides = carouselItems.length

    // Create carousel dots
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement("div")
        dot.classList.add("carousel-dot")
        if (i === 0) dot.classList.add("active")
        dot.setAttribute("data-slide", i)
        carouselDots.appendChild(dot)

        dot.addEventListener("click", function () {
            goToSlide(Number.parseInt(this.getAttribute("data-slide")))
        })
    }

    function updateCarousel() {
        const carousel = document.querySelector(".carousel")
        carousel.style.transform = `translateX(-${currentSlide * 100}%)`

        // Update dots
        document.querySelectorAll(".carousel-dot").forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add("active")
            } else {
                dot.classList.remove("active")
            }
        })
    }

    function goToSlide(slideIndex) {
        currentSlide = slideIndex
        updateCarousel()
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides
        updateCarousel()
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides
        updateCarousel()
    }

    carouselNext.addEventListener("click", nextSlide)
    carouselPrev.addEventListener("click", prevSlide)

    // Auto advance carousel
    let carouselInterval = setInterval(nextSlide, 5000)

    // Pause carousel on hover
    const carouselContainer = document.querySelector(".carousel-container")
    carouselContainer.addEventListener("mouseenter", () => {
        clearInterval(carouselInterval)
    })

    carouselContainer.addEventListener("mouseleave", () => {
        carouselInterval = setInterval(nextSlide, 5000)
    })

    // Testimonials Slider
    let currentTestimonial = 0
    const totalTestimonials = testimonialSlides.length

    // Create testimonial dots
    for (let i = 0; i < totalTestimonials; i++) {
        const dot = document.createElement("div")
        dot.classList.add("testimonial-dot")
        if (i === 0) dot.classList.add("active")
        dot.setAttribute("data-slide", i)
        testimonialDots.appendChild(dot)

        dot.addEventListener("click", function () {
            goToTestimonial(Number.parseInt(this.getAttribute("data-slide")))
        })
    }

    function updateTestimonials() {
        const slider = document.querySelector(".testimonials-slider")

        // Position all slides
        testimonialSlides.forEach((slide, index) => {
            slide.style.transform = `translateX(${(index - currentTestimonial) * 100}%)`
            slide.style.opacity = index === currentTestimonial ? "1" : "0"
            slide.style.zIndex = index === currentTestimonial ? "1" : "0"
        })

        // Update dots
        document.querySelectorAll(".testimonial-dot").forEach((dot, index) => {
            if (index === currentTestimonial) {
                dot.classList.add("active")
            } else {
                dot.classList.remove("active")
            }
        })
    }

    function goToTestimonial(slideIndex) {
        currentTestimonial = slideIndex
        updateTestimonials()
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % totalTestimonials
        updateTestimonials()
    }

    function prevTestimonial() {
        currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials
        updateTestimonials()
    }

    testimonialNext.addEventListener("click", nextTestimonial)
    testimonialPrev.addEventListener("click", prevTestimonial)

    // Position testimonial slides initially
    testimonialSlides.forEach((slide, index) => {
        slide.style.position = "absolute"
        slide.style.width = "100%"
        slide.style.transition = "transform 0.5s ease, opacity 0.5s ease"
    })
    updateTestimonials()

    // Auto advance testimonials
    let testimonialInterval = setInterval(nextTestimonial, 6000)

    // Pause testimonials on hover
    const testimonialContainer = document.querySelector(".testimonials-slider")
    testimonialContainer.addEventListener("mouseenter", () => {
        clearInterval(testimonialInterval)
    })

    testimonialContainer.addEventListener("mouseleave", () => {
        testimonialInterval = setInterval(nextTestimonial, 6000)
    })

    // Portfolio Filtering
    filterBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
            // Update active button
            filterBtns.forEach((b) => b.classList.remove("active"))
            this.classList.add("active")

            const filterValue = this.getAttribute("data-filter")

            portfolioItems.forEach((item) => {
                if (filterValue === "all" || item.getAttribute("data-category") === filterValue) {
                    item.style.display = "block"
                    setTimeout(() => {
                        item.style.opacity = "1"
                        item.style.transform = "scale(1)"
                    }, 10)
                } else {
                    item.style.opacity = "0"
                    item.style.transform = "scale(0.8)"
                    setTimeout(() => {
                        item.style.display = "none"
                    }, 300)
                }
            })
        })
    })

    // Portfolio Modal
    portfolioLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
            e.preventDefault()

            const projectId = this.getAttribute("data-project")
            const projectContent = document.getElementById(projectId)

            if (projectContent) {
                modalBody.innerHTML = projectContent.innerHTML
                projectModal.classList.add("open")
                document.body.style.overflow = "hidden" // Prevent scrolling when modal is open
            }
        })
    })

    modalClose.addEventListener("click", () => {
        projectModal.classList.remove("open")
        document.body.style.overflow = "" // Re-enable scrolling
    })

    // Close modal when clicking outside content
    projectModal.addEventListener("click", (e) => {
        if (e.target === projectModal) {
            projectModal.classList.remove("open")
            document.body.style.overflow = ""
        }
    })

    // Close modal with Escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && projectModal.classList.contains("open")) {
            projectModal.classList.remove("open")
            document.body.style.overflow = ""
        }
    })

    // Contact Form Validation and Submission
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault()

            // Basic form validation
            let isValid = true
            const formElements = contactForm.elements

            for (let i = 0; i < formElements.length; i++) {
                const element = formElements[i]

                if (element.hasAttribute("required") && !element.value.trim()) {
                    isValid = false
                    element.classList.add("error")
                } else if (element.type === "email" && element.value.trim()) {
                    // Simple email validation
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                    if (!emailPattern.test(element.value.trim())) {
                        isValid = false
                        element.classList.add("error")
                    } else {
                        element.classList.remove("error")
                    }
                } else {
                    element.classList.remove("error")
                }
            }

            if (isValid) {
                // In a real implementation, you would send the form data to a server
                // For this example, we'll just show a success message
                const formData = new FormData(contactForm)
                const formObject = {}

                formData.forEach((value, key) => {
                    formObject[key] = value
                })

                console.log("Form submitted:", formObject)

                // Show success message
                const successMessage = document.createElement("div")
                successMessage.className = "form-success"
                successMessage.innerHTML = `
                      <i class="ri-check-line"></i>
                      <h3>Message Sent Successfully!</h3>
                      <p>Thank you for your inquiry. I'll get back to you as soon as possible.</p>
                  `

                contactForm.innerHTML = ""
                contactForm.appendChild(successMessage)
            }
        })
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault()

            const targetId = this.getAttribute("href")

            if (targetId === "#") return

            const targetElement = document.querySelector(targetId)

            if (targetElement) {
                const headerOffset = 80
                const elementPosition = targetElement.getBoundingClientRect().top
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth",
                })
            }
        })
    })

    // Initialize the page
    updateCarousel()
    handleScroll()
})

// Add CSS class for browsers that support hover
if (window.matchMedia("(hover: hover)").matches) {
    document.documentElement.classList.add("has-hover")
}
