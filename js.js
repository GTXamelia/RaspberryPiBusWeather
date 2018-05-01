window.onload = function load() {

  buses();
  weather();

  setInterval(function () {

    var clearBusTable1 = document.getElementById("bus1");
    clearBusTable1.innerHTML = '';

    var clearBusTable2 = document.getElementById("bus2");
    clearBusTable2.innerHTML = '';

    buses();
  }, 30000);

};

function buses() {
  bus1();
  bus2();
}

function weather() {
  $.getJSON("https://api.darksky.net/forecast/9868cdc2dfbceb36552f1e6d0f6b12dd/53.270668,-9.056791", function (data) {


    var days = data.daily.data;

    var date = new Date(days[0].time * 1000);

    console.log(data.daily.data[0].time)
    todayWeather(data);
    weekWeather(data);

  });
}

function todayWeather(data) {
  var today = data.daily.data[0];
  document.getElementById("WeatherTemp").innerHTML = convert(data.currently.temperature) + "&deg";
  document.getElementById("WeatherDesc").innerHTML = today.summary;
}

function weekWeather(data) {
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  var table = document.getElementById("weatherTab");
  var header = table.createTHead();
  var row = table.insertRow(0);
  var row = header.insertRow(0);
  var head1 = row.insertCell(0);
  var head2 = row.insertCell(1);
  var head3 = row.insertCell(2);
  var head4 = row.insertCell(2);
  var head5 = row.insertCell(2);
  var head6 = row.insertCell(2);
  var head7 = row.insertCell(2);
  head1.innerHTML = "<b>Tomorow</b>";
  head2.innerHTML = days[new Date(data.daily.data[1].time * 1000).getDay()];
  head3.innerHTML = days[new Date(data.daily.data[2].time * 1000).getDay()];
  head4.innerHTML = days[new Date(data.daily.data[3].time * 1000).getDay()];
  head5.innerHTML = days[new Date(data.daily.data[4].time * 1000).getDay()];
  head6.innerHTML = days[new Date(data.daily.data[5].time * 1000).getDay()];
  head7.innerHTML = days[new Date(data.daily.data[6].time * 1000).getDay()];
}

function convert(degree) {
  var x;

  x = (degree - 32) * 5 / 9;
  x = Math.round(x);

  return x;
}

function bus1() {
  $.getJSON("https://data.smartdublin.ie/cgi-bin/rtpi/realtimebusinformation?stopid=522961&format=json", function (data) {

    var numberofresults = data.numberofresults;
    var bus = data.results;
    var busid = data.stopid;

    var table = document.getElementById("bus1");
    var header = table.createTHead();

    for (var i = 0; i < numberofresults; i++) {

      addRow(i, table, header, bus, numberofresults, busid);

    }
  });
}

function bus2() {
  $.getJSON("https://data.smartdublin.ie/cgi-bin/rtpi/realtimebusinformation?stopid=522691&format=json", function (data) {
    var numberofresults = data.numberofresults;
    var bus = data.results;
    var busid = data.stopid;

    var table = document.getElementById("bus2");
    var header = table.createTHead();

    for (var i = 0; i < numberofresults; i++) {

      addRow(i, table, header, bus, numberofresults, busid);

    }
  });
}

function addRow(i, table, header, bus, numberofresults, busid) {

  if (busid == "522691") {
    var buslocal = "(" + bus[i].route + ") " + bus[i].destination.split(" ")[0];
    var destination = bus[i].destination;
  } else {
    var buslocal = "(" + bus[i].route + ") " + bus[i].origin.split(" ")[0];
    var destination = bus[i].destination;
  }

  var due = bus[i].duetime;


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
