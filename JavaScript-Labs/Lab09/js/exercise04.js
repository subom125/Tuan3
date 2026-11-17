var btn = document.getElementById("testButton");
var img = document.getElementById("mainImage");
var content = document.getElementById("content");
btn.addEventListener("click", function() {
    if (btn.innerHTML === "Hide") {
        btn.innerHTML = "Show";
        content.className = "makeItDisappear";
        setTimeout(function() { content.style.display = "none"; }, 1000);
    } else {
        btn.innerHTML = "Hide";
        content.style.display = "block";
        setTimeout(function() { content.className = "makeItNormal"; }, 100);
    }
});
img.addEventListener("mouseover", function() { img.className = "makeItGray"; });
img.addEventListener("mouseout", function() { img.className = "makeItNormal"; });
