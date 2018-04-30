window.onload = function load() {
  $.getJSON("https://data.smartdublin.ie/cgi-bin/rtpi/realtimebusinformation?stopid=522961&format=json", function (data) {

    var numberofresults = data.numberofresults;
    var bus = data.results;

    var table = document.getElementById("bus1");
    var header = table.createTHead();

    for (var i = 0; i < numberofresults; i++) {

      addRow(i, table, header, bus, numberofresults);

    }
  });

  $.getJSON("https://data.smartdublin.ie/cgi-bin/rtpi/realtimebusinformation?stopid=522691&format=json", function (data) {
    var numberofresults = data.numberofresults;
    var bus = data.results;

    var table = document.getElementById("bus2");
    var header = table.createTHead();

    for (var i = 0; i < numberofresults; i++) {

      addRow(i, table, header, bus, numberofresults);

    }
  });

  $.getJSON("http://api.openweathermap.org/data/2.5/forecast?id=2964179&appid=f275187df1683290985e46aaa607ed8e", function (data) {

    console.log(data)
  });
};

function addRow(i, table, header, bus, numberofresults) {

  var buslocal = "(" + bus[i].route + ") " + bus[i].origin.split(" ")[0];
  var due = bus[i].duetime;
  var destination = bus[i].destination;

  var row = table.insertRow(i);

  due = dueFunc(due);

  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);

  cell1.innerHTML = buslocal;
  cell2.innerHTML = destination;
  cell3.innerHTML = due;

  if (i + 1 == numberofresults) {

    var row = header.insertRow(0);
    var head1 = row.insertCell(0);
    var head2 = row.insertCell(1);
    var head3 = row.insertCell(2);
    head1.innerHTML = "<b>Bus</b>";
    head2.innerHTML = "<b>Destination</b>";
    head3.innerHTML = "<b>Due</b>";

  }

  function dueFunc(due) {

    if (due == "Due") {
      due = due + " Now"
    } else if (due == 1) {
      due = due + " Minute";
    } else {
      due = due + " Minutes";
    }

    return due;
  }
}
