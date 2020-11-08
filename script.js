// Application lacks several funcionalities (local storage and color for UV Index and current weather), but works well and I'm proud that I was able to solve it with a small code. 
// some examples I saw online were up to 300 or 400 lines. 
// Code was partially based on this tutorial https://www.youtube.com/watch?v=BvU4L2C1wcI
$(document).ready(function() {
    // function to activate search after user clicks or presses enter 
    $("#form-submit").submit(function(event) {
        // function that performs promise to API 
        performSearch(event);
    });
});

// Function that makes Ajax promise to API
function performSearch(event) {
    event.preventDefault();

    request = $.ajax({
        url: 'https://api.openweathermap.org/data/2.5/weather',
        type: "GET",
        data: {
            // Default is set to Celsius (metric)
            q: $("#city").val(),
            appid: '478383033577a354a3049bfdcd0fa60d',
            units: 'metric'
        }
    });

    // After promise new function creates the Weather search for city input
    request.then(function(response) {
        formatSearch(response);
        getForecast(response.coord.lat, response.coord.lon)
    });
}

function getForecast(lat, lon) {
    request = $.ajax({
        url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly&appid=478383033577a354a3049bfdcd0fa60d&units=metric`,
        type: "GET",
        dataType: "json"
    });

    // After promise new function creates the Weather search for city input
    request.then(function(response) {
        console.log(response)
        buildForecastCards(response)
    });
}

function buildForecastCards(jsonObject){
    var day = jsonObject.daily
    for (i = 1; i < 6; i++){
        var timeDisplay = moment.unix(day[i].dt).format("dddd")
        console.log(day[i]);
        var card = $("<div>").addClass("card");
        var cardBody = $("<div>").addClass("card-body");
        var cardTitle = $("<h5>").addClass("card-title").text(timeDisplay);
        var tempMax = $("<h6>").addClass("card-text").text("Max. Temp: " + day[i].temp.max + " " + String.fromCharCode(8451));
        var tempMin = $("<h6>").addClass("card-text").text("Min. Temp: " + day[i].temp.min + " " + String.fromCharCode(8451));
        var feelLike = $("<h6>").addClass("card-text").text("Feels like: " + day[i].feels_like.day + " " + String.fromCharCode(8451));

        var windSpeed = $("<h6>").addClass("card-text").text("Wind Speed: " + day[i].wind_speed + " mph");
        var icon = $("<img>").attr('src', "http://openweathermap.org/img/wn/" + day[i].weather[0].icon + "@2x.png" )

        $("#forecast").append(card.append(cardBody.append(cardTitle.append(icon),tempMax, tempMin, feelLike, windSpeed)))
    }
}

// Function that sets variables to JSON 
function formatSearch(jsonObject) {
    var cityName = jsonObject.name;
    var cityWeather = jsonObject.weather[0].main;
    var cityTemp = jsonObject.main.temp;
    var cityHumidity = jsonObject.main.humidity;
    var cityWind = jsonObject.wind.speed;
    var cityLat = jsonObject.coord.lat;
    var cityLon = jsonObject.coord.lon;
    var keyAPI = "478383033577a354a3049bfdcd0fa60d";
    
    // Variables to get icon from API
    var icon = jsonObject.weather[0].icon;
    var iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

    // Ajax call to retrieve UV Index value
    $("#city-uvIndex").empty()
    var uvURL = ("https://api.openweathermap.org/data/2.5/uvi?&lat=" + cityLat + "&lon=" + cityLon + "&appid=" + keyAPI); 
    
    $.ajax({
      url: uvURL,
      method: "GET"
    }).then(function (response) {
      console.log(response)
    
    // Sets style attributes and icon image to HTML (NOT WORKING) 
    $('#info-weather').attr('style', '.class-weather');
    var icon = $("<img>").attr('src', iconURL).attr("id", "icon")
    $('#icon').attr("class", "icon")

    console.log(iconURL)

    // Inputs JSON value to column
    $("#city-name").text(cityName).append(icon);
    $("#city-weather").text("Conditions: " + cityWeather);
    $("#city-temp").text("Temperature: " + cityTemp + " " + String.fromCharCode(8451));
    $("#temp-far").text("Temperature: " + (cityTemp * 1.8).toFixed(1) + 32 + " " + String.fromCharCode(8457));
    $("#city-humidity").text("Humidity: " + cityHumidity);
    $("#city-wind").text("Wind Speed: " + cityWind + " mph");
    $("#city-uvIndex").text("UV Index: " + response.value);
});

}









