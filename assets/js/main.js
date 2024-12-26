// Wait for the window to load all resources
window.addEventListener('load', () => {
  const preloader = document.querySelector('.preloader');
  
  if (preloader) {
      // Add the 'hidden' class to apply CSS transitions
      preloader.classList.add('hidden');
      
      // Remove the preloader element from the DOM after the transition ends
      preloader.addEventListener('transitionend', () => {
          preloader.remove();
      });
  }
});

/*=============== Adding background to header on scroll ===============*/
// Function to handle header scroll state
function handleHeaderScroll() {
   const header = document.querySelector('.header');
   
   // Change background when scrolled more than 50px
   const scrollY = window.scrollY;
   
   if (scrollY >= 50) {
     header.classList.add('header-scrolled');
   } else {
     header.classList.remove('header-scrolled');
   }
 }
 
 // Add scroll event listener
 window.addEventListener('scroll', handleHeaderScroll);
 
 // Call once on page load to set initial state
 handleHeaderScroll();


/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Menu show */
if(navToggle){
   navToggle.addEventListener('click', () =>{
      navMenu.classList.add('show-menu')
   })
}

/* Menu hidden */
if(navClose){
   navClose.addEventListener('click', () =>{
      navMenu.classList.remove('show-menu')
   })
}