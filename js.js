window.onload = function what() {
  $.getJSON("https://data.smartdublin.ie/cgi-bin/rtpi/realtimebusinformation?stopid=522961&format=json", function (data) {
    console.log(data);

    var numberofresults = data.numberofresults;
    console.log(numberofresults);
    var bus = data.results;
    console.log(bus);

    var mydiv = document.getElementById("londis");
    var br = document.createElement("br");

    var table = document.getElementById("bus1");

    var header = table.createTHead();
    

    for (var i = 0; i < numberofresults; i++) {
      var buslocal = bus[i].origin.split(" ")[0] + " " + bus[i].route;
      var due = bus[i].duetime;
      var destination = bus[i].destination;

      console.log("Bus: " + buslocal + "\nDue: " + due + "\nDestination: " + destination);

      var row = table.insertRow(i);

      // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);

      cell1.innerHTML = buslocal;
      cell2.innerHTML = destination;
      cell3.innerHTML = due;


    }

    var row = header.insertRow(0);
    var head1 = row.insertCell(0);
    var head2 = row.insertCell(1);
    var head3 = row.insertCell(2);
    head1.innerHTML = "<b>Bus</b>";
    head2.innerHTML = "<b>Destination</b>";
    head3.innerHTML = "<b>Due</b>";

  });
};
