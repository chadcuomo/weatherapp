const body = document.querySelector('body');
const displayTemp = document.querySelector('.temp');
const displayLocation = document.querySelector('.display-location');
const displayTime = document.querySelector('.display-time');
const displayCity = document.querySelector('.city-name');
const displayCloud = document.querySelector('.cloudy');
const displayPrecip = document.querySelector('.precip');
const displayHumidity = document.querySelector('.humidity');
const displayWind = document.querySelector('.wind');
const weatherContainer = document.querySelector('.main-weather');
const h2 = document.querySelector('h2');
const h3 = document.querySelector('h3');
const button = document.querySelector('.button');
const button2 = document.querySelector('.button2');

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
let userInfo = [];


async function fetchCity() {
    const resp = await fetch('https://ipapi.co/json/');
    const ip = await resp.json();
    return ip;
}

async function storeData() {
    let location = await fetchCity();
    userLocation = location;
    userInfo = `${userLocation.city}, ${userLocation.region}`;
    return userInfo;
}

async function fetchWeather(location = userInfo) {
    const resp = await fetch(`https://api.weatherbit.io/v2.0/current?city=${location}&key=${weatherKey}&units=I`);
    const weather = await resp.json();
    return weather;
}

async function fetchForecast(location = userInfo) {
    const resp = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?city=${location}&days=8&key=${weatherKey}&units=I`);
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
}


function changeInfo(code) {
    const thunder = ['200','201','202','230','231','232','233'];
    const rain = ['300','302','500','501','502','511','520','521','522','900'];
    const snow = ['600','601','602','610','611','612','621','622','623'];
    const cloudy = ['700','711','721','731','741','751','802','803','804'];
    const clearsky = ['800','801'];
    if (thunder.includes(code)) {
        weatherContainer.classList.add('thunder');
        h2.innerHTML = `You can expect thunder and lightning`;
        h3.innerHTML = `Stay in and get cozy if you can`;
    } else if (rain.includes(code)) {
        weatherContainer.classList.add('rain');
        h2.innerHTML = `It's rainy today`;
        h3.innerHTML = `Don't forget your umbrella`;
    } else if (snow.includes(code)) {
        weatherContainer.classList.add('snow');
        h2.innerHTML = `It's snowing outside`;
        h3.innerHTML = `Don't forget your winter coat`;
    } else if (cloudy.includes(code)) {
        weatherContainer.classList.add('cloud');
        h2.innerHTML = `Today is so cloudy`;
        h3.innerHTML = `Don't expect to see the sun`;
    } else if (clearsky.includes(code)) {
        weatherContainer.classList.add('clearsky');
        h2.innerHTML = `Today's skies are fairly clear`;
        h3.innerHTML = `Don't forget your sunscreen`;
    }
}

async function displayData() {
    await storeWeather();
    await storeForecast();
    console.log(userInfo);
    changeInfo(userWeather.weather.code);
    displayTemp.innerHTML = `${userWeather.temp}°`;
    displayLocation.innerHTML = `${userInfo}`;
    displayTime.innerHTML = `${userWeather.datetime}`;
    displayCity.innerHTML = `${userInfo}`;
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

async function changeLocation() {
    console.log(userInfo)
    const newUserInfo = prompt("Please enter City, State:", `${userInfo}`);
    if (newUserInfo === null || newUserInfo === '') {
        return
    } else{
        userInfo = newUserInfo;
    console.log(userInfo);
    weatherContainer.className = 'main-weather';
    await storeWeather();
    await storeForecast();
    await displayData(); 
    console.log(userInfo);
    }
}

button.addEventListener('click', changeLocation);
button2.addEventListener('click', changeLocation);

storeData().then(() => {
    displayData();
})



