$(document).ready(function () {
  $("#tweet-text").keyup(function () {
    let input = $(this).val();
    let length = 140-input.length
    $(this).next().children("output").text(length)
    if (length>=0) {
      $(this).next().children("output").css("color", "black")
    }
    if (length<0) {
      $(this).next().children("output").css("color", "red")
    }
  });
});
