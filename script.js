$(document).ready(function() {
    
    $("#form-submit").submit(function(event) {
        performSearch(event);
    });
});

function performSearch(event) {
    event.preventDefault();

    request = $.ajax({
        url: 'https://api.openweathermap.org/data/2.5/weather',
        type: "GET",
        data: {
            q: $("#city").val(),
            appid: '478383033577a354a3049bfdcd0fa60d',
            units: 'metric'
        }
    });

    request.then(function(response) {
        formatSearch(response);
    });
}


function formatSearch(jsonObject) {
    var cityName = jsonObject.name;
    var cityWeather = jsonObject.weather[0].main;
    var cityTemp = jsonObject.main.temp;
    var cityHumidity = jsonObject.main.humidity;
    var cityWind = jsonObject.wind.speed;
    var cityLat = jsonObject.coord.lat;
    var cityLon = jsonObject.coord.lon;
    var keyAPI = "478383033577a354a3049bfdcd0fa60d";
    var icon = jsonObject.weather[0].icon;
    var iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

    $("#city-uvIndex").empty()
    var uvURL = ("https://api.openweathermap.org/data/2.5/uvi?&lat=" + cityLat + "&lon=" + cityLon + "&appid=" + keyAPI); 
    
    $.ajax({
      url: uvURL,
      method: "GET"
    }).then(function (response) {
      console.log(response)

    $('#icon').attr('<img src="iconURL">');
    $('#icon').attr("class", "icon")

    console.log(iconURL)

    $("#city-name").text(cityName);
    $("#city-weather").text("Conditions: " + cityWeather);
    $("#city-temp").text("Temperature: " + cityTemp + " Celsius");
    $("#temp-far").text("Temperature: " + (cityTemp * 1.8).toFixed(1) + 32 + " Fahrenheit");
    $("#city-humidity").text("Humidity: " + cityHumidity);
    $("#city-wind").text("Wind Speed: " + cityWind + " mph");
    $("#city-uvIndex").text("UV Index: " + response.value);
});

}









