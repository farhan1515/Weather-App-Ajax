const apiKey = '32e10c1409017b3f8a131287d91b4e07'; 
const weatherData = document.getElementById('weatherData');
const errorDiv = document.getElementById('error');

document.getElementById('getWeatherBtn').addEventListener('click', getWeather);

function getWeather() {
    const locationInput = document.getElementById('locationInput').value;
    const unit = document.querySelector('input[name="unit"]:checked').value;

    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://api.openweathermap.org/data/2.5/weather?q=${locationInput}&units=${unit}&appid=${apiKey}`, true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            displayWeatherData(data);
        } else {
            showError('Location not found or API request failed.');
        }
    };

    xhr.onerror = function () {
        showError('An error occurred. Please try again later.');
    };

    xhr.send();
}

function displayWeatherData(data) {
    weatherData.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Temperature: ${data.main.temp}°</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
        <p>Weather: ${data.weather[0].description}</p>
    `;
    weatherData.classList.remove('hidden');
    errorDiv.classList.add('hidden');
}

function showError(message) {
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
    weatherData.classList.add('hidden');
}
