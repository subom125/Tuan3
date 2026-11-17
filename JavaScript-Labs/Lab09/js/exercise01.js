var msg = document.getElementById("msgArea");
document.getElementById("pageTitle").innerHTML = "DOM Selection Demo";
var spans = document.getElementsByTagName("span");
msg.value = "All span elements: " + spans.length + "\n";
var counts = document.getElementsByClassName("count-number");
for (var i = 0; i < counts.length; i++) {
    msg.value += counts[i].innerText + "\n";
}
var paragraphs = document.querySelectorAll("#first p");
msg.value += "First area paragraphs: " + paragraphs.length;
msg.setAttribute("title", "Selected using DOM");
document.getElementById("features").style.backgroundColor = "#c2ecd0";
