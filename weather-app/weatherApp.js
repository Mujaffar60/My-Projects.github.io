const cityInput = document.getElementById('cityInput');
const searchButton = document.getElementById('searchButton');
const cityName = document.getElementById('cityName');
const temperatureValue = document.getElementById('temperatureValue');
// const temperatureUnit = document.getElementById('temperatureUnit');
const weatherIcon = document.getElementById('weatherIcon');
const errorMessage = document.getElementById('errorMessage');
const weatherInfo = document.getElementById('weatherInfo');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const clouds = document.getElementById('clouds');
const pressure = document.getElementById('pressure');
const description = document.querySelector('.description');

async function checkWeather(city) {

    try{

    const apiKey = "91d673dff3cb725b0c4da112632d2379"; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const weather_data = await fetch(`${apiUrl}`).then(response => response.json());

    temperatureValue.innerHTML= `${Math.round(weather_data.main.temp - 273.15)}`;

    description.innerHTML = `${weather_data.weather[0].description}`;

    humidity.innerHTML = `${weather_data.main.humidity}%`;

    windSpeed.innerHTML = `${weather_data.wind.speed} m/s`;

    clouds.innerHTML = `${weather_data.clouds.all}%`;

    pressure.innerHTML = `${weather_data.main.pressure} hPa`;

    cityName.innerHTML = `${weather_data.name}`;
    
    weatherIcon.src = `http://openweathermap.org/img/w/${weather_data.weather[0].icon}.png`;

} catch(error){
    errorMessage.innerHTML = "City not found";
}
    
}

searchButton.addEventListener('click', ()=>{
    checkWeather(cityInput.value);
});

cityInput.addEventListener('keyup',(e)=>{
   if(e.key === 'Enter'){
    checkWeather(cityInput.value);
   } 
   else if(cityInput.value === ""){
    temperatureValue.innerHTML = "";
    humidity.innerHTML = "0%";
    windSpeed.innerHTML = "m/s";
    weatherIcon.src = "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather02-512.png";
    errorMessage.innerHTML = "";
    description.innerHTML = "";
    clouds.innerHTML = "0%";
    pressure.innerHTML = "hPa";
    cityName.innerHTML = "";
   }    
})







    
