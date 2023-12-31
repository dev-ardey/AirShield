// npm run dev in terminal to run this application in browser
const coordintes = {
  //default is old incorrect location
  default: {
    lat: 52.4831765, lon: 4.5729285
  },
  tata_steel: {
    lat: 52.478089, lon: 4.592505
  }
}

// delaying request rate with 2 seconds to prevent API block at first load, then once every 10 minutes
// so that if one user is using 2 requests max every 10 minutes. 
// 1h = 3 600 000 / 3600 = 1000 = 1 request per sec per user
// 1h = 3 600 0000 / 600 000 = 6000 = 6 request per sec for all users
// and 2 requests per 600 000(per 10 minutes) = 3 600 0000 / 600 000 = 6 request per hour per user
// 6 request per hour per user for 3600 requests possible = 600 users per hour.
let isFirstRequest = true;

function makeAPIRequest() {
  // make API request with API key
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coordintes.tata_steel.lat}&lon=${coordintes.tata_steel.lon}&appid=97d43aa82bbe2a80042bef503d4d9a34`)
    .then(response => response.json())
    .then(data => {
      // handle API response data
    })
    .catch(error => console.error(error));

  // add delay before making the next request
  const delay = isFirstRequest ? 2000 : 600000; // 2000 milliseconds for the first request, 10 minutes (600,000 milliseconds) for subsequent requests
  setTimeout(() => {
    isFirstRequest = false; // update the flag after the first request
    makeAPIRequest();
  }, delay);
}

// call the function to start making API requests
makeAPIRequest();

// import css style file
// import "./style.css";
import { getWeather } from "./wind";
import { ICON_MAP } from "./iconMap";
// link to current location
navigator.geolocation.getCurrentPosition(positionSucces, positionError)

function positionSucces({ coords }) {
  getWeather(
    coords.latitude,
    coords.longitude,
    Intl.DateTimeFormat().resolvedOptions().timeZone).then(renderWeather).catch(e => {
      console.log(e)
      // alert("Error getting weather information. " + error.message)
    })
}

function positionError() {
  alert("There was an error getting your location. Please allow us to use your location and refresh the page")
}

function renderWeather({ current, daily, hourly }) {
  renderCurrentWeather(current)
  renderDailyWeather(daily)
  renderHourlyWeather(hourly)
  // remove blurred class over body when loaded
  document.body.classList.remove("blurred")
}

// helper function for the renderCurrentWeather function
function setValue(selector, value, { parent = document } = {}) {
  parent.querySelector(`[data-${selector}]`).textContent = value
}

function getIconUrl(iconCode) {
  return `icons/${ICON_MAP.get(iconCode)}.png`
}

// vite URL code above code that uses it
const redArrowUrl = new URL('images/red-arrow.svg', import.meta.url).href;
const greenArrowUrl = new URL('images/green-arrow.svg', import.meta.url).href;
const greenArrowDayUrl = new URL('images/green-arrow.svg', import.meta.url).href;
const greenArrowHourUrl = new URL('images/green-arrow.svg', import.meta.url).href;
const redCloudUrl = new URL('images/red-cloud.svg', import.meta.url).href;
// const greenCloudUrl = new URL('images/green-cloud.svg', import.meta.url).href;
// const activatedShieldUrl = new URL('images/activated-shield.svg', import.meta.url).href;
const checkedShieldUrl = new URL('images/checked-shield.svg', import.meta.url).href;
const clearShieldUrl = new URL('images/clear-shield.svg', import.meta.url).href;
const map135Url = new URL('images/map-135.png', import.meta.url).href;
const map180Url = new URL('images/map-180.png', import.meta.url).href;
const map270Url = new URL('images/map-270.png', import.meta.url).href;
const map90Url = new URL('images/map-90.png', import.meta.url).href;
const map45Url = new URL('images/map-45.png', import.meta.url).href;
const map225Url = new URL('images/map-225.png', import.meta.url).href;
const map315Url = new URL('images/map-315.png', import.meta.url).href;
const map0Url = new URL('images/map-0.png', import.meta.url).href;




const currentIcon = document.querySelector("[data-current-icon]")
function renderCurrentWeather(current) {
  currentIcon.src = getIconUrl(current.iconCode)
  setValue("current-temp", current.currentTemp)
  setValue("current-high", current.highTemp)
  setValue("current-low", current.lowTemp)
  setValue("current-wind", current.windDirection)
  setValue("current-precip", current.precip)


  // arrowRotate for .green-arrow-current and pollution-agle-class tijdelijk commented out om te switchen naar nieuwe api
  // arrowRotate(document.querySelectorAll('.green-arrow-current'), data.wind.deg)
  // arrowRotate(document.querySelectorAll('.pollution-angle-class'), data.wind.deg)

  // console.log("api old= current.windDirection = " + current.windDirection)



}

function arrowRotate(elems, windDirection) {
  if (elems.length == 0) return;
  setTimeout(() => {
    elems.forEach(function (el) {
      // windDirection + 180 is omdat image op de kop is
      el.style.transform = "rotate(" + (windDirection + 180) + "deg)"
    })
  }, 200); // Add a delay of 100 milliseconds (adjust as needed) ( a delay of 50 milliseconds breakes the code )
}

function arrowColor(elems) {
  if (elems.length == 0) return;
  elems.forEach(function (el) {
    // windDirection + 180 is omdat image op de kop is
    // el.style.backgroundColor = 'red'
    el.src = redArrowUrl;

  })
}

function arrowColorGreen(elems) {
  if (elems.length == 0) return;
  elems.forEach(function (el) {
    el.src = greenArrowUrl;
  })
}





const DAY_FORMATTER = Intl.DateTimeFormat(undefined, { weekday: "short" })
const dailySection = document.querySelector("[data-day-section]")
const dayCardTemplate = document.getElementById("day-card-template")
function renderDailyWeather(daily) {
  //take daySection and remove given html
  // console.log(daily)

  dailySection.innerHTML = ""

  navigator.geolocation.getCurrentPosition(function (position) {
    const lat = position.coords.latitude
    const lon = position.coords.longitude
    const userCurrentLocation = { lat, lon };
    const pointTata = { ...coordintes.tata_steel };
    // console.log("daily lat : " + lat)
    // console.log("daily lon : " + lon)
    // console.log(userCurrentLocation)
    // console.log(pointTata)

    function bearing(lat1, lon1, lat2, lon2) {
      const dLon = (lon2 - lon1) * Math.PI / 180;

      const y = Math.sin(dLon) * Math.cos(lat2 * Math.PI / 180);
      const x = Math.cos(lat1 * Math.PI / 180) * Math.sin(lat2 * Math.PI / 180) - Math.sin(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.cos(dLon);

      let brng = Math.atan2(y, x) * 180 / Math.PI;

      if (brng < 0) {
        brng += 360;
      }

      return brng;
    }



    const windFromTata = bearing(pointTata.lat, pointTata.lon, userCurrentLocation.lat, userCurrentLocation.lon);
    // console.log("the wind from tata is " + windFromTata)

    daily.forEach((day, index) => {
      const element = dayCardTemplate.content.cloneNode(true)
      setValue("temp", day.maxTemp, { parent: element })
      setValue("date", DAY_FORMATTER.format(day.timestamp), { parent: element })
      element.querySelector("[data-icon]").src = getIconUrl(day.iconCode)
      dailySection.append(element)
      arrowRotate([document.querySelectorAll('.green-arrow-day')[index]], (day.windDirection))
      const newWindDirection = day.windDirection
      // console.log(windFromTata)
      // console.log(newWindDirection)

      // wind blowing from tata to user function
      function dayWindBlowingFrom(newWindDirection, windFromTata) {
        // Calculate the difference between the wind direction and the direction from A to the current location
        var diffTata = newWindDirection - (windFromTata + 180);
        // console.log("newest wind from tata is " + windFromTata)
        // console.log(newWindDirection)
        // Adjust for negative angles
        if (diffTata < -180) {
          diffTata += 360;
        } else if (diffTata > 180) {
          diffTata -= 360;
        }

        // Check if the difference is between -90 and 90 degrees
        return (diffTata >= -22.5 && diffTata <= 22.5);
      }

      if (dayWindBlowingFrom(newWindDirection, windFromTata)) {
        // console.log("daily arrows should be green ")
        arrowColor([document.querySelectorAll('.green-arrow-day')[index]], day.windDirection);
        // console.log(windFromTata)


        // FUNCTIE LIJKT HET TE DOEN MAAR MAAKT GEEN CONNECTIE MET GREEN ARROW DAY
      }

      if (!dayWindBlowingFrom(newWindDirection, windFromTata)) {
        arrowColorGreen([document.querySelectorAll('.green-arrow-day')[index]], day.windDirection);
      }


      //als ik volgende functie gebruik met zelfde outcome geeft ie wel correcte pijlen
      // dus of functie zelf is niet goed, foutje gemaakt ergens, of hij laat verkeerde pijen zien / windfromtata + 180? of iets anders?
      // if ((day.windDirection > 0 && day.windDirection < 40) || ((day.windDirection > 340 && day.windDirection < 360))) {
      //   //       // comented out tot hour goed is
      //         arrowColor([document.querySelectorAll('.green-arrow-day')[index]], day.windDirection)
      //       }

    })
  })
}














const expectedChanges = []
const expectedGreenChanges = []

const HOUR_FORMATTER = Intl.DateTimeFormat(undefined, { hour: "numeric" })
const hourlySection = document.querySelector("[data-hour-section]")
const hourRowTemplate = document.getElementById("hour-row-template")
function renderHourlyWeather(hourly) {
  //take hourlySection and remove given html
  hourlySection.innerHTML = ""

  navigator.geolocation.getCurrentPosition(function (position) {
    const lat = position.coords.latitude
    const lon = position.coords.longitude
    const userCurrentLocation = { lat, lon };
    const pointTata = { ...coordintes.tata_steel };
    // console.log("hourly lat : " + lat)
    // console.log("hourly lat : " + lon)
    // console.log(userCurrentLocation)
    // console.log(pointTata)

    function bearing(lat1, lon1, lat2, lon2) {
      const dLon = (lon2 - lon1) * Math.PI / 180;

      const y = Math.sin(dLon) * Math.cos(lat2 * Math.PI / 180);
      const x = Math.cos(lat1 * Math.PI / 180) * Math.sin(lat2 * Math.PI / 180) - Math.sin(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.cos(dLon);

      let brng = Math.atan2(y, x) * 180 / Math.PI;

      if (brng < 0) {
        brng += 360;
      }

      return brng;
    }



    const windFromTata = bearing(pointTata.lat, pointTata.lon, userCurrentLocation.lat, userCurrentLocation.lon);
    // console.log("the wind from tata is " + windFromTata)


    hourly.forEach((hour, index) => {
      const element = hourRowTemplate.content.cloneNode(true)
      setValue("temp", hour.temp, { parent: element })
      // wind set value is for user to see where the winddirection is flowing towards
      // setValue("wind", (hour.windDirection - 180), { parent: element })
      // maar probleem is hij ziet het niet als 360 max, dus verander het zo met een berrekening dat als over 360 is dat ie vanaf 0 gaat en omgekeerd
      setValue("wind", (hour.windDirection), { parent: element })
      setValue("precip", hour.precip, { parent: element })
      setValue("day", DAY_FORMATTER.format(hour.timestamp), { parent: element })


      setValue("time", HOUR_FORMATTER.format(hour.timestamp) + ":00", { parent: element })


      element.querySelector("[data-icon]").src = getIconUrl(hour.iconCode)
      hourlySection.append(element)

      arrowRotate([document.querySelectorAll('.green-arrow-hour')[index]], hour.windDirection)
      // console.log(hour.windDirection)
      const newWindDirection = hour.windDirection
      // console.log(windFromTata)
      // console.log(newWindDirection)

      // wind blowing from tata to user function
      function hourWindBlowingFrom(newWindDirection, windFromTata) {
        // Calculate the difference between the wind direction and the direction from A to the current location
        var diffTata = newWindDirection - (windFromTata + 180);
        // console.log(newWindDirection)
        // console.log(index, diffTata, newWindDirection, windFromTata)
        // Adjust for negative angles
        if (diffTata < -180) {
          diffTata += 360;
        } else if (diffTata > 180) {
          diffTata -= 360;
        }

        // Check if the difference is between -90 and 90 degrees
        return (diffTata >= -22.5 && diffTata <= 22.5);
      }

      if (hourWindBlowingFrom(newWindDirection, windFromTata)) {
        //expectedChanges cathes i
        expectedChanges.push(index + 1)
        expectedGreenChanges.push(index + 1)

        // console.log("hourly arrows should be green ")
        arrowColor([document.querySelectorAll('.green-arrow-hour')[index]], hour.windDirection);

      }

      if (!hourWindBlowingFrom(newWindDirection, windFromTata)) {
        arrowColorGreen([document.querySelectorAll('.green-arrow-hour')[index]], hour.windDirection);
      }

      //
      if (index === hourly.length - 1) {
        // use expectedChanges  i for X
        // console.log({ expectedChanges })
        // console.log({ expectedGreenChanges })

        // (expectedChanges[0] -1) is minus current hour
        const calculatedExpectedRedChange = (expectedChanges[0] - 1)
        // if expectedChanges is 1 it should say hour.
        if (expectedChanges == 1) {
          document.getElementById("wind-direction-in-hours").innerHTML = "TIME UNTIL POLLUTED AIR"
          document.getElementById("hours-until-change-id").innerHTML = calculatedExpectedRedChange + " HOURS";
        }
        // else expectedChanges should say hours.
        else {
          document.getElementById("wind-direction-in-hours").innerHTML = "TIME UNTIL POLLUTED AIR"
          document.getElementById("hours-until-change-id").innerHTML = calculatedExpectedRedChange + " HOURS";
        }



        // if first hourly arrow(s) are red this function calculates when they will change to green
        function countConsecutiveNumbers(array) {
          let count = 0;
          for (let i = 0; i < array.length - 2; i++) {
            if (array[i + 1] - array[i] > 1) {
              break;
            }
            count++;
          }
          return count;
        }
        const consecutiveCount = (countConsecutiveNumbers(expectedGreenChanges) + 1);
        // console.log("Consecutive Numbers Count:", consecutiveCount);
        // if the hour is at the last hour
        if (calculatedExpectedRedChange == 0) {
          document.getElementById("wind-direction-in-hours").innerHTML = "TIME UNTIL CLEAN AIR"
          document.getElementById("hours-until-change-id").innerHTML = consecutiveCount + " HOURS"
        }
        // if everything is green for a week
        if ((expectedGreenChanges && expectedChanges) == 0) {
          document.getElementById("wind-direction-in-hours").innerHTML = "TIME UNTIL POLLUTED AIR"
          document.getElementById("hours-until-change-id").innerHTML = "NO POLLUTION FOR THE COMING WEEK"
        }
      }

    })
  })
}


// console.log(fromADeg)
// working timer function only going -
var fromADeg; // Define the variable outside the callback function
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(function (position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    // console.log(position) // only gives long and lat
    // console.log("2nd api lat = " + lat)
    // console.log("2nd api lat = " + lon)

    // Calculate the bearing between the current location and A
    var bearing = calculateBearing(lat, lon, coordintes.tata_steel.lat, coordintes.tata_steel.lon);

    // Calculate the opposite direction of the bearing to get the direction from A to the current location
    var fromADeg = (bearing + 180) % 360;
    // console.log(fromADeg)



    // data api changing function
    // Get wind direction data from an API
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coordintes.tata_steel.lat}&lon=${coordintes.tata_steel.lon}&appid=97d43aa82bbe2a80042bef503d4d9a34`)
      .then(response => response.json())
      .then(data => {
        var windDeg = data.wind.deg;
        // console.log("api new = data.wind.deg = " + windDeg)





        //  green arrow and map pollution direction based on improved api

        newArrowRotate(document.querySelectorAll('.green-arrow-current'), windDeg)
        newArrowRotate(document.querySelectorAll('.pollution-angle-class'), windDeg)

        function newArrowRotate(elems, windDeg) {
          if (elems.length == 0) return;
          setTimeout(() => {
            elems.forEach(function (el) {
              el.style.transform = "rotate(" + (windDeg + 180) + "deg)";
            });
          }, 200); // Add a delay of 100 milliseconds (adjust as needed) ( a delay of 50 milliseconds breakes the code )
        }





        // Check if wind is blowing from A towards the current location
        if (windBlowingFrom(windDeg, fromADeg)) {
          // doX();linear-gradient
          // call function to do X
          // console.log("current arrow should be green ")
          // document.getElementById("wind-direction").style.background = "linear-gradient( rgb(39, 255, 208), rgb(0, 255, 21))";
          // document.getElementById("wind-direction").style.border = "2px solid rgb(0, 255, 21)";
          document.getElementById("wind-direction").style.background = "linear-gradient(90deg, rgba(0, 255, 157), rgb(0, 195, 255))";



          document.getElementById("green-arrow-id").src = greenArrowUrl;
          document.getElementById("wind-direction").innerHTML = "The wind from tatasteel is not blowing towards your location";
          document.getElementById("air-shield-img-id").src = checkedShieldUrl;
          document.getElementById("value-shield").innerHTML = "SAFE ⓘ";
          document.getElementById("green-cloud-id").classList.toggle("flowing-cloud");

          document.getElementById("overlay-button").addEventListener("click", function () {
            document.getElementById("overlay-green").classList.toggle("darken");
            document.getElementById("air-shield-popup-green-id").classList.toggle("show");

            document.getElementById("overlay-green").classList.toggle("show-background");



            document.getElementById("hide-popup-green").classList.toggle("show");
            // document.getElementById("overlay-button").style.background = "rgba(46, 84, 190, 0.562)";
            document.getElementById("overlay-button").classList.toggle("move-button-up");
            // document.getElementById("overlay-button-img").classList.toggle("show");

          });
        } else {
          // console.log("current arrow should be red ")
          // document.getElementById("wind-direction").style.border = "2px solid rgb(255, 112, 119)";
          document.getElementById("green-arrow-id").src = redArrowUrl;
          document.getElementById("wind-direction").innerHTML = "The wind from tatasteel is blowing towards your location";

          document.getElementById("wind-direction").style.background = "linear-gradient(270deg, rgb(255, 112, 119), rgb(252, 74, 127))";
          // linear-gradient(270deg, rgb(255, 112, 119), rgb(252, 74, 127));
          // document.getElementById("wind-direction").style.background = "linear-gradient(270deg, rgb(255, 112, 119), rgb(252, 74, 127));


          document.getElementById("air-shield-img-id").src = clearShieldUrl;
          document.getElementById("value-shield").innerHTML = "UNSAFE ⓘ";
          document.getElementById("green-cloud-id").src = redCloudUrl;
          document.getElementById("green-cloud-id").classList.toggle("stopping-cloud");
          // background: linear-gradient(90deg, rgb(255, 60, 60), rgb(0, 119, 255))
          // document.getElementById("current-text").style.border = "2px solid rgb(255, 112, 119)";
          // document.getElementById("temp-map-img").style.border = "2px solid rgb(255, 112, 119)";
          // document.getElementById("current-text").style.background = "linear-gradient(90deg, rgb(255, 60, 60), rgb(0, 119, 255)";
          // document.getElementById("air-shield-popup-red-id").style.background = "linear-gradient(180deg, rgb(255, 60, 60), rgb(0, 119, 255)";
          // document.getElementById("pollution-data").style.background = "linear-gradient(180deg, rgb(255, 60, 60), rgb(0, 119, 255)";

          // document.getElementById("green-cloud-id").classList.toggle("stopping-cloud");
          // mischien background blurred maken, door class te geven bij het clicken van button?



          document.getElementById("overlay-button").addEventListener("click", function () {
            document.getElementById("overlay-red").classList.toggle("show-background");




            // document.getElementById("header").classList.toggle("blur");
            document.getElementById("air-shield-popup-red-id").classList.toggle("show");
            document.getElementById("hide-popup-red").classList.toggle("show");
            // document.getElementById("overlay-button").style.background = "rgba(46, 84, 190, 0)";
            document.getElementById("overlay-button").classList.toggle("move-button-up");
            // document.getElementById("overlay-button-img").classList.toggle("show");
          });
        }


      });
  });
}





