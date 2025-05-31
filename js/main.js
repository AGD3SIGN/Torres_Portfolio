// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Loading Animation
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 1000);
});

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const sunIcon = document.getElementById('sunIcon');
const moonIcon = document.getElementById('moonIcon');
const html = document.documentElement;

// Function to update theme icons
function updateThemeIcons(theme) {
    if (theme === 'light') {
        sunIcon.style.opacity = '1';
        sunIcon.style.transform = 'rotate(0deg) scale(1)';
        moonIcon.style.opacity = '0';
        moonIcon.style.transform = 'rotate(180deg) scale(0.5)';
    } else {
        sunIcon.style.opacity = '0';
        sunIcon.style.transform = 'rotate(-180deg) scale(0.5)';
        moonIcon.style.opacity = '1';
        moonIcon.style.transform = 'rotate(0deg) scale(1)';
    }
}

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    // Add a small bounce animation to the button
    themeToggle.style.transform = 'scale(0.9)';
    setTimeout(() => {
        themeToggle.style.transform = 'scale(1)';
    }, 150);

    html.setAttribute('data-theme', newTheme);
    updateThemeIcons(newTheme);

    localStorage.setItem('theme', newTheme);
});

// Load saved theme and initialize icons
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
updateThemeIcons(savedTheme);

// Initialize theme icons on page load
window.addEventListener('load', () => {
    updateThemeIcons(savedTheme);
});

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.mobile-menu .nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll Progress Bar
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    document.getElementById('progressBar').style.width = scrollPercent + '%';
});

// Scroll to Top Button
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Sticky Navigation
const navbar = document.getElementById('navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;

    if (scrollTop > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Animated Counters
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// Trigger counters when in view
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('[data-count]');
            counters.forEach(counter => {
                animateCounter(counter);
            });
            counterObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.stats, .hero').forEach(section => {
    counterObserver.observe(section);
});

// Skill Bars Animation
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                setTimeout(() => {
                    bar.style.width = width + '%';
                }, 200);
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    skillObserver.observe(skillsSection);
}

// Project Modal Data with Detailed Case Studies
const projectData = {
    project1: {
        title: 'ShopFlow E-Commerce Platform',
        subtitle: 'Full-Stack E-Commerce Solution',
        overview: 'ShopFlow is a comprehensive e-commerce platform built for a mid-sized retail company looking to expand their online presence. The platform handles everything from product catalog management to order fulfillment, providing both customers and administrators with intuitive, powerful tools.',
        challenge: 'The client needed a scalable e-commerce solution that could handle high traffic volumes during peak seasons, integrate with their existing inventory management system, and provide real-time analytics. The main challenges included ensuring fast page load times, implementing secure payment processing, and creating an admin dashboard that could handle complex inventory operations.',
        solution: 'I developed a modern, responsive e-commerce platform using React for the frontend and Node.js with Express for the backend. The solution includes a microservices architecture for scalability, Redis for caching, and MongoDB for flexible data storage. Key features include real-time inventory updates, advanced search with Elasticsearch, and comprehensive analytics dashboard.',
        features: [
            'Responsive design optimized for all devices',
            'Advanced product search and filtering system',
            'Real-time inventory management with low-stock alerts',
            'Secure payment processing with Stripe integration',
            'Customer review and rating system',
            'Admin dashboard with sales analytics and reporting',
            'Email notifications for order updates',
            'Multi-language and currency support',
            'SEO-optimized product pages',
            'Abandoned cart recovery system'
        ],
        technologies: [
            'React', 'Node.js', 'Express', 'MongoDB', 'Redis', 'Stripe API',
            'Elasticsearch', 'JWT Authentication', 'Socket.io', 'AWS S3',
            'Cloudinary', 'SendGrid', 'Jest', 'Cypress'
        ],
        metrics: [
            { number: '300%', label: 'Increase in Online Sales' },
            { number: '45%', label: 'Faster Page Load Times' },
            { number: '25%', label: 'Reduction in Cart Abandonment' },
            { number: '99.9%', label: 'Uptime Achieved' }
        ],
        duration: '4 months',
        role: 'Full-Stack Developer & Project Lead',
        link: '#'
    },
    project2: {
        title: 'DataViz Analytics Dashboard',
        subtitle: 'Real-Time Business Intelligence Platform',
        overview: 'DataViz is a comprehensive analytics dashboard designed for a growing SaaS company that needed better insights into their user behavior, revenue metrics, and operational performance. The platform aggregates data from multiple sources and presents it through interactive, real-time visualizations.',
        challenge: 'The client was struggling with data scattered across multiple platforms (Google Analytics, Stripe, their own database, and third-party APIs). They needed a unified view of their business metrics with the ability to drill down into specific data points, create custom reports, and set up automated alerts for key performance indicators.',
        solution: 'I built a powerful analytics dashboard using Vue.js for the frontend and Python with Django for the backend. The solution includes a data pipeline that aggregates information from various APIs, processes it in real-time, and stores it in a PostgreSQL database. D3.js was used for creating interactive charts and visualizations.',
        features: [
            'Real-time data synchronization from multiple sources',
            'Interactive charts and graphs with drill-down capabilities',
            'Custom dashboard creation with drag-and-drop interface',
            'Automated report generation and scheduling',
            'Alert system for KPI thresholds',
            'Data export in multiple formats (PDF, Excel, CSV)',
            'User role management and permissions',
            'Mobile-responsive design for on-the-go access',
            'API for third-party integrations',
            'Advanced filtering and date range selection'
        ],
        technologies: [
            'Vue.js', 'Vuex', 'D3.js', 'Python', 'Django', 'PostgreSQL',
            'Redis', 'Celery', 'WebSocket', 'Chart.js', 'Pandas',
            'NumPy', 'Docker', 'Nginx', 'AWS EC2'
        ],
        metrics: [
            { number: '75%', label: 'Reduction in Report Generation Time' },
            { number: '40%', label: 'Increase in Data-Driven Decisions' },
            { number: '60%', label: 'Faster Issue Detection' },
            { number: '90%', label: 'User Satisfaction Score' }
        ],
        duration: '3 months',
        role: 'Full-Stack Developer & Data Visualization Specialist',
        link: '#'
    },
    project3: {
        title: 'FitTracker Mobile Application',
        subtitle: 'Cross-Platform Fitness & Wellness App',
        overview: 'FitTracker is a comprehensive fitness and wellness mobile application designed to help users track their workouts, monitor nutrition, and achieve their health goals. The app features social elements, personalized workout plans, and integration with popular fitness devices and platforms.',
        challenge: 'The client wanted to create a fitness app that would stand out in a crowded market by offering personalized experiences, seamless device integration, and strong community features. Key challenges included ensuring the app worked offline, syncing data across devices, implementing real-time features for social interaction, and integrating with various fitness APIs and wearable devices.',
        solution: 'I developed a cross-platform mobile application using React Native, ensuring consistent performance on both iOS and Android. The backend was built with Node.js and Firebase for real-time capabilities. The app includes offline functionality with local data storage, cloud synchronization, and integration with popular fitness platforms like Apple Health, Google Fit, and Fitbit.',
        features: [
            'Cross-platform compatibility (iOS and Android)',
            'Offline workout tracking with cloud sync',
            'Personalized workout plans based on user goals',
            'Nutrition tracking with barcode scanning',
            'Social features including challenges and leaderboards',
            'Integration with wearable devices and fitness platforms',
            'Real-time messaging and community features',
            'Progress tracking with detailed analytics',
            'Push notifications for workout reminders',
            'Biometric authentication for security'
        ],
        technologies: [
            'React Native', 'Redux', 'TypeScript', 'Node.js', 'Firebase',
            'Firestore', 'Firebase Auth', 'AsyncStorage', 'React Navigation',
            'Expo', 'Apple HealthKit', 'Google Fit API', 'Fitbit API',
            'Stripe', 'OneSignal', 'Detox'
        ],
        metrics: [
            { number: '50K+', label: 'Active Monthly Users' },
            { number: '4.8', label: 'App Store Rating' },
            { number: '85%', label: 'User Retention Rate' },
            { number: '200%', label: 'Increase in User Engagement' }
        ],
        duration: '5 months',
        role: 'Mobile App Developer & UX Designer',
        link: '#'
    }
};

