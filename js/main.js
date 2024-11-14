// Select necessary elements
const menuOpenButton = document.querySelector('.menu-open');
const menuCloseButton = document.querySelector('.menu-close');
const navMenu = document.querySelector('nav ul');

// Show menu on "menu-open" click
menuOpenButton.addEventListener('click', () => {
  navMenu.style.display = 'flex'; // Show the nav menu
  menuOpenButton.style.display = 'none'; // Hide the open button
  menuCloseButton.style.display = 'block'; // Show the close button
});

// Hide menu on "menu-close" click
menuCloseButton.addEventListener('click', () => {
  navMenu.style.display = 'none'; // Hide the nav menu
  menuOpenButton.style.display = 'block'; // Show the open button
  menuCloseButton.style.display = 'none'; // Hide the close button
});
