// Combined JavaScript functionality
document.addEventListener("DOMContentLoaded", () => {
    // Initialize all components
    initializeScrollProgress()
    initializeNavigation()
    initializeTheme()
    initializeScrollAnimations()
    initializeSkillBars()
    initializeBackToTop()
    initializeSmoothScrolling()
    initializeIntersectionObserver()
    initializePortfolioFiltering()
    initializePortfolioAnimations()
    initializeModals()
    initializeContactForm()
    initializeTestimonialCarousel()

    // Add loading complete class
    document.body.classList.add("loaded")
})

// Scroll Progress Bar
function initializeScrollProgress() {
    const progressBar = document.getElementById("scrollProgress")
    if (!progressBar) return

    function updateScrollProgress() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
        const scrollPercentage = (scrollTop / scrollHeight) * 100

        progressBar.style.width = `${Math.min(scrollPercentage, 100)}%`
    }

    window.addEventListener("scroll", throttle(updateScrollProgress, 10))
    updateScrollProgress() // Initial call
}

// Navigation functionality
function initializeNavigation() {
    const header = document.querySelector(".header")
    const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
    const nav = document.querySelector(".nav")
    const navLinks = document.querySelectorAll(".nav-link")

    // Mobile menu toggle
    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener("click", () => {
            const isActive = nav.classList.contains("active")

            if (isActive) {
                nav.classList.remove("active")
                mobileMenuToggle.classList.remove("active")
                mobileMenuToggle.setAttribute("aria-expanded", "false")
                document.body.style.overflow = ""
            } else {
                nav.classList.add("active")
                mobileMenuToggle.classList.add("active")
                mobileMenuToggle.setAttribute("aria-expanded", "true")
                document.body.style.overflow = "hidden"
            }
        })
    }

    // Close mobile menu when clicking nav links
    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            if (nav.classList.contains("active")) {
                nav.classList.remove("active")
                mobileMenuToggle.classList.remove("active")
                mobileMenuToggle.setAttribute("aria-expanded", "false")
                document.body.style.overflow = ""
            }
        })
    })

    // Header scroll effect
    let lastScrollTop = 0
    window.addEventListener("scroll", () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop

        if (scrollTop > 100) {
            header.classList.add("scrolled")
        } else {
            header.classList.remove("scrolled")
        }

        // Hide/show header on scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.style.transform = "translateY(-100%)"
        } else {
            header.style.transform = "translateY(0)"
        }

        lastScrollTop = scrollTop
    })

    // Active navigation link highlighting
    updateActiveNavLink()
    window.addEventListener("scroll", updateActiveNavLink)
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll("section[id]")
    const navLinks = document.querySelectorAll(".nav-link")

    let currentSection = ""
    const scrollPosition = window.scrollY + 100

    sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.offsetHeight

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute("id")
        }
    })

    navLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active")
        }
    })
}

// Theme switching functionality
function initializeTheme() {
    const themeToggle = document.querySelector(".theme-toggle")
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)")

    // Get saved theme or use system preference
    const savedTheme = localStorage.getItem("theme")
    const systemTheme = prefersDarkScheme.matches ? "dark" : "light"
    const currentTheme = savedTheme || systemTheme

    // Apply initial theme
    setTheme(currentTheme)

    // Theme toggle event listener
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const currentTheme = document.documentElement.getAttribute("data-theme")
            const newTheme = currentTheme === "dark" ? "light" : "dark"
            setTheme(newTheme)
        })
    }

    // Listen for system theme changes
    prefersDarkScheme.addEventListener("change", (e) => {
        if (!localStorage.getItem("theme")) {
            setTheme(e.matches ? "dark" : "light")
        }
    })

    // Keyboard shortcut for theme toggle (Ctrl/Cmd + Shift + T)
    document.addEventListener("keydown", (e) => {
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "T") {
            e.preventDefault()
            const currentTheme = getCurrentTheme()
            const newTheme = currentTheme === "dark" ? "light" : "dark"
            setTheme(newTheme)
        }
    })
}

// Set theme and save preference
function setTheme(theme) {
    // Add transition class for smooth theme switching
    document.body.classList.add("theme-switching")

    // Apply theme
    document.documentElement.setAttribute("data-theme", theme)

    // Save theme preference
    localStorage.setItem("theme", theme)

    // Update theme toggle button
    updateThemeToggle(theme)

    // Remove transition class after animation
    setTimeout(() => {
        document.body.classList.remove("theme-switching")
    }, 300)

    // Dispatch custom event for other components
    window.dispatchEvent(
        new CustomEvent("themeChanged", {
            detail: { theme },
        }),
    )
}

// Update theme toggle button appearance
function updateThemeToggle(theme) {
    const themeToggle = document.querySelector(".theme-toggle")
    if (themeToggle) {
        themeToggle.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode")
        themeToggle.setAttribute("title", theme === "dark" ? "Switch to light mode" : "Switch to dark mode")
    }
}

