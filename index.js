const body = document.querySelector('body');
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
    body.innerHTML = `locaction: ${userLocation.city}, ${userLocation.region}
    <br> Current temp: ${userWeather.temp}`;
    
    
}

displayData();
storeWeather();