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

    request.done(function(response) {
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

    uvIndex = $.ajax({
        url: "http://api.openweathermap.org/data/2.5/uvi?lat=" + cityLat + "&lon=" + cityLon + "&appid=478383033577a354a3049bfdcd0fa60d",
        type: "GET",
        }).then(function(event){
    });
    
    uvIndex.done(function(event){
        uvIndexSearch(event)
        });
    

    $("#city-name").text(cityName);
    $("#city-weather").text("Conditions: " + cityWeather);
    $("#city-temp").text("Temperature: " + cityTemp + " Celsius");
    $("#temp-far").text("Temperature: " + (cityTemp * 1.8).toFixed(1) + 32 + " Fahrenheit");
    $("#city-humidity").text("Humidity: " + cityHumidity);
    $("#city-wind").text("Wind Speed: " + cityWind + " mph");
    $("#city-uvIndex").text("UV Index: " + uvIndex.event.value);
}









