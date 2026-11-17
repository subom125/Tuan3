var stories = document.getElementById("stories");
for (var i = 0; i < stories.childNodes.length; i++) {
    var child = stories.childNodes[i];
    console.log("child " + i + ": nodeType=" + child.nodeType);
    // nodeType 1 means an HTML element, not a white-space text node.
    if (child.nodeType === 1) child.style.backgroundColor = "#dbeafe";
}
