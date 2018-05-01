window.onload = function load() {

  buses();
  weather();

  currentDate();

  setInterval(function () {

    var clearBusTable1 = document.getElementById("bus1");
    clearBusTable1.innerHTML = '';

    var clearBusTable2 = document.getElementById("bus2");
    clearBusTable2.innerHTML = '';

    buses();
  }, 30000);

  setInterval(function () {
    var clearBusTable1 = document.getElementById("weatherTab");
    clearBusTable1.innerHTML = '';

    weather();
  }, 300000);

};

function currentDate() {
  var currentTime = new Date()

  var day = currentTime.getDate()

  if (day.toString().length == 1) {
    day = "0" + day.toString()
  }

  var month = currentTime.getMonth() + 1

  if (month.toString().length == 1) {
    month = "0" + month.toString()
  }

  var year = currentTime.getFullYear()

  var dateString = day + "/" + month + "/" + year

  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById('titleWeather').innerHTML = "Weather Today (" + dateString + ") " + h + ":" + m + ":" + s;
  var t = setTimeout(currentDate, 500);
}

function checkTime(i) {
  if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
  return i;
}

function buses() {
  bus1();
  bus2();
}

function weather() {
  $.getJSON("https://api.darksky.net/forecast/9868cdc2dfbceb36552f1e6d0f6b12dd/53.270668,-9.056791", function (data) {

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

  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);
  var cell6 = row.insertCell(5);
  var cell7 = row.insertCell(6);

  cell1.innerHTML = convert((data.daily.data[1].temperatureMin + data.daily.data[1].temperatureMax) / 2) + "&deg" + "<br>" + data.daily.data[1].icon;
  cell2.innerHTML = convert((data.daily.data[2].temperatureMin + data.daily.data[2].temperatureMax) / 2) + "&deg" + "<br>" + data.daily.data[2].icon;
  cell3.innerHTML = convert((data.daily.data[3].temperatureMin + data.daily.data[3].temperatureMax) / 2) + "&deg" + "<br>" + data.daily.data[3].icon;
  cell4.innerHTML = convert((data.daily.data[4].temperatureMin + data.daily.data[4].temperatureMax) / 2) + "&deg" + "<br>" + data.daily.data[4].icon;
  cell5.innerHTML = convert((data.daily.data[5].temperatureMin + data.daily.data[5].temperatureMax) / 2) + "&deg" + "<br>" + data.daily.data[5].icon;
  cell6.innerHTML = convert((data.daily.data[6].temperatureMin + data.daily.data[6].temperatureMax) / 2) + "&deg" + "<br>" + data.daily.data[6].icon;
  cell7.innerHTML = convert((data.daily.data[7].temperatureMin + data.daily.data[7].temperatureMax) / 2) + "&deg" + "<br>" + data.daily.data[7].icon;

  var row = table.insertRow(0);
  var row = header.insertRow(0);
  var head1 = row.insertCell(0);
  var head2 = row.insertCell(1);
  var head3 = row.insertCell(2);
  var head4 = row.insertCell(3);
  var head5 = row.insertCell(4);
  var head6 = row.insertCell(5);
  var head7 = row.insertCell(6);

  head1.innerHTML = "<b>Tomorow</b>";
  head2.innerHTML = "<b>" + days[new Date(data.daily.data[2].time * 1000).getDay()] + "</b>";
  head3.innerHTML = "<b>" + days[new Date(data.daily.data[3].time * 1000).getDay()] + "</b>";
  head4.innerHTML = "<b>" + days[new Date(data.daily.data[4].time * 1000).getDay()] + "</b>";
  head5.innerHTML = "<b>" + days[new Date(data.daily.data[5].time * 1000).getDay()] + "</b>";
  head6.innerHTML = "<b>" + days[new Date(data.daily.data[6].time * 1000).getDay()] + "</b>";
  head7.innerHTML = "<b>" + days[new Date(data.daily.data[7].time * 1000).getDay()] + "</b>";
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
