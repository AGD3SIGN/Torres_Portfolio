/* Preloader Hide/Unhide */
window.onload = function () {
    const preloader = document.querySelector('.preloader');
    preloader.classList.add('hidden');
};

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
