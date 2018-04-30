window.onload = function what() {
  $.getJSON("https://data.smartdublin.ie/cgi-bin/rtpi/realtimebusinformation?stopid=522961&format=json", function(data) {
    console.log(data);

      // figuring out timestamp, time expected of train, and then difference, then converting to rounded minutes
      var bus = data.results;
      console.log(bus);
  });
};

// Method to look at next time for date formats.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
