var count = 1;
var area = document.getElementById("output");
area.innerHTML = "this text was written from JS. Count = " + count;
count++;
var output = "Count = " + count;
area.innerHTML += "<br>" + output;
