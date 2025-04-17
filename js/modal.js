// Project Modal Functionality
export function initModal() {
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('projectModal');
    const modalClose = document.querySelector('.modal-close');
    const modalBody = document.querySelector('.modal-body');
    const modalPrev = document.querySelector('.modal-prev');
    const modalNext = document.querySelector('.modal-next');

    let currentProjectIndex = 0;

    // Project data (in a real project, this would come from a database or API)
    const projectsData = [
        {
            id: 'project1',
            title: 'E-commerce Platform',
            client: 'Fashion Retailer',
            date: 'January 2024',
            description: 'A full-featured online store with payment processing and inventory management.',
            challenge: 'The client needed a scalable e-commerce solution that could handle their growing product catalog while providing a seamless shopping experience for customers.',
            solution: 'I developed a custom e-commerce platform with a focus on performance and user experience. The solution includes real-time inventory tracking, secure payment processing, and a responsive design that works across all devices.',
            technologies: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Express', 'MongoDB', 'Stripe API'],
            images: [
                'images/project1.jpg',
                'images/project1-detail1.jpg',
                'images/project1-detail2.jpg'
            ],
            liveLink: 'https://example.com/project1',
            githubLink: 'https://github.com/johndoe/project1'
        },
        {
            id: 'project2',
            title: 'Photography Portfolio',
            client: 'Professional Photographer',
            date: 'March 2024',
            description: 'A visually stunning portfolio for a professional photographer with gallery features.',
            challenge: 'The photographer needed a portfolio that would showcase their work in a visually striking way while maintaining fast load times for high-resolution images.',
            solution: 'I created a minimalist design that puts the focus on the photography, with lazy loading and image optimization to ensure fast performance even with large image files.',
            technologies: ['HTML', 'CSS', 'JavaScript', 'Lightbox.js'],
            images: [
                'images/project2.jpg',
                'images/project2-detail1.jpg',
                'images/project2-detail2.jpg'
            ],
            liveLink: 'https://example.com/project2',
            githubLink: 'https://github.com/johndoe/project2'
        },
        {
            id: 'project3',
            title: 'Analytics Dashboard',
            client: 'Marketing Agency',
            date: 'May 2024',
            description: 'Interactive dashboard with real-time data visualization and reporting tools.',
            challenge: 'The agency needed a way to visualize complex marketing data for their clients in an intuitive and accessible format.',
            solution: 'I built a custom dashboard with interactive charts and filters that allow users to explore data and generate insights. The dashboard updates in real-time and includes export functionality for reports.',
            technologies: ['HTML', 'CSS', 'JavaScript', 'Chart.js', 'Firebase'],
            images: [
                'images/project3.jpg',
                'images/project3-detail1.jpg',
                'images/project3-detail2.jpg'
            ],
            liveLink: 'https://example.com/project3',
            githubLink: 'https://github.com/johndoe/project3'
        },
        {
            id: 'project4',
            title: 'Fitness Tracker App',
            client: 'Health & Wellness Startup',
            date: 'July 2024',
            description: 'Mobile-first web application for tracking workouts and nutrition goals.',
            challenge: 'The startup wanted to create an engaging fitness tracking experience that would help users stay motivated and consistent with their health goals.',
            solution: 'I developed a progressive web app with offline capabilities, customizable workout plans, and achievement badges to gamify the fitness experience.',
            technologies: ['HTML', 'CSS', 'JavaScript', 'React', 'IndexedDB', 'Web Push API'],
            images: [
                'images/project4.jpg',
                'images/project4-detail1.jpg',
                'images/project4-detail2.jpg'
            ],
            liveLink: 'https://example.com/project4',
            githubLink: 'https://github.com/johndoe/project4'
        }
    ];

    // Open modal when clicking on a project card
    projectCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project');
            const project = projectsData.find(p => p.id === projectId);

            if (project) {
                currentProjectIndex = projectsData.indexOf(project);
                renderProjectDetails(project);
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
            }
        });
    });

    // Close modal
    modalClose.addEventListener('click', closeModal);

    // Close modal when clicking outside content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Navigate to previous project
    modalPrev.addEventListener('click', () => {
        currentProjectIndex = (currentProjectIndex - 1 + projectsData.length) % projectsData.length;
        renderProjectDetails(projectsData[currentProjectIndex]);
    });

    // Navigate to next project
    modalNext.addEventListener('click', () => {
        currentProjectIndex = (currentProjectIndex + 1) % projectsData.length;
        renderProjectDetails(projectsData[currentProjectIndex]);
    });

    // Render project details in modal
    function renderProjectDetails(project) {
        const imagesHtml = project.images.map(img =>
            `<div class="project-detail-image">
          <img src="${img}" alt="${project.title}" loading="lazy">
        </div>`
        ).join('');

        const technologiesHtml = project.technologies.map(tech =>
            `<span class="tech-tag">${tech}</span>`
        ).join('');

        modalBody.innerHTML = `
        <div class="project-detail">
          <h2 class="project-detail-title">${project.title}</h2>
          <div class="project-detail-meta">
            <span><strong>Client:</strong> ${project.client}</span>
            <span><strong>Date:</strong> ${project.date}</span>
          </div>
          
          <div class="project-detail-images">
            ${imagesHtml}
          </div>
          
          <div class="project-detail-content">
            <div class="project-detail-section">
              <h3>Project Overview</h3>
              <p>${project.description}</p>
            </div>
            
            <div class="project-detail-section">
              <h3>The Challenge</h3>
              <p>${project.challenge}</p>
            </div>
            
            <div class="project-detail-section">
              <h3>The Solution</h3>
              <p>${project.solution}</p>
            </div>
            
            <div class="project-detail-section">
              <h3>Technologies Used</h3>
              <div class="project-tech">
                ${technologiesHtml}
              </div>
            </div>
            
            <div class="project-detail-links">
              <a href="${project.liveLink}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">View Live Site</a>
              <a href="${project.githubLink}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">View Code</a>
            </div>
          </div>
        </div>
      `;
    }

    // Close modal function
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
}