// Get current theme
function getCurrentTheme() {
    return document.documentElement.getAttribute("data-theme") || "light"
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]')

    links.forEach((link) => {
        link.addEventListener("click", function (e) {
            e.preventDefault()

            const targetId = this.getAttribute("href").substring(1)
            const targetElement = document.getElementById(targetId)

            if (targetElement) {
                const headerHeight = document.querySelector(".header").offsetHeight
                const targetPosition = targetElement.offsetTop - headerHeight

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth",
                })
            }
        })
    })
}

// Intersection Observer for scroll animations
function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible")

                // Trigger skill bar animations
                if (entry.target.classList.contains("skills-grid")) {
                    animateSkillBars()
                }

                // Trigger counter animations
                if (entry.target.classList.contains("hero-stats")) {
                    animateCounters()
                }
            }
        })
    }, observerOptions)

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        ".fade-in, .slide-in-left, .slide-in-right, .scale-in, .skills-grid, .hero-stats",
    )
    animatedElements.forEach((el) => {
        observer.observe(el)
    })
}

// Initialize scroll animations
function initializeScrollAnimations() {
    // Add animation classes to elements
    const sections = document.querySelectorAll(".section")
    sections.forEach((section, index) => {
        const delay = index * 100
        section.style.animationDelay = `${delay}ms`
        section.classList.add("fade-in")
    })

    // Service cards animation
    const serviceCards = document.querySelectorAll(".service-card")
    serviceCards.forEach((card, index) => {
        const delay = index * 150
        card.style.animationDelay = `${delay}ms`
        card.classList.add("scale-in")
    })

    // Portfolio items animation
    const portfolioItems = document.querySelectorAll(".portfolio-item")
    portfolioItems.forEach((item, index) => {
        const delay = index * 100
        item.style.animationDelay = `${delay}ms`
        item.classList.add("fade-in")
    })
}

// Skill bars animation
function initializeSkillBars() {
    const skillBars = document.querySelectorAll(".skill-progress")

    skillBars.forEach((bar) => {
        const skillLevel = bar.getAttribute("data-skill")
        bar.style.width = "0%"
    })
}

function animateSkillBars() {
    const skillBars = document.querySelectorAll(".skill-progress")

    skillBars.forEach((bar, index) => {
        const skillLevel = bar.getAttribute("data-skill")

        setTimeout(() => {
            bar.style.width = `${skillLevel}%`
        }, index * 200)
    })
}

// Counter animation
function animateCounters() {
    const counters = document.querySelectorAll(".stat-number")

    counters.forEach((counter) => {
        const target = Number.parseInt(counter.textContent.replace(/\D/g, ""))
        const suffix = counter.textContent.replace(/\d/g, "")
        let current = 0
        const increment = target / 50
        const timer = setInterval(() => {
            current += increment
            if (current >= target) {
                counter.textContent = target + suffix
                clearInterval(timer)
            } else {
                counter.textContent = Math.floor(current) + suffix
            }
        }, 50)
    })
}

// Back to top functionality
function initializeBackToTop() {
    const backToTopButton = document.querySelector(".back-to-top")

    if (backToTopButton) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                backToTopButton.style.opacity = "1"
                backToTopButton.style.visibility = "visible"
            } else {
                backToTopButton.style.opacity = "0"
                backToTopButton.style.visibility = "hidden"
            }
        })

        backToTopButton.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            })
        })
    }
}

// Portfolio filtering and management
function initializePortfolioFiltering() {
    const filterButtons = document.querySelectorAll(".filter-btn")
    const portfolioItems = document.querySelectorAll(".portfolio-item")

    filterButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const filter = this.getAttribute("data-filter")

            // Update active button
            filterButtons.forEach((btn) => btn.classList.remove("active"))
            this.classList.add("active")

            // Filter portfolio items
            filterPortfolioItems(filter, portfolioItems)
        })
    })
}

// Filter portfolio items based on category
function filterPortfolioItems(filter, items) {
    items.forEach((item, index) => {
        const category = item.getAttribute("data-category")
        const shouldShow = filter === "all" || category === filter

        if (shouldShow) {
            // Show item with animation delay
            setTimeout(() => {
                item.classList.remove("hidden")
                item.style.opacity = "1"
                item.style.transform = "scale(1)"
            }, index * 100)
        } else {
            // Hide item
            item.classList.add("hidden")
            item.style.opacity = "0"
            item.style.transform = "scale(0.8)"
        }
    })
}

// Portfolio animations
function initializePortfolioAnimations() {
    const portfolioItems = document.querySelectorAll(".portfolio-item")

    portfolioItems.forEach((item) => {
        // Hover effects
        item.addEventListener("mouseenter", function () {
            this.style.transform = "translateY(-8px)"
        })

        item.addEventListener("mouseleave", function () {
            if (!this.classList.contains("hidden")) {
                this.style.transform = "translateY(0)"
            }
        })

        // Click handling for mobile
        item.addEventListener("click", function (e) {
            if (window.innerWidth <= 768) {
                const overlay = this.querySelector(".portfolio-overlay")
                if (overlay) {
                    overlay.style.opacity = overlay.style.opacity === "1" ? "0" : "1"
                }
            }
        })
    })
}

