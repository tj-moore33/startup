import React from 'react';
import './forecast.css';
import { WiDaySunny, WiCloud, WiRain, WiSnow, WiThunderstorm } from 'react-icons/wi'; // import react icons

export function Forecast({ weatherData }) {
  // react weather icons
  const weatherIcons = {
    Sunny: <WiDaySunny size={50} color="#FFD700" />, // Yellow Sun
    Cloudy: <WiCloud size={50} color="#A9A9A9" />, // Gray Clouds
    Rainy: <WiRain size={50} color="#1E90FF" />, // Blue Rain
    Snowy: <WiSnow size={50} color="#ADD8E6" />, // Light Blue Snowflake
    Stormy: <WiThunderstorm size={50} color="#800080" /> // Purple Thunderstorm
  };

  const weatherTypes = Object.keys(weatherIcons);

  // generate random weather conditions until i have my api up
  const getRandomWeather = (prevWeather) => {
    let newWeather;
    do {
      newWeather = weatherTypes[Math.floor(Math.random() * weatherTypes.length)];
    } while (newWeather === prevWeather); 
    return newWeather;
  };

  // today's weather
  let prevWeather = weatherData.weatherType; 

  const forecastData = Array.from({ length: 5 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() + index); 

    const isToday = index === 0; // keepweather the same as Current.js
    const weather = isToday ? weatherData.weatherType : getRandomWeather(prevWeather);
    
    prevWeather = weather; 

    return {
      date: date.toLocaleDateString(),
      weather: weather,
      temperature: (parseFloat(weatherData.temperature) + (Math.random() * 10 - 5)).toFixed(1),
      windSpeed: (parseFloat(weatherData.windSpeed) + (Math.random() * 3 - 1)).toFixed(1),
      humidity: Math.max(10, Math.min(100, parseInt(weatherData.humidity) + Math.floor(Math.random() * 10 - 5))),
    };
  });

  return (
    <main className="container-fluid bg-secondary text-center">
      <div className="box">
        <span className="bold-text">5-day Forecast</span>
        <div className="forecast-container">
          {forecastData.map((day, index) => (
            <div className="forecast" key={index}>
              {day.date}<br/>
              {weatherIcons[day.weather]}
              <br/>
              <strong>Temperature:</strong> {day.temperature}°F<br/>
              <strong>Wind Speed:</strong> {day.windSpeed} mph<br/>
              <strong>Humidity:</strong> {day.humidity}%<br/>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

