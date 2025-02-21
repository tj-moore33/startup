import React from 'react';
import './forecast.css';

export function Forecast() {
  // Forecast data stored in an array
  const forecastData = [
    { date: "1/27/25", weather: "Sunny", temperature: 43, windSpeed: 8, humidity: 82 },
    { date: "1/28/25", weather: "Cloudy", temperature: 56, windSpeed: 9, humidity: 54 },
    { date: "1/29/25", weather: "Rainy", temperature: 62, windSpeed: 7, humidity: 49 },
    { date: "1/30/25", weather: "Snowy", temperature: 31, windSpeed: 9, humidity: 47 },
    { date: "1/31/25", weather: "Stormy", temperature: 64, windSpeed: 6, humidity: 72 }
  ];

  return (
    <main className='container-fluid bg-secondary text-center'>
      <div className="box">
        <span className="bold-text">5-day Forecast</span>
        <div className="forecast-container">
          {forecastData.map((day, index) => (
            <div className="forecast" key={index}>
              {day.date}<br/>
              <img src={`/images/${day.weather}.png`} alt={day.weather} width="50" height="50"/><br/>
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
