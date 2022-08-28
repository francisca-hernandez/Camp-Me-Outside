// Nav Bar - Making it so the bar shows up on the left 
document.addEventListener('DOMContentLoaded', () => {

  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Add a click event on each of them
  $navbarBurgers.forEach(el => {
    el.addEventListener('click', () => {

      // Get the target from the "data-target" attribute
      const target = el.dataset.target;
      const $target = document.getElementById(target);

      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      el.classList.toggle('is-active');
      $target.classList.toggle('is-active');

    });

  });


  // API for Campsites 

  let url = "https://ridb.recreation.gov/api/v1/facilities?limit=5&offset=0&state=WA&radius=10&activity=CAMPING&lastupdated=10-01-2018&apikey=ad1485d4-8c3a-403d-8244-10d0d8498353";
  let $campsiteContainer = document.getElementById("campsite-container");
  let $usStatesContainer = document.querySelector("#us-states-container");
  let $modalContainer = document.querySelector(".modal-container");

  // event listener for when options are changed
  $usStatesContainer.addEventListener('change', function (event) {


    let $selectedState = $usStatesContainer.value;

    let url = "https://ridb.recreation.gov/api/v1/facilities?limit=5&offset=0&state=" + $selectedState + "&radius=10&activity=CAMPING&lastupdated=10-01-2018&apikey=ad1485d4-8c3a-403d-8244-10d0d8498353";

    fetch(url).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data.RECDATA);

          while ($campsiteContainer.hasChildNodes()) {
            $campsiteContainer.removeChild($campsiteContainer.firstChild);
          }
          while ($modalContainer.hasChildNodes()) {
            $modalContainer.removeChild($modalContainer.firstChild);
          }

          for (i = 0; i < data.RECDATA.length; i++) {
            let $campsiteCard = document.createElement("div");

            // create modal div within modal container
            $campsiteCard.id = ("modal" + [i]);
            $campsiteCard.classList = ("modal");

            $modalContainer.appendChild($campsiteCard);

            // create div to set background within modal
            let $modalBackground = document.createElement("div");
            $modalBackground.classList = ("modal-background");
            $campsiteCard.appendChild($modalBackground);

            // create div to hold all card items
            let $modalCard = document.createElement("div");
            $modalCard.classList = ("modal-card");
            $campsiteCard.appendChild($modalCard);

            // create div to contain header and description
            let $modalContentContainer = document.createElement("div");
            $modalContentContainer.classList = ("modal-card");

            // create header
            let $modalCardHeader = document.createElement("header");
            $modalCardHeader.classList = ("modal-card-head")

            let $modalCardTitle = document.createElement("p");
            $modalCardTitle.classList = ("modal-card-title");
            $modalCardTitle.textContent = data.RECDATA[i].FacilityName;

            // create description
            let $modalDescriptionContainer = document.createElement("section");
            $modalDescriptionContainer.classList = ("modal-card-body");

            let $modalDescriptionText = document.createElement("p");
            $modalDescriptionText.innerHTML = data.RECDATA[i].FacilityDescription;
            $modalDescriptionContainer.appendChild($modalDescriptionText);

            // append information into card
            $modalCardHeader.appendChild($modalCardTitle);
            $modalCard.appendChild($modalCardHeader);
            $modalCard.appendChild($modalDescriptionContainer);

            // create button to display on page when clicked
            let $modalTargetButton = document.createElement("button");
            $modalTargetButton.classList = ("js-modal-trigger button is-primary");
            $modalTargetButton.setAttribute("data-target", $campsiteCard.id)
            $modalTargetButton.textContent = data.RECDATA[i].FacilityName;

            // append button to page
            $campsiteContainer.appendChild($modalTargetButton);



            // Functions to open and close a modal
            function openModal($el) {
              $el.classList.add('is-active');
            }

            function closeModal($el) {
              $el.classList.remove('is-active');
            }

            function closeAllModals() {
              (document.querySelectorAll('.modal') || []).forEach(($modal) => {
                closeModal($modal);
              });
            }

            // Add a click event on buttons to open a specific modal
            (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
              const modal = $trigger.dataset.target;
              const $target = document.getElementById(modal);

              $trigger.addEventListener('click', () => {
                openModal($target);
              });
            });

            // Add a click event on various child elements to close the parent modal
            (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
              const $target = $close.closest('.modal');

              $close.addEventListener('click', () => {
                closeModal($target);
              });
            });

            // Add a keyboard event to close all modals
            document.addEventListener('keydown', (event) => {
              const e = event || window.event;

              if (e.keyCode === 27) { // Escape key
                closeAllModals();
              }
            });




          };
        });
      };
    });
  });

  //API for reddit

  let rditurl = "https://www.reddit.com/r/CampFireStories.json?limit=20"
  let $rditContainer = document.getElementById("campstory-container");
  let $rditModalContainer = document.querySelector(".modal-container");

  fetch(rditurl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data.data.children);

        for (i = 0; i < data.data.children.length; i++) {
          let $rditCard = document.createElement("div")

          // create modal div within modal container
          $rditCard.id = ("modal" + [i]);
          $rditCard.classList = ("modal");

          $rditModalContainer.appendChild($rditCard);

          // create div to set background within modal
          let $modalBackground = document.createElement("div");
          $modalBackground.classList = ("modal-background");
          $rditCard.appendChild($modalBackground);

          // create div to hold all card items
          let $modalCard = document.createElement("div");
          $modalCard.classList = ("modal-card");
          $rditCard.appendChild($modalCard);

          // create div to contain header and description
          let $rditModalContentContainer = document.createElement("div");
          $rditModalContentContainer.classList = ("modal-card");

          // create header
          let $modalCardHeader = document.createElement("header");
          $modalCardHeader.classList = ("modal-card-head")

          let $modalCardTitle = document.createElement("p");
          $modalCardTitle.classList = ("modal-card-title");
          $modalCardTitle.textContent = data.data.children[i].data.title;

          // create description
          let $modalDescriptionContainer = document.createElement("section");
          $modalDescriptionContainer.classList = ("modal-card-body");

          let $modalDescriptionText = document.createElement("p");
          $modalDescriptionText.innerHTML = data.data.children[i].data.selftext;

          $modalDescriptionContainer.appendChild($modalDescriptionText);

          // append information into card
          $modalCardHeader.appendChild($modalCardTitle);
          $modalCard.appendChild($modalCardHeader);
          $modalCard.appendChild($modalDescriptionContainer);

          // create button to display on page when clicked
          let $modalTargetButton = document.createElement("button");
          $modalTargetButton.classList = ("js-modal-trigger button is-primary");
          $modalTargetButton.setAttribute("data-target", $rditCard.id)
          $modalTargetButton.textContent = data.data.children[i].data.title;

          // append button to page
          $rditContainer.appendChild($modalTargetButton);

          // Functions to open and close a modal
          function openModal($el) {
            $el.classList.add('is-active');
          }

          function closeModal($el) {
            $el.classList.remove('is-active');
          }

          function closeAllModals() {
            (document.querySelectorAll('.modal') || []).forEach(($modal) => {
              closeModal($modal);
            });
          }

          // Add a click event on buttons to open a specific modal
          (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
            const modal = $trigger.dataset.target;
            const $target = document.getElementById(modal);

            $trigger.addEventListener('click', () => {
              openModal($target);
            });
          });

          // Add a click event on various child elements to close the parent modal
          (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
            const $target = $close.closest('.modal');

            $close.addEventListener('click', () => {
              closeModal($target);
            });
          });

          // Add a keyboard event to close all modals
          document.addEventListener('keydown', (event) => {
            const e = event || window.event;

            if (e.keyCode === 27) { // Escape key
              closeAllModals();
            }
          });
        };
      });
    };
  });
});
