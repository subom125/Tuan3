$(function () {
  var msg = $("#msgArea");
  msg.val("here is some new text");
  $("#pageTitle").html("New Title with jQuery");
  msg.val("My class is " + msg.attr("class"));
  $("button").css("background-color", "#e9a1a1");
  $("body").css("background-color", "ivory");
  $(".center-icons").addClass("selected");
});
