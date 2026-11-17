function init() {
    document.getElementById("sampleForm").addEventListener("submit", checkForEmptyFields);
}
window.addEventListener("load", init);
function checkForEmptyFields(e) {
    var errorArea = document.getElementById("errors");
    errorArea.className = "hidden";
    errorArea.innerHTML = "";
    var fields = document.querySelectorAll("input[type=text],input[type=password]");
    var emptyFields = [];
    for (var i = 0; i < fields.length; i++) {
        if (fields[i].value.trim() === "") emptyFields.push(fields[i].id);
    }
    if (emptyFields.length > 0) {
        e.preventDefault();
        errorArea.textContent = "The following fields can't be empty: " + emptyFields.join(", ");
        errorArea.className = "visible";
    } else {
        e.preventDefault(); // Keep demo on the same page.
        errorArea.textContent = "All fields filled. Form validation passed!";
        errorArea.className = "visible";
    }
}