// Project Modal Functions
function openModal(projectId) {
    const modal = document.getElementById('projectModal');
    const modalContent = document.getElementById('modalContent');
    const project = projectData[projectId];

    modalContent.innerHTML = `
        <div class="case-study-header">
            <h2 class="case-study-title">${project.title}</h2>
            <p class="case-study-subtitle">${project.subtitle}</p>
            <div style="display: flex; justify-content: center; gap: 2rem; margin-top: 1rem; flex-wrap: wrap;">
                <span><strong>Duration:</strong> ${project.duration}</span>
                <span><strong>Role:</strong> ${project.role}</span>
            </div>
        </div>

        <div class="case-study-section">
            <h3>Project Overview</h3>
            <p>${project.overview}</p>
        </div>

        <div class="case-study-section">
            <h3>The Challenge</h3>
            <p>${project.challenge}</p>
        </div>

        <div class="case-study-section">
            <h3>The Solution</h3>
            <p>${project.solution}</p>
        </div>

        <div class="case-study-section">
            <h3>Key Features</h3>
            <ul>
                ${project.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
        </div>

        <div class="case-study-section">
            <h3>Technology Stack</h3>
            <div class="tech-stack">
                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
        </div>

        <div class="case-study-section">
            <h3>Results & Impact</h3>
            <div class="metrics-grid">
                ${project.metrics.map(metric => `
                    <div class="metric-item">
                        <div class="metric-number">${metric.number}</div>
                        <div class="metric-label">${metric.label}</div>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="project-links">
            <a href="${project.link}" class="btn btn-primary" style="text-decoration: none;">
                <i class="ri-external-link-line"></i>
                View Live Project
            </a>
            <a href="#contact" class="btn btn-outline" style="text-decoration: none;" onclick="closeModal()">
                <i class="ri-mail-line"></i>
                Discuss Similar Project
            </a>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
document.getElementById('projectModal').addEventListener('click', (e) => {
    if (e.target.id === 'projectModal') {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Typewriter Effect
function typeWriter() {
    const text = "Professional Web Development Solutions";
    const element = document.querySelector('.typewriter');
    if (element) {
        element.style.width = '0';
        element.style.animation = 'none';

        setTimeout(() => {
            element.style.animation = 'typewriter 3s steps(40) forwards';
        }, 100);
    }
}

// Start typewriter effect when page loads
window.addEventListener('load', () => {
    setTimeout(typeWriter, 1500);
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Lazy Loading for Images
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// Add hover effects to cards
document.querySelectorAll('.project-card, .service-card, .testimonial-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-10px)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
    });
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Smooth reveal animations for elements
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Apply reveal animation to elements
document.querySelectorAll('.hero-card, .service-card, .skill-item, .project-card, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll-heavy functions
const debouncedScrollHandler = debounce(() => {
    // Additional scroll optimizations can be added here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Initialize all animations and interactions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add loading class to body for initial animations
    document.body.classList.add('loaded');

    // Initialize any additional features
    console.log('Portfolio website initialized successfully!');
});