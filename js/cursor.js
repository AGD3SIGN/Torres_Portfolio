// Custom Cursor
export function initCustomCursor() {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (!cursorDot || !cursorOutline) return;

    // Check if device has touch capability
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        cursorDot.style.display = 'none';
        cursorOutline.style.display = 'none';
        return;
    }

    // Update cursor position
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Dot follows cursor exactly
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Outline follows with slight delay for smooth effect
        cursorOutline.style.left = `${posX}px`;
        cursorOutline.style.top = `${posY}px`;
    });

    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .service-card, input, textarea');

    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorOutline.style.borderColor = 'var(--color-accent)';
            cursorDot.style.transform = 'translate(-50%, -50%) scale(0.5)';
        });

        element.addEventListener('mouseleave', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.borderColor = 'var(--color-accent)';
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });

    // Add cursor trail effect
    function createTrailElement() {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.position = 'fixed';
        trail.style.width = '5px';
        trail.style.height = '5px';
        trail.style.backgroundColor = 'var(--color-accent)';
        trail.style.borderRadius = '50%';
        trail.style.pointerEvents = 'none';
        trail.style.zIndex = '9998';
        trail.style.opacity = '0.7';
        document.body.appendChild(trail);

        setTimeout(() => {
            trail.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(trail);
            }, 300);
        }, 300);

        return trail;
    }

    let lastX = 0;
    let lastY = 0;
    let trailInterval;

    window.addEventListener('mousemove', (e) => {
        lastX = e.clientX;
        lastY = e.clientY;

        // Clear existing interval
        clearInterval(trailInterval);

        // Create trail elements at intervals
        trailInterval = setInterval(() => {
            const trail = createTrailElement();
            trail.style.left = `${lastX}px`;
            trail.style.top = `${lastY}px`;
        }, 50);
    });

    // Clear trail when mouse leaves window
    window.addEventListener('mouseout', () => {
        clearInterval(trailInterval);
    });
}