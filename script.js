const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temprature = document.querySelector('.temprature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');

// Add loading state
function showLoading() {
    searchBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
    searchBtn.disabled = true;
}

function hideLoading() {
    searchBtn.innerHTML = '<i class="fa-solid fa-magnifying-glass"></i>';
    searchBtn.disabled = false;
}

async function checkWeather(city) {
    if (!city.trim()) {
        alert('Please enter a city name');
        return;
    }
    
    showLoading();
    
    try {
        const api_key = "01163213e795e895ace9d55c2a76c5d0";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
        const weather_data = await fetch(`${url}`).then(response => response.json());
        
        if (weather_data.cod == `404`) {
            location_not_found.style.display = "flex";
            weather_body.style.display = "none";
            return;
        }
        
        location_not_found.style.display = "none";
        weather_body.style.display = "flex";
        
        // Update weather data with smooth animations
        temprature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)} <sup>°C</sup>`;
        description.innerHTML = `${weather_data.weather[0].description}`;
        humidity.innerHTML = `${weather_data.main.humidity}%`;
        wind_speed.innerHTML = `${Math.round(weather_data.wind.speed * 3.6)} km/h`;
        
        // Update weather icon based on condition
        switch (weather_data.weather[0].main) {
            case 'Clouds':
                weather_img.src = "assets/cloud.png";
                break;
            case 'Clear':
                weather_img.src = "assets/clear.png";
                break;
            case 'Rain':
                weather_img.src = "assets/rain.png";
                break;
            case 'Mist':
            case 'Fog':
            case 'Haze':
                weather_img.src = "assets/mist.png";
                break;
            case 'Snow':
                weather_img.src = "assets/snow.png";
                break;
            default:
                weather_img.src = "assets/cloud.png";
        }
        
        // Add fade-in animation
        weather_body.style.opacity = '0';
        weather_body.style.transform = 'translateY(20px)';
        setTimeout(() => {
            weather_body.style.opacity = '1';
            weather_body.style.transform = 'translateY(0)';
        }, 100);
        
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Error fetching weather data. Please try again.');
    } finally {
        hideLoading();
    }
}
// Event listeners
searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
});

// Add Enter key support
inputBox.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkWeather(inputBox.value);
    }
});

// Add focus effects
inputBox.addEventListener('focus', () => {
    inputBox.style.transform = 'scale(1.02)';
});

inputBox.addEventListener('blur', () => {
    inputBox.style.transform = 'scale(1)';
});

// Initialize with default state
document.addEventListener('DOMContentLoaded', () => {
    weather_body.style.display = 'flex';
    weather_body.style.opacity = '1';
});




