// Nav Bar - Making it so the bar shows up on the left 
document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  
    // Add a click event on each of them
    $navbarBurgers.forEach( el => {
      el.addEventListener('click', () => {
  
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);
  
        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
  
      });
    });
  
  });


  fetch("https://ridb.recreation.gov/api/v1/campsites?query=Overnight&limit=50&offset=0&apikey=ad1485d4-8c3a-403d-8244-10d0d8498353").then(function(response) {
    if (response.ok) {
      response.json().then(function(data) {
        console.log(data);
      });
    };
  });