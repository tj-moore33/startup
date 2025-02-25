import React, { useState, useEffect } from 'react';
import '../app.css';
//This is my websocket sub 


//rando cities
const allCities = [
  "Monza, Italy", "Suzuka, Japan", "Austin, USA", "Melbourne, Australia",
  "Monte Carlo, Monaco", "Hockenheim, Germany", "Sao Paulo, Brazil", "Moscow, Russia",
  "Baku, Azerbaijan", "Abu Dhabi, UAE", "Montreal, Canada", "Mexico City, Mexico"
];

export function World() {
  const [weatherUpdates, setWeatherUpdates] = useState([]);
  const [availableCities, setAvailableCities] = useState([...allCities]); 

  //weather conditions
  const weatherTypes = ["Sunny", "Cloudy", "Rainy", "Snowy", "Stormy", "Windy"];

  // generate a random weather update
  const generateWeatherUpdate = () => {
    if (availableCities.length === 0) {
      setAvailableCities([...allCities]);
      return null;
    }

    //prevent repeats
    const cityIndex = Math.floor(Math.random() * availableCities.length);
    const city = availableCities[cityIndex];
    setAvailableCities(prevCities => prevCities.filter((_, index) => index !== cityIndex));

    //generate random weather data
    const weather = weatherTypes[Math.floor(Math.random() * weatherTypes.length)];
    const temperature = Math.round(Math.random() * (100 - 30) + 30); // 30°F to 100°F
    const windSpeed = Math.round(Math.random() * (25 - 1) + 1); // 1 to 25 mph
    const humidity = Math.round(Math.random() * (100 - 20) + 20); // 20% to 100%

    return { city, weather, temperature, windSpeed, humidity };
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newUpdate = generateWeatherUpdate();

      if (newUpdate) {
        setWeatherUpdates(prevUpdates => [newUpdate, ...prevUpdates].slice(0, 5)); //keep last 5 updates
      }
    }, 2000); //2 second

    return () => clearInterval(intervalId);
  }, []);

  return (
    <main className='container-fluid bg-secondary text-center'>
      <div className="box" id="weather-updates">
        <span className="bold-text">Global Weather Updates</span>
        <div className="weather-updates-container">
          {weatherUpdates.map((update, index) => (
            <p key={index}>
              <strong>{update.city}:</strong> {update.weather}, {update.temperature}°F, Wind: {update.windSpeed} mph, Humidity: {update.humidity}%
            </p>
          ))}
        </div>
      </div>
    </main>
  );
}