// Portfolio data for modals
const portfolioData = {
    project1: {
        title: "TechStore E-commerce Platform",
        subtitle: "Complete e-commerce solution with custom shopping cart and payment integration",
        image: "/placeholder.svg?height=400&width=600",
        tags: ["React", "Node.js", "Stripe", "MongoDB"],
        liveUrl: "https://techstore-demo.com",
        codeUrl: "https://github.com/alexjohnson/techstore",
        description:
            "A comprehensive e-commerce platform built for a technology retailer, featuring a modern React frontend with a robust Node.js backend. The platform handles everything from product catalog management to secure payment processing.",
        challenge:
            "The client needed a scalable e-commerce solution that could handle high traffic during sales events while providing a seamless user experience across all devices. The existing platform was outdated and couldn't handle the growing customer base.",
        solution:
            "I developed a modern, responsive e-commerce platform using React for the frontend and Node.js for the backend. The solution includes real-time inventory management, secure payment processing with Stripe, and a comprehensive admin dashboard for managing products, orders, and customers.",
        features: [
            {
                title: "Real-time Inventory",
                description: "Live inventory tracking with automatic stock updates and low-stock alerts.",
            },
            {
                title: "Secure Payments",
                description: "Integrated Stripe payment processing with support for multiple payment methods.",
            },
            {
                title: "Admin Dashboard",
                description: "Comprehensive admin panel for managing products, orders, and customer data.",
            },
            {
                title: "Mobile Optimized",
                description: "Fully responsive design optimized for mobile shopping experiences.",
            },
        ],
        metrics: [
            { value: "40%", label: "Increase in Sales" },
            { value: "60%", label: "Faster Load Times" },
            { value: "25%", label: "Higher Conversion" },
            { value: "99.9%", label: "Uptime" },
        ],
        testimonial: {
            text: "Alex delivered exactly what we needed - a modern, fast website that perfectly represents our brand. Our online sales have increased by 40% since the launch.",
            author: "Sarah Chen",
            position: "CEO, TechStart Solutions",
            image: "/placeholder.svg?height=60&width=60",
        },
        gallery: [
            "/placeholder.svg?height=300&width=400",
            "/placeholder.svg?height=300&width=400",
            "/placeholder.svg?height=300&width=400",
        ],
    },
    project2: {
        title: "TaskFlow Project Management",
        subtitle: "Collaborative project management tool with real-time updates and team features",
        image: "/placeholder.svg?height=400&width=600",
        tags: ["Vue.js", "Express", "Socket.io", "PostgreSQL"],
        liveUrl: "https://taskflow-demo.com",
        codeUrl: "https://github.com/alexjohnson/taskflow",
        description:
            "A comprehensive project management application designed for remote teams, featuring real-time collaboration, task tracking, and team communication tools. Built with Vue.js and powered by Socket.io for real-time updates.",
        challenge:
            "Remote teams were struggling with project coordination and communication. Existing tools were either too complex or lacked the real-time collaboration features needed for effective remote work.",
        solution:
            "I created TaskFlow, a streamlined project management tool that focuses on real-time collaboration. The application features live updates, team chat, file sharing, and intuitive project tracking, all wrapped in a clean, user-friendly interface.",
        features: [
            {
                title: "Real-time Collaboration",
                description: "Live updates and notifications keep team members synchronized across all devices.",
            },
            {
                title: "Task Management",
                description: "Intuitive task creation, assignment, and tracking with customizable workflows.",
            },
            {
                title: "Team Communication",
                description: "Built-in chat and comment system for seamless team communication.",
            },
            {
                title: "File Sharing",
                description: "Secure file upload and sharing with version control and access permissions.",
            },
        ],
        metrics: [
            { value: "50%", label: "Productivity Increase" },
            { value: "30%", label: "Faster Project Delivery" },
            { value: "95%", label: "User Satisfaction" },
            { value: "24/7", label: "Real-time Sync" },
        ],
        testimonial: {
            text: "TaskFlow has revolutionized how our remote team collaborates. The real-time features and intuitive interface have significantly improved our productivity.",
            author: "Michael Rodriguez",
            position: "Project Manager, Digital Innovations",
            image: "/placeholder.svg?height=60&width=60",
        },
        gallery: [
            "/placeholder.svg?height=300&width=400",
            "/placeholder.svg?height=300&width=400",
            "/placeholder.svg?height=300&width=400",
        ],
    },
    project3: {
        title: "GreenLeaf Restaurant Website",
        subtitle: "Modern restaurant website with online reservations and menu management",
        image: "/placeholder.svg?height=400&width=600",
        tags: ["WordPress", "PHP", "MySQL", "Custom Theme"],
        liveUrl: "https://greenleaf-demo.com",
        codeUrl: "https://github.com/alexjohnson/greenleaf",
        description:
            "A beautiful, modern website for GreenLeaf Restaurant featuring online reservations, dynamic menu management, and event booking capabilities. Built on WordPress with a custom theme optimized for the restaurant industry.",
        challenge:
            "GreenLeaf Restaurant needed a professional online presence that could handle reservations, showcase their menu, and promote special events. Their old website was outdated and didn't reflect the quality of their establishment.",
        solution:
            "I designed and developed a custom WordPress theme specifically tailored for the restaurant industry. The site features an elegant design that reflects the restaurant's atmosphere, integrated reservation system, and easy-to-manage menu sections.",
        features: [
            {
                title: "Online Reservations",
                description: "Integrated booking system with real-time availability and confirmation emails.",
            },
            {
                title: "Dynamic Menu",
                description: "Easy-to-update menu system with categories, pricing, and dietary information.",
            },
            {
                title: "Event Management",
                description: "Special events section with booking capabilities and promotional features.",
            },
            {
                title: "Gallery Showcase",
                description: "Beautiful image galleries showcasing food, ambiance, and special events.",
            },
        ],
        metrics: [
            { value: "65%", label: "Increase in Reservations" },
            { value: "45%", label: "More Event Bookings" },
            { value: "80%", label: "Mobile Traffic" },
            { value: "4.8/5", label: "Customer Rating" },
        ],
        testimonial: {
            text: "Working with Alex was a game-changer for our restaurant. The new website not only looks amazing but also handles our online reservations seamlessly.",
            author: "Marcus Rodriguez",
            position: "Owner, GreenLeaf Restaurant",
            image: "/placeholder.svg?height=60&width=60",
        },
        gallery: [
            "/placeholder.svg?height=300&width=400",
            "/placeholder.svg?height=300&width=400",
            "/placeholder.svg?height=300&width=400",
        ],
    },
    project4: {
        title: "FitLife Fitness App Landing",
        subtitle: "High-converting landing page for fitness app with animated interactions",
        image: "/placeholder.svg?height=400&width=600",
        tags: ["HTML/CSS", "JavaScript", "GSAP", "Responsive"],
        liveUrl: "https://fitlife-demo.com",
        codeUrl: "https://github.com/alexjohnson/fitlife",
        description:
            "A high-converting landing page for FitLife fitness app, featuring smooth animations, interactive elements, and optimized conversion funnels. Built with vanilla JavaScript and GSAP for maximum performance.",
        challenge:
            "FitLife needed a landing page that would effectively communicate their app's value proposition and convert visitors into app downloads. The page needed to be fast, engaging, and optimized for mobile users.",
        solution:
            "I created a dynamic, animated landing page that tells the FitLife story through engaging visuals and smooth interactions. The page features optimized conversion funnels, social proof elements, and a mobile-first design approach.",
        features: [
            {
                title: "Smooth Animations",
                description: "GSAP-powered animations that enhance user engagement without sacrificing performance.",
            },
            {
                title: "Conversion Optimization",
                description: "Strategically placed CTAs and optimized user flow to maximize app downloads.",
            },
            {
                title: "Mobile-First Design",
                description: "Responsive design optimized for mobile users who represent the primary target audience.",
            },
            {
                title: "Performance Optimized",
                description: "Fast loading times and optimized assets for the best user experience.",
            },
        ],
        metrics: [
            { value: "85%", label: "Conversion Rate" },
            { value: "2.1s", label: "Load Time" },
            { value: "92%", label: "Mobile Score" },
            { value: "300%", label: "Download Increase" },
        ],
        testimonial: {
            text: "The landing page Alex created exceeded our expectations. We saw a 300% increase in app downloads within the first month of launch.",
            author: "Jennifer Kim",
            position: "Marketing Director, FitLife",
            image: "/placeholder.svg?height=60&width=60",
        },
        gallery: [
            "/placeholder.svg?height=300&width=400",
            "/placeholder.svg?height=300&width=400",
            "/placeholder.svg?height=300&width=400",
        ],
    },
    project5: {
        title: "DataViz Analytics Dashboard",
        subtitle: "Interactive data visualization dashboard with real-time charts and reports",
        image: "/placeholder.svg?height=400&width=600",
        tags: ["React", "D3.js", "Python", "FastAPI"],
        liveUrl: "https://dataviz-demo.com",
        codeUrl: "https://github.com/alexjohnson/dataviz",
        description:
            "A comprehensive analytics dashboard for data visualization and business intelligence. Features interactive charts, real-time data updates, and customizable reporting tools built with React and D3.js.",
        challenge:
            "The client needed a way to visualize complex business data in an intuitive, interactive format. Their existing reporting tools were static and didn't provide the insights needed for data-driven decision making.",
        solution:
            "I developed DataViz, an interactive dashboard that transforms raw data into meaningful visualizations. The platform features real-time data processing, customizable charts, and automated reporting capabilities.",
        features: [
            {
                title: "Interactive Charts",
                description: "Dynamic, interactive visualizations built with D3.js for deep data exploration.",
            },
            {
                title: "Real-time Updates",
                description: "Live data streaming and automatic chart updates for current business insights.",
            },
            {
                title: "Custom Reports",
                description: "Automated report generation with customizable templates and scheduling.",
            },
            {
                title: "Data Integration",
                description: "Seamless integration with multiple data sources and APIs.",
            },
        ],
        metrics: [
            { value: "70%", label: "Faster Insights" },
            { value: "50%", label: "Time Saved" },
            { value: "15+", label: "Data Sources" },
            { value: "99.5%", label: "Accuracy" },
        ],
        testimonial: {
            text: "DataViz has transformed how we analyze our business data. The interactive dashboards provide insights we never had access to before.",
            author: "David Thompson",
            position: "Data Director, Analytics Pro",
            image: "/placeholder.svg?height=60&width=60",
        },
        gallery: [
            "/placeholder.svg?height=300&width=400",
            "/placeholder.svg?height=300&width=400",
            "/placeholder.svg?height=300&width=400",
        ],
    },
    project6: {
        title: "Artisan Marketplace",
        subtitle: "Multi-vendor marketplace for handmade crafts with seller dashboard",
        image: "/placeholder.svg?height=400&width=600",
        tags: ["Next.js", "Prisma", "PayPal", "Vercel"],
        liveUrl: "https://artisan-demo.com",
        codeUrl: "https://github.com/alexjohnson/artisan",
        description:
            "A comprehensive marketplace platform connecting artisan creators with customers worldwide. Features multi-vendor support, integrated payments, and powerful seller tools for managing products and orders.",
        challenge:
            "Local artisans needed a platform to sell their handmade products online but existing marketplaces took high commissions and provided limited customization options for sellers.",
        solution:
            "I built Artisan Marketplace, a custom multi-vendor platform that gives artisans full control over their storefronts while providing customers with a curated shopping experience. The platform features low transaction fees and powerful seller tools.",
        features: [
            {
                title: "Multi-vendor Support",
                description: "Individual seller storefronts with customizable branding and product management.",
            },
            {
                title: "Integrated Payments",
                description: "Secure payment processing with automatic seller payouts and commission handling.",
            },
            {
                title: "Seller Dashboard",
                description: "Comprehensive analytics and management tools for tracking sales and inventory.",
            },
            {
                title: "Customer Reviews",
                description: "Built-in review system to build trust and help customers make informed decisions.",
            },
        ],
        metrics: [
            { value: "200+", label: "Active Sellers" },
            { value: "15k+", label: "Products Listed" },
            { value: "98%", label: "Seller Satisfaction" },
            { value: "$2M+", label: "Sales Volume" },
        ],
        testimonial: {
            text: "Alex's expertise in e-commerce development helped us launch our marketplace ahead of schedule. The platform is robust and user-friendly.",
            author: "Emily Watson",
            position: "Founder, Artisan Crafts Co.",
            image: "/placeholder.svg?height=60&width=60",
        },
        gallery: [
            "/placeholder.svg?height=300&width=400",
            "/placeholder.svg?height=300&width=400",
            "/placeholder.svg?height=300&width=400",
        ],
    },
}

