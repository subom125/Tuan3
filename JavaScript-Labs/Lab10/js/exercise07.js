$(function () {
  $("figure img")
    .on("mouseover", function (e) {
      var alt = $(this).attr("alt");
      var src = $(this).attr("src");
      var larger = src.replace("small", "medium");
      var preview = $('<div id="preview"></div>');
      preview.append($("<img>").attr("src", larger));
      preview.append($("<p></p>").text(alt));
      $("body").append(preview);
      $(this).addClass("gray");
      $("#preview")
        .css({ top: e.pageY - 10, left: e.pageX + 30 })
        .fadeIn(500);
    })
    .on("mouseleave", function () {
      $(this).removeClass("gray");
      $("#preview").remove();
    })
    .on("mousemove", function (e) {
      $("#preview").css({ top: e.pageY - 10, left: e.pageX + 30 });
    });
});
