window.onload = function what() {
  $.getJSON("https://data.smartdublin.ie/cgi-bin/rtpi/realtimebusinformation?stopid=522961&format=json", function (data) {
    console.log(data);

    var numberofresults = data.numberofresults;
    console.log(numberofresults);
    var bus = data.results;
    console.log(bus);

    var mydiv = document.getElementById("londis");
    var br = document.createElement("br");

    for (var i = 0; i < numberofresults; i++) {
      var buslocal = bus[i].origin.split(" ")[0] + " " + bus[i].route;
      var due = bus[i].duetime;
      var destination = bus[i].destination;

      console.log("Bus: " + buslocal + "\nDue: " + due + "\nDestination: " + destination);

      mydiv.appendChild(document.createTextNode("Bus: " + buslocal + "\nDue: " + due + "\nDestination: " + destination));

     
      

    }

  });
};