// Modal functionality for portfolio case studies
function initializeModals() {
    const modalOverlay = document.getElementById("modalOverlay")
    const modal = document.getElementById("projectModal")
    const modalContent = document.getElementById("modalContent")
    const closeButton = document.querySelector(".modal-close")

    // Close modal events
    if (closeButton) {
        closeButton.addEventListener("click", closeModal)
    }

    if (modalOverlay) {
        modalOverlay.addEventListener("click", (e) => {
            if (e.target === modalOverlay) {
                closeModal()
            }
        })
    }

    // Keyboard events
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            if (modalOverlay && modalOverlay.classList.contains("active")) {
                closeModal()
            }

            // Close mobile menu
            const nav = document.querySelector(".nav")
            const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
            if (nav && nav.classList.contains("active")) {
                nav.classList.remove("active")
                mobileMenuToggle.classList.remove("active")
                mobileMenuToggle.setAttribute("aria-expanded", "false")
                document.body.style.overflow = ""
            }
        }
    })

    // Prevent modal content clicks from closing modal
    if (modal) {
        modal.addEventListener("click", (e) => {
            e.stopPropagation()
        })
    }
}

// Open modal with project data
function openModal(projectId) {
    const modalOverlay = document.getElementById("modalOverlay")
    const modalContent = document.getElementById("modalContent")

    if (!modalOverlay || !modalContent) return

    const projectData = portfolioData[projectId]
    if (!projectData) return

    // Generate modal content
    modalContent.innerHTML = generateModalContent(projectData)

    // Show modal
    modalOverlay.classList.add("active")
    document.body.classList.add("modal-open")

    // Focus management for accessibility
    const firstFocusable = modalContent.querySelector("button, a, input, [tabindex]")
    if (firstFocusable) {
        firstFocusable.focus()
    }

    // Initialize gallery if present
    initializeModalGallery()
}

