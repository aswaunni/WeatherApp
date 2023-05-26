import './style.css';
import WeatherData from './modules/weatherData,js';

let data = null
let displayC = true
const input = document.querySelector('.search')
const toggle = document.querySelector('.changeButton')

async function fetchWeather(location) {
    let response = await fetch(`https://api.weatherapi.com/v1/current.json?key=b86b2c9de34e406499b63650232605&q=${location}`)
    let responseData = await response.json()
    console.log(responseData)
    return responseData
}

async function getWeather(location) {
    try {
        let data = await fetchWeather(location)
        return new WeatherData(data)
    } catch(error) {
        console.log('No such location')
        let data = await fetchWeather('Amsterdam')
        return new WeatherData(data)
    }
}

async function init(location) {
    data = await getWeather(location)
    displayWeather()
}


function displayWeather() {
    const condition = document.querySelector('.condition')
    const name = document.querySelector('.name')
    const country = document.querySelector('.country')
    const time = document.querySelector('.time')
    const temp = document.querySelector('.temp')
    const feelslike = document.querySelector('.feelslike')
    const humidity = document.querySelector('.humidity')
    const rain = document.querySelector('.rain')
    const windspeed = document.querySelector('.windspeed')
    const icon = document.querySelector('.icon')
    condition.textContent = data.condition
    name.textContent = data.name
    country.textContent = data.country
    time.textContent = data.time
    temp.textContent = displayC ? data.temp_c + ' °C' : data.temp_f + ' °F'
    feelslike.textContent = displayC ? data.feelslike_c +' °C' : data.feelslike_f + ' °F'
    humidity.textContent = data.humidity
    rain.textContent = data.rain
    windspeed.textContent = data.windspeed

    const content = document.querySelector('.content')
    if (content.classList.contains('fade-in')) {
        content.classList.remove('fade-in')
        content.offsetWidth
    }
    content.classList.add('fade-in')
}

init('amsterdam')
input.addEventListener('keypress', (e) => {
    if (e.key == 'Enter') {
        init(e.target.value)
    }
})

toggle.addEventListener('click', () => {
    const toggle = document.querySelector('.changeButton')
    const temp = document.querySelector('.temp')
    const feelslike = document.querySelector('.feelslike')
    displayC = !displayC
    if (displayC) {
        temp.textContent = data.temp_c + ' °C'
        feelslike.textContent = data.feelslike_c + ' °C'
        toggle.textContent = 'Change to F'
    } else {
        temp.textContent = data.temp_f + ' °F'
        feelslike.textContent = data.feelslike_f + ' °F'
        toggle.textContent = 'Change to C'
    }
})