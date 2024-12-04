/* Preloader Hide/Unhide */
window.onload = function () {
  const preloader = document.querySelector(".preloader");
  preloader.classList.add("hidden");
};

/* Show/Hide Navbar */
// JavaScript for the hide/show navigation effect
const navBar = document.querySelector(".navbar");
let prevScrollPos = window.scrollY;

window.addEventListener("scroll", function () {
  let currScrollPos = window.scrollY;

  if (currScrollPos > prevScrollPos) {
    navBar.style.transform = `translateY(-105%)`;
  } else {
    navBar.style.transform = `translateY(0%)`;
  }

  prevScrollPos = currScrollPos;
});

/* Show menu */
// Get the menu button and the menu itself
const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');

// Add an event listener to the menu button to toggle the menu's visibility
menuBtn.addEventListener('click', () => {
  menu.classList.toggle('open');
});