// Close modal
function closeModal() {
    const modalOverlay = document.getElementById("modalOverlay")

    if (modalOverlay) {
        modalOverlay.classList.remove("active")
        document.body.classList.remove("modal-open")
    }
}

// Generate modal content HTML
function generateModalContent(project) {
    return `
        <div class="project-hero">
            <img src="${project.image}" alt="${project.title}" loading="lazy">
            <h1 class="project-title">${project.title}</h1>
            <p class="project-subtitle">${project.subtitle}</p>
            <div class="project-tags">
                ${project.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
            </div>
            <div class="project-links">
                <a href="${project.liveUrl}" class="btn btn-primary" target="_blank" rel="noopener">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                        <polyline points="15,3 21,3 21,9"/>
                        <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                    View Live Site
                </a>
                <a href="${project.codeUrl}" class="btn btn-secondary" target="_blank" rel="noopener">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="16 18 22 12 16 6"/>
                        <polyline points="8 6 2 12 8 18"/>
                    </svg>
                    View Code
                </a>
            </div>
        </div>
        
        <div class="project-section">
            <h3>Project Overview</h3>
            <p>${project.description}</p>
        </div>
        
        <div class="project-section">
            <h3>The Challenge</h3>
            <p>${project.challenge}</p>
        </div>
        
        <div class="project-section">
            <h3>The Solution</h3>
            <p>${project.solution}</p>
        </div>
        
        <div class="project-section">
            <h3>Key Features</h3>
            <div class="project-features">
                ${project.features
            .map(
                (feature) => `
                    <div class="feature-item">
                        <h4>${feature.title}</h4>
                        <p>${feature.description}</p>
                    </div>
                `,
            )
            .join("")}
            </div>
        </div>
        
        <div class="project-section">
            <h3>Results & Metrics</h3>
            <div class="project-metrics">
                ${project.metrics
            .map(
                (metric) => `
                    <div class="metric">
                        <span class="metric-value">${metric.value}</span>
                        <span class="metric-label">${metric.label}</span>
                    </div>
                `,
            )
            .join("")}
            </div>
        </div>
        
        ${project.gallery
            ? `
            <div class="project-section">
                <h3>Project Gallery</h3>
                <div class="project-gallery" id="projectGallery">
                    ${project.gallery
                .map(
                    (image, index) => `
                        <div class="gallery-item" data-index="${index}">
                            <img src="${image}" alt="${project.title} - Image ${index + 1}" loading="lazy">
                        </div>
                    `,
                )
                .join("")}
                </div>
            </div>
        `
            : ""
        }
        
        ${project.testimonial
            ? `
            <div class="project-section">
                <h3>Client Testimonial</h3>
                <div class="testimonial-quote-modal">
                    <p>"${project.testimonial.text}"</p>
                    <div class="testimonial-author-modal">
                        <img src="${project.testimonial.image}" alt="${project.testimonial.author}">
                        <div class="author-info">
                            <h5>${project.testimonial.author}</h5>
                            <p>${project.testimonial.position}</p>
                        </div>
                    </div>
                </div>
            </div>
        `
            : ""
        }
    `
}

