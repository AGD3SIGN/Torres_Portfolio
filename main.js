document.addEventListener("DOMContentLoaded", () => {
    // Mobile Menu Toggle
    const mobileMenu = document.getElementById("mobile-menu")
    const navMenu = document.querySelector(".nav-menu")

    mobileMenu.addEventListener("click", () => {
        mobileMenu.classList.toggle("active")
        navMenu.classList.toggle("active")
    })

    // Close mobile menu when clicking on a nav link
    document.querySelectorAll(".nav-link").forEach((link) => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("active")
            navMenu.classList.remove("active")
        })
    })

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault()

            const targetId = this.getAttribute("href")
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

    // Scroll animations
    const animateElements = document.querySelectorAll(".fade-in, .slide-in-left, .slide-in-right")

    function checkScroll() {
        animateElements.forEach((element) => {
            const elementTop = element.getBoundingClientRect().top
            const windowHeight = window.innerHeight

            if (elementTop < windowHeight - 100) {
                element.classList.add("active")
            }
        })
    }

    // Initial check on page load
    checkScroll()

    // Check on scroll
    window.addEventListener("scroll", checkScroll)

    // Project Modal
    const modal = document.getElementById("project-modal")
    const closeModal = document.querySelector(".close-modal")
    const modalBody = document.querySelector(".modal-body")
    const projectButtons = document.querySelectorAll(".view-project")

    // Project data (in a real project, this might come from a database or API)
    const projectData = [
        {
            id: 1,
            title: "E-commerce Website",
            category: "Web Development",
            client: "Fashion Retailer",
            date: "January 2025",
            technologies: "HTML, CSS, JavaScript, React, Node.js",
            image: "/placeholder.svg?height=600&width=800",
            description:
                "A fully responsive e-commerce platform with user authentication, product filtering, shopping cart, and payment integration. The site features a clean, modern design with intuitive navigation and fast load times.",
            challenge:
                "The main challenge was creating a seamless shopping experience across all devices while maintaining fast performance with a large product database.",
            solution:
                "I implemented lazy loading for product images, optimized database queries, and used React for a smooth single-page application experience. The responsive design was thoroughly tested across multiple devices and browsers.",
        },
        {
            id: 2,
            title: "Portfolio Website",
            category: "Web Design",
            client: "Photographer",
            date: "March 2025",
            technologies: "HTML, CSS, JavaScript, GSAP",
            image: "/placeholder.svg?height=600&width=800",
            description:
                "A visually stunning portfolio website for a professional photographer, featuring image galleries, testimonials, and a contact form. The design emphasizes the photographer's work with large, high-quality image displays.",
            challenge:
                "Balancing image quality with performance was the key challenge, along with creating smooth transitions between gallery items.",
            solution:
                "I implemented image optimization techniques and lazy loading, along with GSAP animations for smooth transitions. The gallery was built with both touch and mouse interactions in mind.",
        },
        {
            id: 3,
            title: "Mobile App",
            category: "UI/UX Design",
            client: "Fitness Startup",
            date: "May 2025",
            technologies: "Figma, Adobe XD, Sketch",
            image: "/placeholder.svg?height=600&width=800",
            description:
                "A comprehensive UI/UX design for a fitness tracking mobile application. The design includes user flows, wireframes, and high-fidelity mockups for both iOS and Android platforms.",
            challenge:
                "Creating an intuitive interface for complex fitness tracking features while maintaining a clean, motivating design.",
            solution:
                "I conducted extensive user research and testing to refine the interface. The final design uses clear visual hierarchies, consistent navigation patterns, and motivational elements to encourage user engagement.",
        },
        {
            id: 4,
            title: "Corporate Website",
            category: "Web Development",
            client: "Financial Services Company",
            date: "July 2025",
            technologies: "HTML, CSS, JavaScript, WordPress",
            image: "/placeholder.svg?height=600&width=800",
            description:
                "A professional corporate website for a financial services company, featuring service information, team profiles, blog, and contact information. The site has a sophisticated design that conveys trust and expertise.",
            challenge:
                "Creating a content management system that would be easy for the client to update while maintaining the design integrity.",
            solution:
                "I developed a custom WordPress theme with tailored content blocks and a user-friendly admin interface. The site was optimized for SEO and includes analytics integration for performance tracking.",
        },
    ]

    // Open modal with project details
    projectButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const projectItem = this.closest(".work-item")
            const projectId = Number.parseInt(projectItem.dataset.id)
            const project = projectData.find((p) => p.id === projectId)

            if (project) {
                // Create modal content
                modalBody.innerHTML = `
                      <div class="project-details">
                          <div class="project-header">
                              <h2>${project.title}</h2>
                              <p>${project.category}</p>
                          </div>
                          <div class="project-image">
                              <img src="${project.image}" alt="${project.title}">
                          </div>
                          <div class="project-info">
                              <div class="project-info-item">
                                  <h4>Client</h4>
                                  <p>${project.client}</p>
                              </div>
                              <div class="project-info-item">
                                  <h4>Date</h4>
                                  <p>${project.date}</p>
                              </div>
                              <div class="project-info-item">
                                  <h4>Technologies</h4>
                                  <p>${project.technologies}</p>
                              </div>
                          </div>
                          <div class="project-description">
                              <h3>Project Overview</h3>
                              <p>${project.description}</p>
                              <h3>Challenge</h3>
                              <p>${project.challenge}</p>
                              <h3>Solution</h3>
                              <p>${project.solution}</p>
                          </div>
                          <a href="#" class="btn btn-primary">Visit Project</a>
                      </div>
                  `

                // Show modal
                modal.style.display = "block"
                document.body.style.overflow = "hidden" // Prevent scrolling
            }
        })
    })

    // Close modal
    closeModal.addEventListener("click", () => {
        modal.style.display = "none"
        document.body.style.overflow = "auto" // Enable scrolling
    })

    // Close modal when clicking outside
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none"
            document.body.style.overflow = "auto" // Enable scrolling
        }
    })

    // Form submission
    const contactForm = document.querySelector(".contact-form")

    contactForm.addEventListener("submit", (e) => {
        e.preventDefault()

        // In a real project, you would send the form data to a server
        // For this demo, we'll just show a success message

        const formData = new FormData(contactForm)
        const formValues = Object.fromEntries(formData.entries())

        // Simple validation
        let isValid = true
        for (const key in formValues) {
            if (!formValues[key]) {
                isValid = false
                break
            }
        }

        if (isValid) {
            // Show success message
            contactForm.innerHTML = `
                  <div class="success-message">
                      <h3>Message Sent!</h3>
                      <p>Thank you for contacting me. I'll get back to you as soon as possible.</p>
                  </div>
              `
        }
    })
})
