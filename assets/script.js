//toggle icon navbar

let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

//scroll sections
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

const header = document.querySelector('header');
const footer = document.querySelector('footer');
window.onscroll = () => {
  console.log("Scroll handler called");
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');
        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });

    let scrollPos = window.scrollY;
    header.classList.toggle('sticky', scrollPos > 100);
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
}

var swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
    },
    pagination: {
        el: ".swiper-pagination",
    },
});



(function () {
  "use strict";
  /*
   * Backend based web forwarding tool to relay input form validation to designated email address
   */

  // Fetch all the forms we want to apply custom validation styles to
  const forms = document.querySelectorAll(".needs-validation");
  const result = document.getElementById("result");
  // Loop over them and prevent submission
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();

          form.querySelectorAll(":invalid")[0].focus();
        } else {
          /*
           * Form Submission using fetch()
           */

          const formData = new FormData(form);
          event.preventDefault();
          event.stopPropagation();
          const object = {};
          formData.forEach((value, key) => {
            object[key] = value;
          });
          const json = JSON.stringify(object);
          result.innerHTML = "Please wait...";

          fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: json
          })
            .then(async (response) => {
              let json = await response.json();
              if (response.status == 200) {
                result.innerHTML = json.message;
                result.classList.remove("text-gray-500");
                result.classList.add("text-green-500");
              } else {
                console.log(response);
                result.innerHTML = json.message;
                result.classList.remove("text-gray-500");
                result.classList.add("text-red-500");
              }
              window.location.href = "index.html#contact"; 
            })
            .catch((error) => {
              console.log(error);
              result.innerHTML = "Something went wrong!";
            })
            .then(function () {
              form.reset();
              form.classList.remove("was-validated");
              setTimeout(() => {
                result.style.display = "none";
              }, 5000);
            });
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
})();
const button = document.getElementById("send");


const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry)
    if(entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('show');
    }
    if(entry.isIntersecting) {
      entry.target.classList.add('showHeroLeft');
    } else {
      entry.target.classList.remove('showHeroLeft');
    }
    if(entry.isIntersecting) {
      entry.target.classList.add('showHeroRight');
    } else {
      entry.target.classList.remove('showHeroRight');
    }
  })
});

const heroLeft = document.querySelectorAll('.heroLeft');
heroLeft.forEach((el) => observer.observe(el));
const heroRight = document.querySelectorAll('.heroRight');
heroRight.forEach((el) => observer.observe(el));
const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

// Create intersection observer
const observer1 = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      // Element A is in view, show element B
      header.classList.add('hide-header');
    } else {
      // Element A is not in view, hide element B
      header.classList.remove('hide-header');
    }
  });
});

// Observe element A
observer1.observe(footer);