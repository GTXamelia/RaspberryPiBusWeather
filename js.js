window.onload = function what() {
  $.getJSON("https://data.smartdublin.ie/cgi-bin/rtpi/realtimebusinformation?stopid=522961&format=json", function (data) {
    console.log(data);




    var numberofresults = data.numberofresults;
    console.log(numberofresults);
    var bus = data.results;
    console.log(bus);

    for (var i = 0; i < numberofresults; i++) {
      console.log(i);
    }
  });
};
