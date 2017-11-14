// READ THIS FIRST

// 1. All of the code needed to let user enter a location is here and works
// 2. The only code that needs editing begins on line 69


// VARIABLES

var open_settings = document.querySelector(".open-settings");
var close_settings = document.querySelector(".close-settings");
var settings = document.querySelector(".settings");

var submit_form = document.querySelector(".submit");
var input_lc = document.querySelector(".locale");

if (localStorage.getItem("locale")){
  var lc = localStorage.getItem("locale");
} else {
  // Default location (area code or city, state or airport code – in quotes)
  var lc = "Providence, RI";
}


// EVENTS

open_settings.addEventListener("click",function(){
  openSettings();
});

close_settings.addEventListener("click",function(){
  closeSettings();
});

submit_form.addEventListener("click",function(e){
  // prevent defalt click behavior
  e.preventDefault();
  // get locale from form
  lc = locale.value;
  // store values in local storage
  localStorage.setItem("locale", lc);
  // close settings panel
  updateSettings();
  closeSettings();
});


// FUNCTIONS

function openSettings(){
  settings.classList.remove("js-hide");
  open_settings.classList.add("js-hide");
  close_settings.classList.remove("js-hide");
}

function closeSettings(){
  settings.classList.add("js-hide");
  close_settings.classList.add("js-hide");
  open_settings.classList.remove("js-hide");
}

function updateSettings(){
  reallySimpleWeather.weather({
    wunderkey: '', // leave blank for Yahoo API
    location: lc, //your location here, also works in lat/lon
    woeid: '', // "Where on Earth ID" optional alternative to location
    unit: 'f', // 'c' also works
    success: function(weather) {
      // sample data to display city and temperature
      html = '<main>';

      html += '<div class="weather">';

      html =  '<h1 class="city">'+weather.city+', '+weather.region+'</h1>';
      html += '<div class="circle">';
      html += '<div class="circle-text">';
      html += '<div class="flexslider">';
      html += '<ul class="slides">';
      html += '<li><h3 class="temp">'+weather.temp+'°'+weather.units.temp+'</h3></li>';
      html += '<li><h3 class="wdata-05">' +weather.currently+'</h3></li>';
      html += '<li><h3 class="wdata-06">' +weather.forecast[0].day+'</h3></li>';
      html += '<li><img src="img/sunrise1.svg" class="sunrise" alt="sunrise1"> <p class="wdata-07">' +weather.sunrise+'</p></li>';
      html += '<li><img src="img/sunset1.svg" class="sunset" alt="sunset1"><p class="wdata-08">' +weather.sunset+'</p></li>';
      html += '<li><p class="windchill">Wind Speed</p><h4 class="wdata-09">' +weather.wind.speed+'</h4></li>';
      html += '</ul>';

      html += '</div>';
      html += '</div>';
      html += '</div>';
      html += '</div>';

      html += '</main>';

      html += '<section class="bottom">';

      html += '<div class="col1">';
      html += '<h1> High </h1>';
      html += '<h2 class="wdata-01">' +weather.high+'</h2>';
      html += '</div>';

      html += '<div class="col2">';
      html += '<h1> Low </h1>';
      html += '<h2 class="wdata-02">' +weather.low+'</h2>';
      html += '</div>';

      html += '<div class="col3">';
      html += '<h1> Wind Chill </h1>';
      html += '<h2 class="wdata-03">' +weather.wind.chill+'</h2>';
      html += '</div>';

      html += '<div class="col4">';
      html += '<h1> Visibility </h1>';
      html += '<h2 class="wdata-04">' +weather.visibility+'</h2>';
      html += '</div>';

      html += '</section>';

      document.getElementById('weather').innerHTML = html;
       $('.flexslider').flexslider();
    },
    error: function(error) {
      document.getElementById('weather').innerHTML = '<p>'+error+'</p>';
    }
  });
}

//INITIALIZE

closeSettings();
updateSettings();

