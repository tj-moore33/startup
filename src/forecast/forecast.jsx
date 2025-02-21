// import React from 'react';
// import './forecast.css';

// export function Forecast() {
//   return (
//     <main className='container-fluid bg-secondary text-center'>
//         <div className="box">
//         <span className="bold-text">5-day Forecast</span>
//         <div className="forecast-container" id="forecast">
//             <div className="forecast">
//                 1/27/25<br/>
//                 <img src="/images/Sunny.png" alt="Sunny" width="50" height="50"/><br/>
//                 <strong>Temperature:</strong> 43°F<br/>
//                 <strong>Wind Speed:</strong> 8 mph<br/>
//                 <strong>Humidity:</strong> 82%<br/>
//             </div>
//             <div className="forecast">
//                 1/28/25<br/>
//                 <img src="/images/Cloudy.png" alt="Cloudy" width="50" height="50"/><br/>
//                 <strong>Temperature:</strong> 56°F<br/>
//                 <strong>Wind Speed:</strong> 9 mph<br/>
//                 <strong>Humidity:</strong> 54%<br/>
//             </div>
//             <div className="forecast">
//                 1/29/25<br/>
//                 <img src="/images/Rainy.png" alt="Rainy" width="50" height="50"/><br/>
//                 <strong>Temperature:</strong> 62°F<br/>
//                 <strong>Wind Speed:</strong> 7 mph<br/>
//                 <strong>Humidity:</strong> 49%<br/>
//             </div>
//             <div className="forecast">
//                 1/30/25<br/>
//                 <img src="/images/Snowy.png" alt="Snowy" width="50" height="50"/><br/>
//                 <strong>Temperature:</strong> 31°F<br/>
//                 <strong>Wind Speed:</strong> 9 mph<br/>
//                 <strong>Humidity:</strong> 47%<br/>
//             </div>
//             <div className="forecast">
//                 1/31/25<br/>
//                 <img src="/images/Stormy.png" alt="Stormy" width="50" height="50"/><br/>
//                 <strong>Temperature:</strong> 64°F<br/>
//                 <strong>Wind Speed:</strong> 6 mph<br/>
//                 <strong>Humidity:</strong> 72%<br/>
//             </div>
//         </div>
//     </div>
//     </main>
//   );
// }


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
