function getWeather() {
    const apiKey = 'c9856c9f13592af328d5d42e71f072cc'
    const city = document.getElementById('city').value;
    if (!city) {
        alert('Please enter a City');
        return;
    }



const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;


    fetch(currentWeatherUrl)
    .then(reponse => reponse.json())
    .then(data => {
        displayWeather(data);
    })
    .catch(error => {
        console.error('Error fetching current weather data:', error);
        alert('Error fetching current weather data. Please try again.');
    });


    //pass the respone as json and then call the display hourly forecast with recieved data
    fetch(forecastUrl)
    .then(reponse => reponse.json())
    .then(data => {
        displayHourlyForecast(data.list);
    })
    .catch(error => {
        console.error('Error fetching current weather data:', error);
        alert('Error fetching current weather data. Please try again.');
    });
}

function displayWeather(data) {
    const tempInfoDiv = document.getElementById('temp');
    const infoDiv = document.getElementById('info');
    const weatherIcon = document.getElementById('weather-icon')
    const hourlyDiv = document.getElementById('hourly');

    // Clear previous content
    infoDiv.innerHTML = '';
    hourlyDiv.innerHTML = '';
    tempInfoDiv.innerHTML = '';

    if (data.cod === '404') {
        infoDiv.innerHTML = `<p>${data.message}</p>`;
    } else {
        const cityName = data.name;
        const temperatureCelsius = Math.round(data.main.temp - 273.15);
        const temperatureFahrenheit = Math.round((temperatureCelsius * 9/5) + 32); // Conversion to Fahrenheit
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        const temperatureHtml = `
        <p>${temperatureCelsius}°C / ${temperatureFahrenheit}°F</p>
        `;

        const weatherHtml = `
        <p>${cityName}</p>
        <p>${description}</p>`;

        tempInfoDiv.innerHTML = temperatureHtml;
        infoDiv.innerHTML = weatherHtml;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;

    }
}

    function displayHourlyForecast(hourlyData) {
        const hourlyDiv = document.getElementById('hourly');
        const next24Hours = hourlyData.slice(0, 12);
        next24Hours.forEach(item => {

            const dateTime = new Date(item.dt * 1000);
            let hour = dateTime.getHours();
            const temperatureCelsius = Math.round(item.main.temp - 273.15);
            const temperatureFahrenheit = Math.round((temperatureCelsius * 9/5) + 32);
            const iconCode = item.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

            // Convert hour to 12-hour format
        const ampm = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12 || 12;

            const hourlyItemHtml = `
            <div class=""hourly-item>
            <span>${hour}:${dateTime.getMinutes().toString().padStart(2, '0')}${ampm}</span>
            <img src="${iconUrl}" alt="Hourly weather icon">
            <span>${temperatureCelsius}°C ${temperatureFahrenheit}°F</span>
            </div>`;
            hourlyDiv.innerHTML += hourlyItemHtml;

        });
    }

