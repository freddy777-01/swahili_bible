// Side NavBar
/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
function openNav() {
  document.querySelector("#mySidenav").style.width = "250px";
  // document.getElementById("main").style.marginLeft = "250px";
  // document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
  document.querySelector("#main").style.opacity = "0.3";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
function closeNav() {
  document.querySelector("#mySidenav").style.width = "0";
  // document.getElementById("main").style.marginLeft = "0";
  document.querySelector("#main").style.opacity = "1";
  // document.body.style.backgroundColor = "white";
}

// Taking Note Box
const noteBox = document.querySelector(".note");

// Note Tab navigations
const panels = document.querySelectorAll(".note .note-body .panel");
function showPanel(panelIndex) {
  panels.forEach((panel) => {
    panel.style.display = "none";
  });
  panels[panelIndex].style.display = "block";
}
showPanel(0);

// MOdals
const modalContent = document.querySelector(
  ".modial .modal-dialog .modal-content"
);

const aboutBtn = document.querySelector("#mySidenav .help-navs ul .about");
const learnMoreBtn = document.querySelector(
  "#mySidenav .help-navs ul .learn-more"
);

aboutBtn.onclick = () => {
  document.querySelector("#contact-modal").style.display = "block";
};

learnMoreBtn.onclick = () => {
  document.querySelector("#LearnMore-modal").style.display = "block";
};

const modalCloseBtns = document.querySelectorAll(
  ".modial .modal-header .close"
);
modalCloseBtns.forEach((btn) => {
  const contactModal = document.querySelector("#contact-modal");
  const learnMore = document.querySelector("#LearnMore-modal");
  const modals = document.querySelectorAll(".modial");
  btn.onclick = () => {
    if (
      contactModal.style.display === "block" ||
      learnMore.style.display === "none" ||
      contactModal.style.display === "none" ||
      learnMore.style.display === "block"
    ) {
      modals.forEach((modal) => {
        modal.style.display = "none";
      });
    }
  };
});

/* HighLiting Versers */
const highlight = (color = null, key) => {
  let verses = document.querySelectorAll("#bible-content .verse-content");
  verses.forEach((verse) => {
    if (verse.dataset.key === key) {
      verse.children[1].style.backgroundColor = color;
    }
  });
  // console.log(color);
};

function highlighter(me, c, key) {
  let verseContainer = me.parentElement.parentElement;
  let keyData = verseContainer.dataset.key;
  let verseText = verseContainer.children[1];
  highlighted(key, c); // this function is in render.js
  highlight(c, key);
}
function changeColor(me, color, key) {
  let verseContainer = me.parentElement.parentElement.parentElement;
  let verseText = verseContainer.children[1];
  highlighted(key, color); //this functions is in render.js
  highlight(color, key);
  // console.log(key);
}
function removeColor(key) {
  //this function removes the highlights
  highlight(null, key);
  deHighlight(key);
}
/* END HighLiting Versers */