function calculateBearing(lat1, lon1, lat2, lon2) {
  // Convert coordinates to radians
  var lat1Rad = deg2rad(lat1);
  var lon1Rad = deg2rad(lon1);
  var lat2Rad = deg2rad(lat2);
  var lon2Rad = deg2rad(lon2);

  // Calculate bearing using the Haversine formula
  var y = Math.sin(lon2Rad - lon1Rad) * Math.cos(lat2Rad);
  var x = Math.cos(lat1Rad) * Math.sin(lat2Rad) - Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(lon2Rad - lon1Rad);
  var bearingRad = Math.atan2(y, x);

  // Convert bearing to degrees
  var bearing = rad2deg(bearingRad);
  // console.log(bearing)
  return bearing;
}

function deg2rad(degrees) {
  return degrees * (Math.PI / 180);
}

function rad2deg(radians) {
  return radians * (180 / Math.PI);
}
function windBlowingFrom(windDeg, fromADeg) {
  // Calculate the difference between the wind direction and the direction from A to the current location
  var diff = windDeg - fromADeg;
  // console.log(windDeg)

  // Adjust for negative angles
  if (diff < -180) {
    diff += 360;
  } else if (diff > 180) {
    diff -= 360;
  }

  // Check if the difference is between -22.5 and 22.5, but bearing is flipped so 180 - 22.5 = 157.5
  return (diff >= -157.5 && diff <= 157.5);
}





