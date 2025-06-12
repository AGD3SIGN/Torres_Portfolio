// Import required libraries
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Lenis from "@studio-freight/lenis"

// Initialize smooth scrolling with Lenis
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: "vertical",
    gestureDirection: "vertical",
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
})

function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Initialize GSAP and ScrollTrigger
    gsap.registerPlugin(ScrollTrigger)

    // Header scroll effect
    const header = document.querySelector(".header")
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled")
        } else {
            header.classList.remove("scrolled")
        }
    })

    // Mobile menu toggle
    const menuToggle = document.querySelector(".mobile-menu-toggle")
    const navList = document.querySelector(".nav-list")

    if (menuToggle) {
        menuToggle.addEventListener("click", () => {
            navList.classList.toggle("active")
            menuToggle.setAttribute("aria-expanded", menuToggle.getAttribute("aria-expanded") === "true" ? "false" : "true")

            // Animate menu toggle bars
            const bars = menuToggle.querySelectorAll(".bar")
            if (navList.classList.contains("active")) {
                gsap.to(bars[0], { rotation: 45, y: 9, duration: 0.3 })
                gsap.to(bars[1], { rotation: -45, y: -9, duration: 0.3 })
            } else {
                gsap.to(bars[0], { rotation: 0, y: 0, duration: 0.3 })
                gsap.to(bars[1], { rotation: 0, y: 0, duration: 0.3 })
            }
        })
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll(".nav-list a")
    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            navList.classList.remove("active")
            if (menuToggle) {
                menuToggle.setAttribute("aria-expanded", "false")
                const bars = menuToggle.querySelectorAll(".bar")
                gsap.to(bars[0], { rotation: 0, y: 0, duration: 0.3 })
                gsap.to(bars[1], { rotation: 0, y: 0, duration: 0.3 })
            }
        })
    })

    // Hero section animations
    const heroTitle = document.querySelector(".hero-title")
    const heroSubtitle = document.querySelector(".hero-subtitle")
    const heroCta = document.querySelector(".hero-cta")
    const heroPanel = document.querySelector(".hero-panel")

    if (heroTitle && heroSubtitle && heroCta && heroPanel) {
        const heroTl = gsap.timeline()

        heroTl
            .from(heroTitle, {
                opacity: 0,
                y: 30,
                duration: 1,
                ease: "power3.out",
            })
            .from(
                heroSubtitle,
                {
                    opacity: 0,
                    y: 20,
                    duration: 0.8,
                    ease: "power3.out",
                },
                "-=0.6",
            )
            .from(
                heroCta.children,
                {
                    opacity: 0,
                    y: 20,
                    duration: 0.6,
                    stagger: 0.2,
                    ease: "power3.out",
                },
                "-=0.4",
            )
            .from(
                heroPanel,
                {
                    opacity: 0,
                    scale: 0.9,
                    duration: 0.8,
                    ease: "back.out(1.7)",
                },
                "-=0.6",
            )
    }

    // Demo button animation in hero panel
    const demoButton = document.querySelector(".demo-button")
    const demoElement = document.querySelector(".demo-element")

    if (demoButton && demoElement) {
        demoButton.addEventListener("click", () => {
            gsap.to(demoElement, {
                y: -20,
                opacity: 0.8,
                duration: 1,
                ease: "power3.out",
                onComplete: () => {
                    gsap.to(demoElement, {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        ease: "bounce.out",
                    })
                },
            })
        })
    }

    // Scroll animations for sections
    const sections = document.querySelectorAll(".section")

    sections.forEach((section) => {
        const title = section.querySelector(".section-title")
        const subtitle = section.querySelector(".section-subtitle")
        const content = section.querySelector(".section > .container > *:not(.section-title):not(.section-subtitle)")

        if (title) {
            gsap.from(title, {
                scrollTrigger: {
                    trigger: title,
                    start: "top bottom-=100",
                    toggleActions: "play none none none",
                },
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: "power3.out",
            })
        }

        if (subtitle) {
            gsap.from(subtitle, {
                scrollTrigger: {
                    trigger: subtitle,
                    start: "top bottom-=100",
                    toggleActions: "play none none none",
                },
                opacity: 0,
                y: 20,
                duration: 0.8,
                delay: 0.2,
                ease: "power3.out",
            })
        }

        if (content) {
            gsap.from(content, {
                scrollTrigger: {
                    trigger: content,
                    start: "top bottom-=50",
                    toggleActions: "play none none none",
                },
                opacity: 0,
                y: 30,
                duration: 0.8,
                delay: 0.4,
                ease: "power3.out",
            })
        }
    })

    // Service card hover effect
    const serviceCards = document.querySelectorAll(".service-card")

    serviceCards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
            gsap.to(card, {
                y: -10,
                duration: 0.3,
                ease: "power2.out",
                boxShadow: "0 20px 30px rgba(0, 0, 0, 0.2)",
            })
        })

        card.addEventListener("mouseleave", () => {
            gsap.to(card, {
                y: 0,
                duration: 0.3,
                ease: "power2.out",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
            })
        })
    })

    // Project filtering
    const filterButtons = document.querySelectorAll(".filter-btn")
    const projectCards = document.querySelectorAll(".project-card")

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            // Update active button
            filterButtons.forEach((btn) => btn.classList.remove("active"))
            button.classList.add("active")

            const filter = button.getAttribute("data-filter")

            // Filter projects
            projectCards.forEach((card) => {
                const categories = card.getAttribute("data-category")

                if (filter === "all" || categories.includes(filter)) {
                    gsap.to(card, {
                        opacity: 1,
                        scale: 1,
                        duration: 0.4,
                        ease: "power2.out",
                        display: "block",
                    })
                } else {
                    gsap.to(card, {
                        opacity: 0,
                        scale: 0.95,
                        duration: 0.4,
                        ease: "power2.out",
                        display: "none",
                    })
                }
            })
        })
    })

    // Project case study modals
    const projectButtons = document.querySelectorAll(".view-project")
    const modals = document.querySelectorAll(".modal-container")
    const modalCloseButtons = document.querySelectorAll(".modal-close")

    projectButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const projectId = button.getAttribute("data-project")
            const modal = document.getElementById(`${projectId}Modal`)

            if (modal) {
                // Open modal
                modal.classList.add("active")
                document.body.style.overflow = "hidden"

                // Animate modal content
                const modalContent = modal.querySelector(".modal-content")
                gsap.fromTo(
                    modalContent,
                    { opacity: 0, y: 30, scale: 0.9 },
                    { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.7)" },
                )
            }
        })
    })

    modalCloseButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const modal = button.closest(".modal-container")

            // Close modal
            gsap.to(modal.querySelector(".modal-content"), {
                opacity: 0,
                y: 30,
                scale: 0.9,
                duration: 0.3,
                ease: "power2.in",
                onComplete: () => {
                    modal.classList.remove("active")
                    document.body.style.overflow = ""
                },
            })
        })
    })

    // Close modal when clicking outside
    modals.forEach((modal) => {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                gsap.to(modal.querySelector(".modal-content"), {
                    opacity: 0,
                    y: 30,
                    scale: 0.9,
                    duration: 0.3,
                    ease: "power2.in",
                    onComplete: () => {
                        modal.classList.remove("active")
                        document.body.style.overflow = ""
                    },
                })
            }
        })
    })

    // Case study navigation
    const navPrevButtons = document.querySelectorAll(".nav-prev")
    const navNextButtons = document.querySelectorAll(".nav-next")

    navPrevButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const currentModal = button.closest(".modal-container")
            const prevProjectId = button.getAttribute("data-project")
            const prevModal = document.getElementById(`${prevProjectId}Modal`)

            if (prevModal) {
                // Close current modal
                gsap.to(currentModal.querySelector(".modal-content"), {
                    opacity: 0,
                    x: 100,
                    duration: 0.3,
                    ease: "power2.in",
                    onComplete: () => {
                        currentModal.classList.remove("active")

                        // Open previous modal
                        prevModal.classList.add("active")
                        gsap.fromTo(
                            prevModal.querySelector(".modal-content"),
                            { opacity: 0, x: -100 },
                            { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" },
                        )
                    },
                })
            }
        })
    })

    navNextButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const currentModal = button.closest(".modal-container")
            const nextProjectId = button.getAttribute("data-project")
            const nextModal = document.getElementById(`${nextProjectId}Modal`)

            if (nextModal) {
                // Close current modal
                gsap.to(currentModal.querySelector(".modal-content"), {
                    opacity: 0,
                    x: -100,
                    duration: 0.3,
                    ease: "power2.in",
                    onComplete: () => {
                        currentModal.classList.remove("active")

                        // Open next modal
                        nextModal.classList.add("active")
                        gsap.fromTo(
                            nextModal.querySelector(".modal-content"),
                            { opacity: 0, x: 100 },
                            { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" },
                        )
                    },
                })
            }
        })
    })

    // Testimonial carousel
    const testimonialSlides = document.querySelectorAll(".testimonial-slide")
    const testimonialDots = document.querySelectorAll(".testimonial-dots .dot")
    const prevButton = document.querySelector(".testimonial-arrow.prev")
    const nextButton = document.querySelector(".testimonial-arrow.next")
    let currentSlide = 0

    function showSlide(index) {
        // Hide all slides
        testimonialSlides.forEach((slide) => {
            slide.classList.remove("active")
        })

        // Remove active class from all dots
        testimonialDots.forEach((dot) => {
            dot.classList.remove("active")
        })

        // Show current slide and activate dot
        testimonialSlides[index].classList.add("active")
        testimonialDots[index].classList.add("active")
    }

    if (prevButton && nextButton) {
        prevButton.addEventListener("click", () => {
            currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length
            showSlide(currentSlide)
        })

        nextButton.addEventListener("click", () => {
            currentSlide = (currentSlide + 1) % testimonialSlides.length
            showSlide(currentSlide)
        })
    }

    testimonialDots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            currentSlide = index
            showSlide(currentSlide)
        })
    })

    // Auto-rotate testimonials
    let testimonialInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % testimonialSlides.length
        showSlide(currentSlide)
    }, 5000)

    // Pause auto-rotation on hover
    const testimonialCarousel = document.querySelector(".testimonials-carousel")
    if (testimonialCarousel) {
        testimonialCarousel.addEventListener("mouseenter", () => {
            clearInterval(testimonialInterval)
        })

        testimonialCarousel.addEventListener("mouseleave", () => {
            testimonialInterval = setInterval(() => {
                currentSlide = (currentSlide + 1) % testimonialSlides.length
                showSlide(currentSlide)
            }, 5000)
        })
    }

    // Contact form validation and submission
    const contactForm = document.getElementById("contactForm")

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault()

            // Simple form validation
            const name = document.getElementById("name").value
            const email = document.getElementById("email").value
            const subject = document.getElementById("subject").value
            const message = document.getElementById("message").value

            if (!name || !email || !subject || !message) {
                alert("Please fill in all fields")
                return
            }

            // Simulate form submission
            const submitButton = contactForm.querySelector('button[type="submit"]')
            const originalText = submitButton.textContent

            submitButton.disabled = true
            submitButton.textContent = "Sending..."

            // Simulate API call
            setTimeout(() => {
                // Reset form
                contactForm.reset()

                // Show success message
                submitButton.textContent = "Message Sent!"
                submitButton.style.backgroundColor = "var(--color-success)"

                // Reset button after delay
                setTimeout(() => {
                    submitButton.disabled = false
                    submitButton.textContent = originalText
                    submitButton.style.backgroundColor = ""
                }, 3000)
            }, 1500)
        })
    }

    // Skill bar animation
    const skillBars = document.querySelectorAll(".skill-progress")

    skillBars.forEach((bar) => {
        const width = bar.style.width

        // Initial state
        gsap.set(bar, { width: 0 })

        // Animate on scroll
        ScrollTrigger.create({
            trigger: bar,
            start: "top bottom-=100",
            onEnter: () => {
                gsap.to(bar, {
                    width: width,
                    duration: 1.5,
                    ease: "power3.out",
                })
            },
        })
    })

    // Parallax effect for hero section
    const heroSection = document.querySelector(".hero")

    if (heroSection) {
        gsap.to(".hero-panel", {
            scrollTrigger: {
                trigger: heroSection,
                start: "top top",
                end: "bottom top",
                scrub: true,
            },
            y: 100,
            ease: "none",
        })
    }

    // Custom cursor effect (optional)
    const cursor = document.createElement("div")
    cursor.classList.add("custom-cursor")
    document.body.appendChild(cursor)

    document.addEventListener("mousemove", (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
        })
    })

    // Hover effect for interactive elements
    const interactiveElements = document.querySelectorAll("a, button, .project-card, .service-card")

    interactiveElements.forEach((element) => {
        element.addEventListener("mouseenter", () => {
            gsap.to(cursor, {
                scale: 1.5,
                backgroundColor: "rgba(0, 163, 255, 0.2)",
                border: "1px solid var(--color-accent)",
                duration: 0.3,
            })
        })

        element.addEventListener("mouseleave", () => {
            gsap.to(cursor, {
                scale: 1,
                backgroundColor: "transparent",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                duration: 0.3,
            })
        })
    })
})
