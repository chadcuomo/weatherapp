const body = document.querySelector('body');
const displayTemp = document.querySelector('.temp');
const displayLocation = document.querySelector('.display-location');
const displayTime = document.querySelector('.display-time');
const displayCity = document.querySelector('.city-name');
const displayCloud = document.querySelector('.cloudy');
const displayPrecip = document.querySelector('.precip');
const displayHumidity = document.querySelector('.humidity');
const displayWind = document.querySelector('.wind');

const dayOne = document.querySelector('.day1');
const oneTemp = document.querySelector('.mon');

const dayTwo = document.querySelector('.day2');
const twoTemp = document.querySelector('.tue');

const dayThree = document.querySelector('.day3');
const threeTemp = document.querySelector('.wed');

const dayFour = document.querySelector('.day4');
const fourTemp = document.querySelector('.thurs');

const dayFive = document.querySelector('.day5');
const fiveTemp = document.querySelector('.fri');

const daySix = document.querySelector('.day6');
const sixTemp = document.querySelector('.sat');

const daySeven = document.querySelector('.day7');
const sevenTemp = document.querySelector('.sun');

const weatherKey = '1446f31a2dcb4ec692617ff84214db36';
let userLocation = [];
let userWeather = [];
let userForecast = [];


async function fetchCity() {
    const resp = await fetch('https://ipapi.co/json/');
    const ip = await resp.json();
    return ip;
}

async function storeData() {
    let location = await fetchCity();
    userLocation = location;
}

async function fetchWeather() {
    await storeData();
    const resp = await fetch(`https://api.weatherbit.io/v2.0/current?city=${userLocation.city},${userLocation.region}&key=${weatherKey}&units=I`);
    const weather = await resp.json();
    return weather;
}

async function fetchForecast() {
    await storeData();
    const resp = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?city=${userLocation.city},${userLocation.region}&days=8&key=${weatherKey}&units=I`);
    const weather = await resp.json();
    return weather;
}

async function storeWeather() {
    let currentWeather = await fetchWeather();
    userWeather = currentWeather.data[0];
    console.log(userWeather);
}

async function storeForecast() {
    let forecast = await fetchForecast();
    userForecast = forecast.data;
    console.log(userForecast);
}

async function displayData() {
    await storeData();
    await storeWeather();
    await storeForecast();
    displayTemp.innerHTML = `${userWeather.temp}°`;
    displayLocation.innerHTML = `${userLocation.city}, ${userLocation.region}`;
    displayTime.innerHTML = `${userWeather.datetime}`;
    displayCity.innerHTML = `${userLocation.city}`;
    displayCloud.innerHTML = `${userWeather.clouds}%`;
    displayPrecip.innerHTML = `${userWeather.precip} in.`;
    displayHumidity.innerHTML = `${userWeather.rh}%`;
    displayWind.innerHTML = `${userWeather.wind_spd} mph`;
    dayOne.innerHTML = `${userForecast[1].datetime}`;
    oneTemp.innerHTML = `${userForecast[1].temp}°`;

    dayTwo.innerHTML = `${userForecast[2].datetime}`;
    twoTemp.innerHTML = `${userForecast[2].temp}°`;

    dayThree.innerHTML = `${userForecast[3].datetime}`;
    threeTemp.innerHTML = `${userForecast[3].temp}°`;

    dayFour.innerHTML = `${userForecast[4].datetime}`;
    fourTemp.innerHTML = `${userForecast[4].temp}°`;

    dayFive.innerHTML = `${userForecast[5].datetime}`;
    fiveTemp.innerHTML = `${userForecast[5].temp}°`;

    daySix.innerHTML = `${userForecast[6].datetime}`;
    sixTemp.innerHTML = `${userForecast[6].temp}°`;

    daySeven.innerHTML = `${userForecast[7].datetime}`;
    sevenTemp.innerHTML = `${userForecast[7].temp}°`;

    
    // body.innerHTML = `locaction: ${userLocation.city}, ${userLocation.region}
    // <br> Current temp: ${userWeather.temp}
    // <br> ${userWeather.weather.icon}`;
    
    
}

displayData();
storeForecast();