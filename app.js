// PROXY
const proxy = `https://cors-anywhere.herokuapp.com/`;
// API
const api = `https://api.darksky.net/forecast/d6a8d1edfde06d29e959f482841093bc/`;

// CONSTANTS FOR LATITUDE AND LONGITUDE
// Athens
const athensLat = 37.983810;
const athensLong = 23.727539;

// Thessaloniki
const thessalonikiLat = 40.736851;
const thessalonikiLong = 22.920227;

// Kavala
const kavalaLat = 40.9397222;
const kavalaLong = 24.4019444;

// Corfu
const corfuLat = 39.583333;
const corfuLong = 19.866667;

// DOM
// City buttons
const athensBtn = document.querySelector('.athens-btn');
const thessalonikiBtn = document.querySelector('.thessaloniki-btn');
const kavalaBtn = document.querySelector('.kavala-btn');
const corfuBtn = document.querySelector('.corfu-btn');

// Current city
const city = document.querySelector('.city');

// Current summary
const currentSummary = document.querySelector('.current-summary');

// Current temperature
const currentTemperature = document.querySelector('.current-temperature');

// 3-day forecast heading
const forecastHeading = document.querySelector('.forecast-heading');
// today selectors
const todayDate = document.querySelector('.today-date');
const todaySummary = document.querySelector('.today-summary');
const todayMaxTemp = document.querySelector('.today-max-temp');
const todayMinTemp = document.querySelector('.today-min-temp');
const todayHumidity = document.querySelector('.today-humidity');
// tomorow selectors
const tomorrowDate = document.querySelector('.tomorrow-date');
const tomorrowSummary = document.querySelector('.tomorrow-summary');
const tomorrowMaxTemp = document.querySelector('.tomorrow-max-temp');
const tomorrowMinTemp = document.querySelector('.tomorrow-min-temp');
const tomorrowHumidity = document.querySelector('.tomorrow-humidity');
// day after tomorrow selectors
const dayAfterTomorrowDate = document.querySelector('.day-after-tomorrow-date');
const dayAfterTomorrowSummary = document.querySelector('.day-after-tomorrow-summary');
const dayAfterTomorrowMaxTemp = document.querySelector('.day-after-tomorrow-max-temp');
const dayAfterTomorrowMinTemp = document.querySelector('.day-after-tomorrow-min-temp');
const dayAfterTomorrowHumidity = document.querySelector('.day-after-tomorrow-humidity');


// Function to fetch the data from the darksky api,
// display the weather information in the UI and
// call the function for different lats and longs, depending on the city
function getWeather(api) {
    fetch(api)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            // Current weather conditions
            const { temperature, summary, icon } = data.currently;
            currentSummary.textContent = `${summary}`;
            currentTemperature.textContent = `${fahrenheitToCelcius(temperature)} °C`;
            setIcons(icon, document.querySelector('.current-icon'));

            /* 3-day forecast */
            // today
            const today = data.daily.data[0];
            todayHumidity.textContent = `Humidity: ${today.humidity * 100}%`;
            todaySummary.textContent = `${today.summary}`;
            todayMaxTemp.textContent = `Max: ${fahrenheitToCelcius(today.temperatureMax)} °C`;
            todayMinTemp.textContent = `Min: ${fahrenheitToCelcius(today.temperatureMin)} °C`;
            const todayIcon = today.icon;
            setIcons(todayIcon, document.querySelector('.today-icon'));

            // tomorrow
            const tomorrow = data.daily.data[1];
            tomorrowHumidity.textContent = `Humidity: ${tomorrow.humidity * 100}%`;
            tomorrowSummary.textContent = `${tomorrow.summary}`;
            tomorrowMaxTemp.textContent = `Max: ${fahrenheitToCelcius(tomorrow.temperatureMax)} °C`;
            tomorrowMinTemp.textContent = `Min: ${fahrenheitToCelcius(tomorrow.temperatureMin)} °C`;
            const tomorrowIcon = tomorrow.icon;
            setIcons(tomorrowIcon, document.querySelector('.tomorrow-icon'));

            // day after tomorrow
            const dayAfterTomorrow = data.daily.data[2];
            dayAfterTomorrowHumidity.textContent = `Humidity: ${dayAfterTomorrow.humidity * 100}%`;
            dayAfterTomorrowSummary.textContent = `${dayAfterTomorrow.summary}`;
            dayAfterTomorrowMaxTemp.textContent = `Max: ${fahrenheitToCelcius(dayAfterTomorrow.temperatureMax)} °C`;
            dayAfterTomorrowMinTemp.textContent = `Min: ${fahrenheitToCelcius(dayAfterTomorrow.temperatureMin)} °C`;
            const dayAfterTomorrowIcon = dayAfterTomorrow.icon;
            setIcons(dayAfterTomorrowIcon, document.querySelector('.day-after-tomorrow-icon'))

            // Display the dates in the UI
            const [ firstDay, secondDay, thirdDay ] = getDate();
            todayDate.textContent = `${firstDay}`;
            tomorrowDate.textContent = `${secondDay}`;
            dayAfterTomorrowDate.textContent = `${thirdDay}`;
        })
        .catch(error => console.log(error));
}


// Athens button event listener
athensBtn.addEventListener('click', () => {
    const athensApi = `${proxy}${api}${athensLat},${athensLong}`;
    getWeather(athensApi);
    city.textContent = 'Athens';
    forecastHeading.textContent = `Athens 3-day forecast`;

});

// Thessaloniki button event listener
thessalonikiBtn.addEventListener('click', () => {
    const thessalonikiApi = `${proxy}${api}${thessalonikiLat},${thessalonikiLong}`;
    getWeather(thessalonikiApi);
    city.textContent = 'Thessaloniki';
    forecastHeading.textContent = `Thessaloniki 3-day forecast`;
});

// Kavala button event listener
kavalaBtn.addEventListener('click', () => {
    const kavalaApi = `${proxy}${api}${kavalaLat},${kavalaLong}`;
    getWeather(kavalaApi);
    city.textContent = 'Kavala';
    forecastHeading.textContent = `Kavala 3-day forecast`;
});

// Corfu button event listener
corfuBtn.addEventListener('click', () => {
    const corfuApi = `${proxy}${api}${corfuLat},${corfuLong}`;
    getWeather(corfuApi);
    city.textContent = 'Corfu';
    forecastHeading.textContent = `Corfu 3-day forecast`;
});


// Function to convert Fahrenheit to Celcius
function fahrenheitToCelcius(temperature) {
    return Math.round((temperature - 32) / 1.8);
}


// function to display the icon
function setIcons(icon, iconID) {
    const skycons = new Skycons({color: '#7c7c7c'});
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
}


// function to get the dates
function getDate() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // today
    const firstDay = new Date();
    const firstDayMonth = firstDay.getMonth();
    const today = `${days[firstDay.getDay()]} ${firstDay.getDate()} ${months[firstDayMonth]}`;

    //tomorrow
    const secondDay = new Date(firstDay);
    secondDay.setDate(firstDay.getDate() + 1);
    const secondDayMonth = secondDay.getMonth();
    const tomorrow = `${days[secondDay.getDay()]} ${secondDay.getDate()} ${months[secondDayMonth]}`;

    // day after tomorrow
    let thirdDay = new Date(secondDay);
    thirdDay.setDate(secondDay.getDate() + 1);
    const thirdDayMonth = thirdDay.getMonth();
    const dayAfterTomorrow = `${days[thirdDay.getDay()]} ${thirdDay.getDate()} ${months[thirdDayMonth]}`;

    return [ today, tomorrow, dayAfterTomorrow ];
}
