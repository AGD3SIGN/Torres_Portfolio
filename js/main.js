const menuBtn = document.getElementById('menuBtn');
const menuPanel = document.getElementById('menuPanel');
const closeBtn = document.getElementById('closeBtn');
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

// Dark Mode Functionality (using in-memory storage)
let darkModeEnabled = false;

function initDarkMode() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (prefersDark) {
        enableDarkMode();
    }
}

function enableDarkMode() {
    darkModeEnabled = true;
    body.classList.add('dark-mode');
    darkModeToggle.classList.add('active');
    updateToggleIcon();
}

function disableDarkMode() {
    darkModeEnabled = false;
    body.classList.remove('dark-mode');
    darkModeToggle.classList.remove('active');
    updateToggleIcon();
}

function toggleDarkMode() {
    if (darkModeEnabled) {
        disableDarkMode();
    } else {
        enableDarkMode();
    }
}

function updateToggleIcon() {
    const toggleIcon = document.querySelector('.toggle-label .toggle-icon i');
    const toggleText = document.querySelector('.toggle-label span:not(.toggle-icon)');

    if (darkModeEnabled) {
        // Dark mode is ON - show sun icon and "Light Mode" text
        toggleIcon.className = 'ri-moon-fill';
        toggleText.textContent = 'Dark Mode';
    } else {
        // Dark mode is OFF - show moon icon and "Dark Mode" text
        toggleIcon.className = 'ri-sun-fill';
        toggleText.textContent = 'Light Mode';
    }
}

// Menu Functionality
function openMenu() {
    menuPanel.classList.add('active');
    menuBtn.classList.add('active');
}

function closeMenu() {
    menuPanel.classList.remove('active');
    menuBtn.classList.remove('active');
}

// Event Listeners
menuBtn.addEventListener('click', openMenu);
closeBtn.addEventListener('click', closeMenu);
darkModeToggle.addEventListener('click', toggleDarkMode);

// Initialize dark mode on page load
initDarkMode();

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuBtn.contains(e.target) && !menuPanel.contains(e.target)) {
        closeMenu();
    }
});

// Close menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeMenu();
    }
});

// Add smooth scroll for menu links
document.querySelectorAll('.menu-nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        closeMenu();
        // Add your navigation logic here
        console.log('Navigating to:', link.getAttribute('href'));
    });
});

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    // Only auto-switch if user hasn't manually toggled
    if (e.matches && !darkModeEnabled) {
        enableDarkMode();
    } else if (!e.matches && darkModeEnabled) {
        disableDarkMode();
    }
});