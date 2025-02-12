import React from 'react';
import './forecast.css';

export function Forecast() {
  return (
    <main className='container-fluid bg-secondary text-center'>
        <div className="box">
        <span className="bold-text">5-day Forecast</span>
        <div className="forecast-container" id="forecast">
            <div className="forecast">
                1/27/25<br/>
                <img src="/images/Sunny.png" alt="Sunny" width="50" height="50"/><br/>
                <strong>Temperature:</strong> 43°F<br/>
                <strong>Wind Speed:</strong> 8 mph<br/>
                <strong>Humidity:</strong> 82%<br/>
            </div>
            <div className="forecast">
                1/28/25<br/>
                <img src="/images/Cloudy.png" alt="Cloudy" width="50" height="50"/><br/>
                <strong>Temperature:</strong> 56°F<br/>
                <strong>Wind Speed:</strong> 9 mph<br/>
                <strong>Humidity:</strong> 54%<br/>
            </div>
            <div className="forecast">
                1/29/25<br/>
                <img src="/images/Rainy.png" alt="Rainy" width="50" height="50"/><br/>
                <strong>Temperature:</strong> 62°F<br/>
                <strong>Wind Speed:</strong> 7 mph<br/>
                <strong>Humidity:</strong> 49%<br/>
            </div>
            <div className="forecast">
                1/30/25<br/>
                <img src="/images/Snowy.png" alt="Snowy" width="50" height="50"/><br/>
                <strong>Temperature:</strong> 31°F<br/>
                <strong>Wind Speed:</strong> 9 mph<br/>
                <strong>Humidity:</strong> 47%<br/>
            </div>
            <div className="forecast">
                1/31/25<br/>
                <img src="/images/Stormy.png" alt="Stormy" width="50" height="50"/><br/>
                <strong>Temperature:</strong> 64°F<br/>
                <strong>Wind Speed:</strong> 6 mph<br/>
                <strong>Humidity:</strong> 72%<br/>
            </div>
        </div>
    </div>
    </main>
  );
}