// Initialize modal gallery functionality
function initializeModalGallery() {
    const galleryItems = document.querySelectorAll(".gallery-item")

    galleryItems.forEach((item) => {
        item.addEventListener("click", function () {
            const index = this.getAttribute("data-index")
            openGalleryLightbox(index)
        })
    })
}

// Gallery lightbox functionality
function openGalleryLightbox(startIndex) {
    const galleryItems = document.querySelectorAll(".gallery-item img")
    const images = Array.from(galleryItems).map((img) => img.src)

    if (images.length === 0) return

    // Create lightbox overlay
    const lightbox = document.createElement("div")
    lightbox.className = "gallery-lightbox"
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <button class="lightbox-close" aria-label="Close gallery">&times;</button>
            <button class="lightbox-prev" aria-label="Previous image">‹</button>
            <img class="lightbox-image" src="${images[startIndex]}" alt="Gallery image">
            <button class="lightbox-next" aria-label="Next image">›</button>
            <div class="lightbox-counter">
                <span class="current-image">${Number.parseInt(startIndex) + 1}</span> / 
                <span class="total-images">${images.length}</span>
            </div>
        </div>
    `

    document.body.appendChild(lightbox)
    document.body.classList.add("lightbox-open")

    let currentIndex = Number.parseInt(startIndex)

    // Lightbox controls
    const closeBtn = lightbox.querySelector(".lightbox-close")
    const prevBtn = lightbox.querySelector(".lightbox-prev")
    const nextBtn = lightbox.querySelector(".lightbox-next")
    const image = lightbox.querySelector(".lightbox-image")
    const counter = lightbox.querySelector(".current-image")

    // Close lightbox
    function closeLightbox() {
        document.body.removeChild(lightbox)
        document.body.classList.remove("lightbox-open")
    }

    // Navigate images
    function showImage(index) {
        if (index < 0) index = images.length - 1
        if (index >= images.length) index = 0

        currentIndex = index
        image.src = images[index]
        counter.textContent = index + 1
    }

    // Event listeners
    closeBtn.addEventListener("click", closeLightbox)
    prevBtn.addEventListener("click", () => showImage(currentIndex - 1))
    nextBtn.addEventListener("click", () => showImage(currentIndex + 1))

    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            closeLightbox()
        }
    })

    // Keyboard navigation
    function handleKeydown(e) {
        switch (e.key) {
            case "Escape":
                closeLightbox()
                break
            case "ArrowLeft":
                showImage(currentIndex - 1)
                break
            case "ArrowRight":
                showImage(currentIndex + 1)
                break
        }
    }

    document.addEventListener("keydown", handleKeydown)

    // Cleanup on close
    const originalClose = closeLightbox
    closeLightbox = () => {
        document.removeEventListener("keydown", handleKeydown)
        originalClose()
    }
}

// Contact form functionality
function initializeContactForm() {
    const form = document.getElementById("contactForm")
    if (!form) return

    form.addEventListener("submit", handleFormSubmission)

    // Real-time validation
    const inputs = form.querySelectorAll("input, textarea, select")
    inputs.forEach((input) => {
        input.addEventListener("blur", () => validateField(input))
        input.addEventListener("input", () => clearFieldError(input))
    })
}

// Handle form submission
async function handleFormSubmission(e) {
    e.preventDefault()

    const form = e.target
    const submitButton = form.querySelector('button[type="submit"]')
    const formData = new FormData(form)

    // Validate all fields
    if (!validateForm(form)) {
        return
    }

    // Show loading state
    setSubmitButtonState(submitButton, "loading")

    try {
        // Simulate form submission (replace with actual endpoint)
        await simulateFormSubmission(formData)

        // Show success message
        showFormMessage(
            "success",
            "Thank you! Your message has been sent successfully. I'll get back to you within 24 hours.",
        )

        // Reset form
        form.reset()
    } catch (error) {
        // Show error message
        showFormMessage("error", "Sorry, there was an error sending your message. Please try again or contact me directly.")
        console.error("Form submission error:", error)
    } finally {
        // Reset button state
        setSubmitButtonState(submitButton, "normal")
    }
}

// Validate entire form
function validateForm(form) {
    const requiredFields = form.querySelectorAll("[required]")
    let isValid = true

    requiredFields.forEach((field) => {
        if (!validateField(field)) {
            isValid = false
        }
    })

    return isValid
}

// Validate individual field
function validateField(field) {
    const value = field.value.trim()
    const fieldName = field.name
    let isValid = true
    let errorMessage = ""

    // Required field validation
    if (field.hasAttribute("required") && !value) {
        errorMessage = `${getFieldLabel(field)} is required.`
        isValid = false
    }

    // Email validation
    else if (fieldName === "email" && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) {
            errorMessage = "Please enter a valid email address."
            isValid = false
        }
    }

    // Name validation
    else if (fieldName === "name" && value) {
        if (value.length < 2) {
            errorMessage = "Name must be at least 2 characters long."
            isValid = false
        }
    }

    // Message validation
    else if (fieldName === "message" && value) {
        if (value.length < 10) {
            errorMessage = "Message must be at least 10 characters long."
            isValid = false
        }
    }

    // Show/hide error message
    showFieldError(field, errorMessage)

    return isValid
}

// Get field label for error messages
function getFieldLabel(field) {
    const label = document.querySelector(`label[for="${field.id}"]`)
    return label ? label.textContent.replace("*", "").trim() : field.name
}

// Show field error message
function showFieldError(field, message) {
    const errorElement = document.getElementById(`${field.name}-error`)

    if (errorElement) {
        errorElement.textContent = message
        errorElement.classList.toggle("visible", !!message)
    }

    field.classList.toggle("error", !!message)
}

// Clear field error
function clearFieldError(field) {
    const errorElement = document.getElementById(`${field.name}-error`)

    if (errorElement) {
        errorElement.textContent = ""
        errorElement.classList.remove("visible")
    }

    field.classList.remove("error")
}

// Set submit button state
function setSubmitButtonState(button, state) {
    switch (state) {
        case "loading":
            button.classList.add("loading")
            button.disabled = true
            break
        case "normal":
            button.classList.remove("loading")
            button.disabled = false
            break
    }
}

// Show form message
function showFormMessage(type, message) {
    // Remove existing messages
    const existingMessage = document.querySelector(".form-message")
    if (existingMessage) {
        existingMessage.remove()
    }

    // Create new message
    const messageElement = document.createElement("div")
    messageElement.className = `form-message form-message-${type}`
    messageElement.innerHTML = `
        <div class="message-content">
            <span class="message-icon">${type === "success" ? "✓" : "✗"}</span>
            <span class="message-text">${message}</span>
        </div>
    `

    // Insert message
    const form = document.getElementById("contactForm")
    form.parentNode.insertBefore(messageElement, form)

    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (messageElement.parentNode) {
            messageElement.remove()
        }
    }, 5000)
}

// Simulate form submission (replace with actual implementation)
async function simulateFormSubmission(formData) {
    // Convert FormData to object for logging
    const data = Object.fromEntries(formData.entries())
    console.log("Form submission data:", data)

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Simulate random success/failure for demo
    if (Math.random() > 0.1) {
        // 90% success rate
        return { success: true }
    } else {
        throw new Error("Simulated network error")
    }
}

// Testimonial carousel functionality
function initializeTestimonialCarousel() {
    const testimonials = document.querySelectorAll(".testimonial")
    const dots = document.querySelectorAll(".testimonial-dots .dot")
    const prevButton = document.querySelector(".testimonial-prev")
    const nextButton = document.querySelector(".testimonial-next")

    if (testimonials.length === 0) return

    let currentIndex = 0
    let autoplayInterval

    // Show specific testimonial
    function showTestimonial(index) {
        // Hide all testimonials
        testimonials.forEach((testimonial) => {
            testimonial.classList.remove("active")
        })

        // Update dots
        dots.forEach((dot) => {
            dot.classList.remove("active")
        })

        // Show current testimonial
        if (testimonials[index]) {
            testimonials[index].classList.add("active")
        }

        if (dots[index]) {
            dots[index].classList.add("active")
        }

        currentIndex = index
    }

    // Next testimonial
    function nextTestimonial() {
        const nextIndex = (currentIndex + 1) % testimonials.length
        showTestimonial(nextIndex)
    }

    // Previous testimonial
    function prevTestimonial() {
        const prevIndex = (currentIndex - 1 + testimonials.length) % testimonials.length
        showTestimonial(prevIndex)
    }

    // Start autoplay
    function startAutoplay() {
        autoplayInterval = setInterval(nextTestimonial, 5000)
    }

    // Stop autoplay
    function stopAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval)
        }
    }

    // Event listeners
    if (nextButton) {
        nextButton.addEventListener("click", () => {
            nextTestimonial()
            stopAutoplay()
            startAutoplay()
        })
    }

    if (prevButton) {
        prevButton.addEventListener("click", () => {
            prevTestimonial()
            stopAutoplay()
            startAutoplay()
        })
    }

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            showTestimonial(index)
            stopAutoplay()
            startAutoplay()
        })
    })

    // Pause autoplay on hover
    const carousel = document.querySelector(".testimonials-carousel")
    if (carousel) {
        carousel.addEventListener("mouseenter", stopAutoplay)
        carousel.addEventListener("mouseleave", startAutoplay)
    }

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
        if (e.target.closest(".testimonials-carousel")) {
            if (e.key === "ArrowLeft") {
                prevTestimonial()
                stopAutoplay()
                startAutoplay()
            } else if (e.key === "ArrowRight") {
                nextTestimonial()
                stopAutoplay()
                startAutoplay()
            }
        }
    })

    // Initialize
    showTestimonial(0)
    startAutoplay()

    // Pause autoplay when page is not visible
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            stopAutoplay()
        } else {
            startAutoplay()
        }
    })
}

// Utility functions
function debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout)
            func(...args)
        }
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
    }
}

function throttle(func, limit) {
    let inThrottle
    return function () {
        const args = arguments

        if (!inThrottle) {
            func.apply(this, args)
            inThrottle = true
            setTimeout(() => (inThrottle = false), limit)
        }
    }
}

// Performance optimization: Lazy load images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]')

    if ("IntersectionObserver" in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const img = entry.target
                    img.src = img.dataset.src || img.src
                    img.classList.remove("lazy")
                    imageObserver.unobserve(img)
                }
            })
        })

        images.forEach((img) => imageObserver.observe(img))
    }
}

// Initialize lazy loading
document.addEventListener("DOMContentLoaded", initializeLazyLoading)

// Error handling for images
document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll("img")

    images.forEach((img) => {
        img.addEventListener("error", function () {
            this.src = "/placeholder.svg?height=300&width=400"
            this.alt = "Image not available"
        })
    })
})

// Preload critical resources
function preloadCriticalResources() {
    const criticalImages = ["/images/hero/profile.jpg", "/images/portfolio/project1.jpg"]

    criticalImages.forEach((src) => {
        const link = document.createElement("link")
        link.rel = "preload"
        link.as = "image"
        link.href = src
        document.head.appendChild(link)
    })
}

// Initialize preloading
document.addEventListener("DOMContentLoaded", preloadCriticalResources)

// Auto-save theme preference on page unload
window.addEventListener("beforeunload", () => {
    const currentTheme = getCurrentTheme()
    localStorage.setItem("theme", currentTheme)
})

// Make openModal globally available
window.openModal = openModal

// Export portfolio data for use in other modules
window.portfolioData = portfolioData

// Export theme functions for use in other modules
window.themeManager = {
    setTheme,
    getCurrentTheme,
}
