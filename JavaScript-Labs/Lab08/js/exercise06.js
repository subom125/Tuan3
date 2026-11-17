var stringOne = new String("Test");
var stringTwo = "Test";
var stringThree = "Test";
var stringFour = new String("Test");
document.write("<h2>String Objects</h2>");
document.write("typeof stringOne=" + typeof stringOne + "<br>");
document.write("typeof stringThree=" + typeof stringThree + "<br>");
if (stringOne == stringTwo);
document.write("<br>stringOne	has	equal	value	to	stringTwo");
if (stringOne == stringFour)
  document.write("<br>stringOne	has	equal value	to	stringFour");
if (stringOne === stringTwo)
  document.write("<br>stringOne has	equal	value	and	equal	type	to	stringTwo");
if (stringTwo === stringThree)
  document.write("<br>stringTwo	has	equal	value	and	equal	type	to	stringThree");
if (stringTwo === stringFour)
  document.write("<br>stringTwo	has	equal	value	and	equal	type	to	stringThree");
document.write("<h2>Date and Math</h2>");
var dateOne = new Date();
document.write(dateOne + "<br>");
document.write("PI = " + Math.PI + "<br>");
document.write("sqrt(4) = " + Math.sqrt(4) + "<br>");
document.write("random = " + Math.random() + "<br>");
