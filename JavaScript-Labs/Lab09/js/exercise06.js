var boxClass = "movingDiv";
function outputBox(num) {
    return "<div class='" + boxClass + "' id='div" + num + "'>This is div " + num + "</div>";
}
window.addEventListener("load", function() {
    var divs = document.querySelectorAll(".movingDiv");
    for (var i = 0; i < divs.length; i++) {
        divs[i].addEventListener("mouseover", function(e) {
            // Put breakpoint on next line; inspect e and e.target in DevTools.
            alert("triggered by " + e.target.id);
        });
    }
});
