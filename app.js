document.addEventListener("DOMContentLoaded", () => {
  let currentIndex = 0;
  const items = document.querySelectorAll(".carousel-item");
  const controls = document.querySelectorAll(".carousel-control .items");

  function setClasses(newIndex) {
    items.forEach((item, i) => {
      item.classList.remove("active", "previous", "next", "move-left", "move-right", "enter-left", "enter-right");
      if (i === newIndex) {
        item.classList.add("active");
      } else if (i === (newIndex - 1 + items.length) % items.length) {
        item.classList.add("previous");
      } else if (i === (newIndex + 1) % items.length) {
        item.classList.add("next");
      }
    });
    controls.forEach((control, i) => {
      control.classList.toggle("active", i === newIndex);
    });
  }

  function showSlide(newIndex) {
    if (newIndex === currentIndex) {
      return;
    }
    const currentSlide = items[currentIndex];
    const newSlide = items[newIndex];
    const isNext = newIndex > currentIndex || (currentIndex === items.length - 1 && newIndex === 0);

    currentSlide.classList.remove("move-left", "move-right", "enter-left", "enter-right");
    newSlide.classList.remove("move-left", "move-right", "enter-left", "enter-right");

    if (isNext) {
      currentSlide.classList.add("move-left");
      newSlide.classList.add("enter-right");
    } else {
      currentSlide.classList.add("move-right");
      newSlide.classList.add("enter-left");
    }

    setTimeout(() => {
      setClasses(newIndex);
      currentIndex = newIndex; // Update currentIndex after the transition
    }, 500);
  }

  function goToNextSlide() {
    const newIndex = (currentIndex + 1) % items.length;
    showSlide(newIndex);
  }

  function goToPreviousSlide() {
    const newIndex = (currentIndex - 1 + items.length) % items.length;
    showSlide(newIndex);
  }

  controls.forEach((control) => {
    control.addEventListener("click", () => {
      const index = parseInt(control.getAttribute("data-index"));
      if (!isNaN(index)) {
        showSlide(index);
      }
    });
  });

  items.forEach((item) => {
    item.addEventListener("click", () => {
      if (item.classList.contains("previous") && !item.classList.contains("active")) {
        goToPreviousSlide();
      } else if (item.classList.contains("next") && !item.classList.contains("active")) {
        goToNextSlide();
      }
    });
  });

  setClasses(0);

  // Automatically go to the next slide every 3 seconds
  setInterval(goToNextSlide, 3000);
});

//javascript toggle
// hamburger click
document.querySelector(".navbar-toggle").addEventListener("click", function () {
  const navbarMobile = document.getElementById("navbar-mobile");
  const closeToggle = document.getElementById("close-toggle");
  const isExpanded = this.getAttribute("aria-expanded") === "true";

  closeToggle.setAttribute("aria-expanded", !isExpanded);
  navbarMobile.classList.toggle("active");

  // disable overflow
  document.body.classList.toggle("overflow-hidden");
});

// close toggle
document.getElementById("close-toggle").addEventListener("click", function () {
  const navbarMobile = document.getElementById("navbar-mobile");
  const closeToggle = document.getElementById("close-toggle");
  const isExpanded = this.getAttribute("aria-expanded") === "true";

  closeToggle.setAttribute("aria-expanded", !isExpanded);
  navbarMobile.classList.toggle("active");

  // disable overflow
  document.body.classList.toggle("overflow-hidden");
});

// Accordion
let accordion = document.getElementsByClassName("accordion");
for (let i = 0; i < accordion.length; i++) {
  accordion[i].addEventListener("click", function () {
    this.classList.toggle("active");

    let panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}
