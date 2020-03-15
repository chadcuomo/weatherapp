const body = document.querySelector('body');

async function fetchCity() {
    const resp = await fetch('https://ipapi.co/json/');
    const ip = await resp.json();
    return ip;
}

async function displayData() {
    const data = await fetchCity();
    body.textContent = `${data.city}, ${data.region}`;
    console.log(data);
}

displayData();