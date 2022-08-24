// $(document).ready(function () {
/* Night Mode Functionality */
let nightMode = false;
const bodyClassToggler = () => {
  $("body").delay("5000").fadeIn().toggleClass("dark");
  $(".tools-fixed span").toggleClass("whiteColor boxShadow");
  $(".testaments").toggleClass("dark");
  // $(".note").toggleClass("dark");
  $(".note-body form input,.note-body form textarea").toggleClass("dark");
};
$(".bible-setting .btn").click(function () {
  if (nightMode == false) {
    $(this).html('<i class="fa fa-moon"></i>');
    bodyClassToggler();
    nightMode = true;
  } else {
    $(this).html('<i class="fa fa-sun"></i>');
    bodyClassToggler();
    nightMode = false;
  }
});
/*End Night Mode Functionality */

/* Modals */
//toggle for opening the model
$(".bible-credits .btn").click(function (e) {
  e.preventDefault();
  $(".modial").toggleClass("d-block");
});

//toggle for closing the model
$(".modial .modal-header .close").click(function (e) {
  e.preventDefault();
  $(".modial").toggleClass("d-block");
});
/* End Of Modals */

/* Note Tab navigations */
const panels = document.querySelectorAll(".note .note-body .panel");
function showPanel(panelIndex) {
  panels.forEach((panel) => {
    panel.style.display = "none";
  });
  panels[panelIndex].style.display = "block";
}
showPanel(0);
/* End of Note Tab Naviagtion */
// });
