// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Initialize theme
    initTheme()

    // Initialize mobile menu
    initMobileMenu()

    // Initialize progress bar
    initProgressBar()

    // Set current year in footer
    document.getElementById("currentYear").textContent = new Date().getFullYear()

    // Initialize modals if they exist
    initModals()
})

/**
 * Initialize theme based on user preference or localStorage
 */
function initTheme() {
    const themeToggle = document.getElementById("themeToggle")

    // Check for saved theme preference or prefer-color-scheme
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    // Set initial theme
    if (savedTheme === "light") {
        document.body.classList.remove("dark-theme")
        document.body.classList.add("light-theme")
    } else if (savedTheme === "dark" || prefersDark) {
        document.body.classList.add("dark-theme")
        document.body.classList.remove("light-theme")
    }

    // Theme toggle functionality
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            if (document.body.classList.contains("dark-theme")) {
                // Switch to light theme
                document.body.classList.remove("dark-theme")
                document.body.classList.add("light-theme")
                localStorage.setItem("theme", "light")
            } else {
                // Switch to dark theme
                document.body.classList.add("dark-theme")
                document.body.classList.remove("light-theme")
                localStorage.setItem("theme", "dark")
            }
        })
    }
}

/**
 * Initialize mobile menu functionality
 */
function initMobileMenu() {
    const menuToggle = document.getElementById("menuToggle")
    const mobileMenu = document.getElementById("mobileMenu")

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener("click", () => {
            document.body.classList.toggle("menu-open")
        })

        // Close menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll("a")
        mobileLinks.forEach((link) => {
            link.addEventListener("click", () => {
                document.body.classList.remove("menu-open")
            })
        })
    }
}

/**
 * Initialize scroll progress bar
 */
function initProgressBar() {
    const progressBar = document.getElementById("progressBar")

    if (progressBar) {
        window.addEventListener("scroll", () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
            const scrolled = (winScroll / height) * 100
            progressBar.style.width = scrolled + "%"
        })
    }
}

/**
 * Initialize modal functionality
 */
function initModals() {
    const modalTriggers = document.querySelectorAll(".portfolio-modal-trigger")

    if (modalTriggers.length > 0) {
        modalTriggers.forEach((trigger) => {
            trigger.addEventListener("click", function (e) {
                e.preventDefault()
                const modalId = this.getAttribute("href").substring(1)
                const modal = document.getElementById(modalId)

                if (modal) {
                    modal.classList.add("active")
                    document.body.style.overflow = "hidden"

                    // Close modal when clicking the close button
                    const closeBtn = modal.querySelector(".modal-close")
                    if (closeBtn) {
                        closeBtn.addEventListener("click", () => {
                            modal.classList.remove("active")
                            document.body.style.overflow = ""
                        })
                    }

                    // Close modal when clicking outside the content
                    modal.addEventListener("click", (e) => {
                        if (e.target === modal) {
                            modal.classList.remove("active")
                            document.body.style.overflow = ""
                        }
                    })

                    // Close modal with Escape key
                    document.addEventListener("keydown", (e) => {
                        if (e.key === "Escape" && modal.classList.contains("active")) {
                            modal.classList.remove("active")
                            document.body.style.overflow = ""
                        }
                    })
                }
            })
        })
    }
}

/**
 * Add smooth reveal animations to elements when they enter the viewport
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(".animate-on-scroll")

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("fade-in")
                    observer.unobserve(entry.target)
                }
            })
        },
        {
            threshold: 0.1,
        },
    )

    animatedElements.forEach((element) => {
        observer.observe(element)
    })
}

// Initialize scroll animations if supported
if ("IntersectionObserver" in window) {
    window.addEventListener("load", initScrollAnimations)
}
