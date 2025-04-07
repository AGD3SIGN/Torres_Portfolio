document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    const menuIcon = document.getElementById('menu-open');
    const closeIcon = document.getElementById('menu-close');

    menuToggle.addEventListener('click', function () {
        mainNav.classList.toggle('active');

        // Toggle between menu and close icons
        if (menuIcon.style.display !== 'none') {
            menuIcon.style.display = 'none';
            closeIcon.style.display = 'block';
        } else {
            menuIcon.style.display = 'block';
            closeIcon.style.display = 'none';
        }
    });
});