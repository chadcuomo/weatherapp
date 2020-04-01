const body = document.querySelector('body');
const displayTemp = document.querySelector('.temp');
const displayLocation = document.querySelector('.display-location');
const displayTime = document.querySelector('.display-time');
const displayCity = document.querySelector('.city-name');
const displayCloud = document.querySelector('.cloudy');
const displayPrecip = document.querySelector('.precip');
const displayHumidity = document.querySelector('.humidity');
const displayWind = document.querySelector('.wind');
const weatherKey = '1446f31a2dcb4ec692617ff84214db36';
let userLocation = [];
let userWeather = [];


async function fetchCity() {
    const resp = await fetch('https://ipapi.co/json/');
    const ip = await resp.json();
    return ip;
}

async function storeData() {
    let location = await fetchCity();
    userLocation = location;
    console.log(userLocation);
}

async function fetchWeather() {
    await storeData();
    const resp = await fetch(`https://api.weatherbit.io/v2.0/current?city=${userLocation.city},${userLocation.region}&key=${weatherKey}&units=I`);
    const weather = await resp.json();
    return weather;
}

async function storeWeather() {
    let currentWeather = await fetchWeather();
    userWeather = currentWeather.data[0];
    console.log(userWeather);
}

async function displayData() {
    await storeData();
    await storeWeather();
    displayTemp.innerHTML = `${userWeather.temp}°`;
    displayLocation.innerHTML = `${userLocation.city}, ${userLocation.region}`;
    displayTime.innerHTML = `${userWeather.datetime}`;
    displayCity.innerHTML = `${userLocation.city}`;
    displayCloud.innerHTML = `${userWeather.clouds}%`;
    displayPrecip.innerHTML = `${userWeather.precip} in.`;
    displayHumidity.innerHTML = `${userWeather.rh}%`
    displayWind.innerHTML = `${userWeather.wind_spd} mph`
    
    // body.innerHTML = `locaction: ${userLocation.city}, ${userLocation.region}
    // <br> Current temp: ${userWeather.temp}
    // <br> ${userWeather.weather.icon}`;
    
    
}

displayData();
storeWeather();