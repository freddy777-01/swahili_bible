$(document).ready(function () {
  let nightMode = false;
  const bodyClassToggler = () => {
    $("body").delay("5000").fadeIn().toggleClass("dark");
    $(".tools-fixed span").toggleClass("whiteColor boxShadow");
    $(".testaments").toggleClass("dark");
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
});
