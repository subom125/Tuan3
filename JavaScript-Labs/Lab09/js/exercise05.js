var boxClass = "movingDiv";
function outputBox(num) {
  return (
    "<div class='" +
    boxClass +
    "' id='div" +
    num +
    "'>This is div " +
    num +
    "</div>"
  );
}
window.addEventListener("load", function () {
  var divToGet = document.getElementById("div1");
  alert(divToGet.innerHTML); // The element exists after load.
});
