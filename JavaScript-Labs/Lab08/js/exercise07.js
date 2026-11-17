var daysOfWeek = ["Mon", "Tues", "Wed", "Thur", "Fri"];
daysOfWeek.push("Sat");
daysOfWeek.unshift("Sun");
document.write("<h2>Lịch tháng 11: Ngày 1-30</h2>");
document.write("<table border='1' style='border-collapse:collapse'>");
document.write("<tr>");
for (var i = 0; i < daysOfWeek.length; i++) {
  var day = daysOfWeek[i];
  if (day.length > 3) day = "<em>" + day + "</em>";
  document.write("<th>" + day + "</th>");
}
document.write("</tr>");
// Month starts on Sunday; make 30 days, seven columns.
for (var dayNumber = 1; dayNumber <= 30; dayNumber++) {
  if ((dayNumber - 1) % 7 === 0) document.write("<tr>");
  document.write("<td>" + dayNumber + "</td>");
  if (dayNumber % 7 === 0) document.write("</tr>");
}
// The final row needs five empty cells (29, 30 occupy the first two columns).
for (var empty = 0; empty < 7 - (30 % 7); empty++) document.write("<td></td>");
document.write("</tr></table>");