// folding function hour

document.addEventListener("DOMContentLoaded", function () {
  var toggleButtonHour = document.getElementById("toggleButton-hour");
  var toggleButtonDay = document.getElementById("toggleButton-day");

  // Set initial state and hide the boxes on page load
  var isFoldingHiddenHour = true;
  var isFoldingHiddenDay = true;
  foldingHide("hourly-box");
  foldingHide("daily-box");

  toggleButtonHour.addEventListener("click", function () {
    isFoldingHiddenHour = !isFoldingHiddenHour;
    toggleFoldingHide(isFoldingHiddenHour, "hourly-box");
  });

  toggleButtonDay.addEventListener("click", function () {
    isFoldingHiddenDay = !isFoldingHiddenDay;
    toggleFoldingHide(isFoldingHiddenDay, "daily-box");
  });

  function toggleFoldingHide(isHidden, boxId) {
    var box = document.getElementById(boxId);
    if (isHidden) {
      box.classList.add("hide-box");
    } else {
      box.classList.remove("hide-box");
    }
  }

  function foldingHide(boxId) {
    var box = document.getElementById(boxId);
    box.classList.add("hide-box");
    box.classList.add("test-box");
  }
});



// new pollution function 

// main.js

document.addEventListener("DOMContentLoaded", function () {
  let isPollutionDataHidden = true;
  let pollutionData = null;

  // Function to fetch air pollution data
  function fetchAirPollutionData() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getPosition, handleLocationError);
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }

  // Function to handle geolocation position
  function getPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    const apiKey = "97d43aa82bbe2a80042bef503d4d9a34";
    const apiUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        pollutionData = data;
        displayAirPollutionData();
      })
      .catch(error => console.error("Error fetching air pollution data:", error));
  }

  // Function to handle geolocation error
  function handleLocationError(error) {
    console.error("Error getting geolocation:", error.message);
  }

  // Function to display air pollution data
  function displayAirPollutionData() {
    const aqiElement = document.getElementById("aqi");
    const components = pollutionData.list[0].components;

    aqiElement.textContent = pollutionData.list[0].main.aqi;
    document.getElementById("co").textContent = components.co;
    document.getElementById("no").textContent = components.no;
    document.getElementById("no2").textContent = components.no2;
    document.getElementById("o3").textContent = components.o3;
    document.getElementById("so2").textContent = components.so2;
    document.getElementById("pm2_5").textContent = components.pm2_5;
    document.getElementById("pm10").textContent = components.pm10;
  }

  // Function to show the pollution data
  function showPollutionData() {
    const pollutionDataElement = document.getElementById("pollution-data");
    const overlayElement = document.getElementById("overlay");
    isPollutionDataHidden = false;
    pollutionDataElement.classList.remove("hide-box");
    overlayElement.classList.add("show-background");
  }

  // Function to hide the pollution data
  function hidePollutionData() {
    const pollutionDataElement = document.getElementById("pollution-data");
    const overlayElement = document.getElementById("overlay");
    isPollutionDataHidden = true;
    pollutionDataElement.classList.add("hide-box");
    overlayElement.classList.remove("show-background");
  }

  // Add event listener to the button
  const togglePollutionButton = document.getElementById("toggle-pollution");
  togglePollutionButton.addEventListener("click", function () {
    if (pollutionData) {
      displayAirPollutionData();
    } else {
      fetchAirPollutionData();
    }

    if (isPollutionDataHidden) {
      showPollutionData();
    } else {
      hidePollutionData();
    }
  });

  // Add event listener to the document to hide the pollution data on tap
  document.addEventListener("click", function (event) {
    if (!event.target.closest("#pollution-data") && !event.target.closest("#toggle-pollution")) {
      hidePollutionData();
    }
  });

  // Fetch the air pollution data on page load
  fetchAirPollutionData();
});



// new buttons 



// document.addEventListener("DOMContentLoaded", function () {
//   const toggleButtons = document.querySelectorAll(".toggle-button");

//   toggleButtons.forEach(function (button) {
//     const targetId = button.dataset.target;
//     const targetPopup = document.getElementById(targetId);

//     button.addEventListener("click", function () {
//       togglePopup(targetPopup);
//     });
//   });

//   function togglePopup(popup) {
//     popup.classList.toggle("hide-box");
//   }
// });