// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Set current year in footer
    document.getElementById("current-year").textContent = new Date().getFullYear()

    // Custom cursor
    const cursorDot = document.querySelector(".cursor-dot")
    const cursorOutline = document.querySelector(".cursor-outline")

    window.addEventListener("mousemove", (e) => {
        const posX = e.clientX
        const posY = e.clientY

        cursorDot.style.left = `${posX}px`
        cursorDot.style.top = `${posY}px`

        // Add a slight delay to the outline cursor for a trailing effect
        setTimeout(() => {
            cursorOutline.style.left = `${posX}px`
            cursorOutline.style.top = `${posY}px`
        }, 100)
    })

    // Make cursor bigger when hovering over links and buttons
    const hoverElements = document.querySelectorAll("a, button, .btn, .project-card, .skill-item")

    hoverElements.forEach((element) => {
        element.addEventListener("mouseenter", () => {
            cursorOutline.style.width = "60px"
            cursorOutline.style.height = "60px"
            cursorDot.style.width = "12px"
            cursorDot.style.height = "12px"
        })

        element.addEventListener("mouseleave", () => {
            cursorOutline.style.width = "40px"
            cursorOutline.style.height = "40px"
            cursorDot.style.width = "8px"
            cursorDot.style.height = "8px"
        })
    })

    // Navigation toggle
    const navToggle = document.querySelector(".nav-toggle")
    const mainNav = document.querySelector(".main-nav")
    const navLinks = document.querySelectorAll(".nav-link")

    navToggle.addEventListener("click", () => {
        navToggle.classList.toggle("active")
        mainNav.classList.toggle("active")
        document.body.classList.toggle("nav-open")
    })

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            navToggle.classList.remove("active")
            mainNav.classList.remove("active")
            document.body.classList.remove("nav-open")
        })
    })

    // Theme toggle
    const themeSwitch = document.getElementById("theme-switch")

    themeSwitch.addEventListener("change", () => {
        if (themeSwitch.checked) {
            document.documentElement.setAttribute("data-theme", "dark")
            localStorage.setItem("theme", "dark")
        } else {
            document.documentElement.setAttribute("data-theme", "light")
            localStorage.setItem("theme", "light")
        }
    })

    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "dark") {
        themeSwitch.checked = true
        document.documentElement.setAttribute("data-theme", "dark")
    }

    // Terminal typing animation
    const typingText = document.getElementById("typing-text")
    const codeSnippets = [
        "const portfolio = {",
        "  name: 'Alex',",
        "  role: 'Web Developer',",
        "  skills: ['HTML', 'CSS', 'JavaScript', 'React'],",
        "  passion: 'Creating beautiful web experiences'",
        "};",
        "",
        "// Let's build something amazing together!",
        "console.log('Welcome to my portfolio!');",
    ]

    let lineIndex = 0
    let charIndex = 0
    let isDeleting = false
    let typingSpeed = 100

    function typeWriter() {
        const currentLine = codeSnippets[lineIndex]

        if (!isDeleting) {
            typingText.textContent = currentLine.substring(0, charIndex + 1)
            charIndex++

            if (charIndex === currentLine.length) {
                isDeleting = true
                typingSpeed = 2000 // Pause at the end of the line
            }
        } else {
            typingSpeed = 50 // Faster when deleting

            if (lineIndex === codeSnippets.length - 1) {
                // Don't delete the last line, just restart from the beginning
                lineIndex = 0
                charIndex = 0
                isDeleting = false
                typingSpeed = 100
            } else {
                // Move to the next line
                lineIndex++
                charIndex = 0
                isDeleting = false
            }
        }

        setTimeout(typeWriter, typingSpeed)
    }

    // Start the typing animation
    setTimeout(typeWriter, 1000)

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
    }

    // Animate skill categories on scroll
    const skillCategories = document.querySelectorAll(".skill-category")

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible")
            }
        })
    }, observerOptions)

    skillCategories.forEach((category) => {
        skillObserver.observe(category)
    })

    // Project cards hover effect
    const projectCards = document.querySelectorAll(".project-card")

    projectCards.forEach((card) => {
        const color = card.getAttribute("data-color")
        const viewBtn = card.querySelector(".view-project-btn")

        if (viewBtn) {
            viewBtn.style.borderColor = color
            viewBtn.style.color = color

            viewBtn.addEventListener("mouseenter", () => {
                viewBtn.style.backgroundColor = color
                viewBtn.style.color = "#000"
            })

            viewBtn.addEventListener("mouseleave", () => {
                viewBtn.style.backgroundColor = "transparent"
                viewBtn.style.color = color
            })
        }
    })

    // Project modal functionality
    const viewProjectBtns = document.querySelectorAll(".view-project-btn")
    const projectModal = document.querySelector(".project-modal")
    const closeModalBtn = document.querySelector(".close-modal")

    // Sample project data (in a real project, this would come from a database or API)
    const projectsData = [
        {
            title: "E-Commerce Platform",
            overview:
                "A full-featured online store built with React and Node.js. This platform includes product management, shopping cart functionality, user authentication, and payment processing with Stripe.",
            challenge:
                "The main challenge was creating a seamless shopping experience while ensuring secure payment processing and efficient product management for store owners.",
            features: [
                "User authentication and profiles",
                "Product search and filtering",
                "Shopping cart and checkout process",
                "Payment processing with Stripe",
                "Admin dashboard for product management",
            ],
            technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe API"],
            demoLink: "#",
            githubLink: "#",
            images: ["/placeholder.svg?height=500&width=800"],
        },
        {
            title: "Weather Dashboard",
            overview:
                "Real-time weather application that provides current conditions and 5-day forecasts for any location worldwide.",
            challenge:
                "Integrating multiple weather APIs to provide accurate and comprehensive data while creating an intuitive user interface for displaying complex weather information.",
            features: [
                "Location-based weather detection",
                "5-day weather forecast",
                "Interactive weather maps",
                "Severe weather alerts",
                "Historical weather data",
            ],
            technologies: ["JavaScript", "Weather API", "CSS3", "Chart.js"],
            demoLink: "#",
            githubLink: "#",
            images: ["/placeholder.svg?height=500&width=800"],
        },
        {
            title: "Task Manager",
            overview: "A productivity application with a drag-and-drop interface for managing tasks and projects.",
            challenge:
                "Creating a responsive and intuitive drag-and-drop interface that works across all devices while maintaining real-time data synchronization.",
            features: [
                "Drag-and-drop task organization",
                "Project and task categorization",
                "Due date reminders",
                "Progress tracking",
                "Team collaboration features",
            ],
            technologies: ["Vue.js", "Firebase", "Drag & Drop API"],
            demoLink: "#",
            githubLink: "#",
            images: ["/placeholder.svg?height=500&width=800"],
        },
        {
            title: "Portfolio Generator",
            overview: "Web application that helps users create professional portfolios without coding knowledge.",
            challenge:
                "Building a flexible template system that allows for customization while maintaining professional design standards and generating clean, optimized code.",
            features: [
                "Customizable templates",
                "Drag-and-drop interface",
                "Project showcase section",
                "Contact form integration",
                "One-click deployment",
            ],
            technologies: ["React", "Node.js", "MongoDB", "AWS S3"],
            demoLink: "#",
            githubLink: "#",
            images: ["/placeholder.svg?height=500&width=800"],
        },
        {
            title: "Fitness Tracker",
            overview: "Mobile-first application for tracking workouts and fitness progress over time.",
            challenge:
                "Creating an intuitive data visualization system for workout progress while ensuring the application works offline and synchronizes data when connectivity is restored.",
            features: [
                "Workout logging and tracking",
                "Progress visualization",
                "Custom workout plans",
                "Calorie and nutrition tracking",
                "Offline functionality",
            ],
            technologies: ["JavaScript", "Chart.js", "LocalStorage", "IndexedDB"],
            demoLink: "#",
            githubLink: "#",
            images: ["/placeholder.svg?height=500&width=800"],
        },
    ]

    // Open modal with project details
    viewProjectBtns.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            const project = projectsData[index]

            // Populate modal with project data
            document.getElementById("modal-title").textContent = project.title
            document.getElementById("modal-overview").textContent = project.overview
            document.getElementById("modal-challenge").textContent = project.challenge

            // Populate features list
            const featuresList = document.getElementById("modal-features")
            featuresList.innerHTML = ""
            project.features.forEach((feature) => {
                const li = document.createElement("li")
                li.textContent = feature
                featuresList.appendChild(li)
            })

            // Populate technologies
            const techList = document.getElementById("modal-tech")
            techList.innerHTML = ""
            project.technologies.forEach((tech) => {
                const span = document.createElement("span")
                span.textContent = tech
                techList.appendChild(span)
            })

            // Set links
            document.getElementById("modal-demo").href = project.demoLink
            document.getElementById("modal-github").href = project.githubLink

            // Set image
            document.getElementById("modal-image").src = project.images[0]
            document.getElementById("modal-image").alt = `${project.title} Screenshot`

            // Show modal
            projectModal.classList.add("active")
            document.body.style.overflow = "hidden" // Prevent scrolling when modal is open
        })
    })

    // Close modal
    closeModalBtn.addEventListener("click", () => {
        projectModal.classList.remove("active")
        document.body.style.overflow = "" // Restore scrolling
    })

    // Close modal when clicking outside
    projectModal.addEventListener("click", (e) => {
        if (e.target === projectModal) {
            projectModal.classList.remove("active")
            document.body.style.overflow = ""
        }
        projectModal.classList.remove("active")
        document.body.style.overflow = ""
    })

    // Back to top button
    const backToTopBtn = document.querySelector(".back-to-top")

    window.addEventListener("scroll", () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.opacity = "1"
        } else {
            backToTopBtn.style.opacity = "0"
        }
    })

    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    })

    // Add input animation for form fields
    const formInputs = document.querySelectorAll(".form-group input, .form-group textarea")

    formInputs.forEach((input) => {
        // Set initial state for inputs with values
        if (input.value !== "") {
            input.nextElementSibling.classList.add("active")
        }

        input.addEventListener("focus", () => {
            input.nextElementSibling.classList.add("active")
        })

        input.addEventListener("blur", () => {
            if (input.value === "") {
                input.nextElementSibling.classList.remove("active")
            }
        })
    })

    // Easter egg - Konami code
    const konamiCode = [
        "ArrowUp",
        "ArrowUp",
        "ArrowDown",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        "ArrowLeft",
        "ArrowRight",
        "b",
        "a",
    ]
    let konamiIndex = 0

    document.addEventListener("keydown", (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++

            if (konamiIndex === konamiCode.length) {
                // Easter egg activated!
                document.body.classList.add("konami-active")

                // Create falling code elements
                for (let i = 0; i < 50; i++) {
                    createFallingCode()
                }

                konamiIndex = 0
            }
        } else {
            konamiIndex = 0
        }
    })

    function createFallingCode() {
        const code = document.createElement("div")
        code.classList.add("falling-code")
        code.textContent = Math.random() > 0.5 ? "1" : "0"
        code.style.left = `${Math.random() * 100}vw`
        code.style.animationDuration = `${Math.random() * 3 + 2}s`
        code.style.opacity = Math.random()
        document.body.appendChild(code)

        // Remove the element after animation completes
        setTimeout(() => {
            code.remove()
        }, 5000)
    }

    // Add particles background to hero section
    const heroSection = document.querySelector(".hero-section")

    function createParticles() {
        const particlesContainer = document.createElement("div")
        particlesContainer.classList.add("particles-container")
        heroSection.appendChild(particlesContainer)

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement("div")
            particle.classList.add("particle")

            // Random position
            particle.style.left = `${Math.random() * 100}%`
            particle.style.top = `${Math.random() * 100}%`

            // Random size
            const size = Math.random() * 5 + 1
            particle.style.width = `${size}px`
            particle.style.height = `${size}px`

            // Random opacity
            particle.style.opacity = Math.random() * 0.5 + 0.1

            // Random animation duration
            particle.style.animationDuration = `${Math.random() * 10 + 5}s`

            particlesContainer.appendChild(particle)
        }
    }

    createParticles()

    // Progress indicator
    const progressIndicator = document.createElement("div")
    progressIndicator.classList.add("progress-indicator")
    document.body.appendChild(progressIndicator)

    window.addEventListener("scroll", () => {
        const windowHeight = window.innerHeight
        const documentHeight = document.documentElement.scrollHeight
        const scrollTop = window.pageYOffset

        const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100
        progressIndicator.style.width = `${scrollPercentage}%`
    })
})
