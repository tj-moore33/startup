import React, { useState, useEffect } from 'react';
import './current.css'; './app.css'

export function Current() {
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [weatherData, setWeatherData] = useState({
    temperature: 0,
    windSpeed: 0,
    humidity: 0,
    uvIndex: 0,
  });

  const [activeTab, setActiveTab] = useState('temperature'); // Default

  const statesList = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", 
    "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", 
    "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", 
    "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", 
    "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", 
    "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", 
    "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
  ];

//   my api will expand the city options
const cityOptions = {
  Alabama: ["Birmingham", "Montgomery", "Mobile"],
  Alaska: ["Anchorage", "Juneau", "Fairbanks"],
  Arizona: ["Phoenix", "Tucson", "Mesa"],
  Arkansas: ["Little Rock", "Fort Smith", "Fayetteville"],
  California: ["Los Angeles", "San Francisco", "San Diego"],
  Colorado: ["Denver", "Colorado Springs", "Aurora"],
  Connecticut: ["Hartford", "New Haven", "Stamford"],
  Delaware: ["Wilmington", "Dover", "Newark"],
  Florida: ["Miami", "Orlando", "Tampa"],
  Georgia: ["Atlanta", "Savannah", "Augusta"],
  Hawaii: ["Honolulu", "Hilo", "Kailua"],
  Idaho: ["Boise", "Meridian", "Nampa"],
  Illinois: ["Chicago", "Springfield", "Peoria"],
  Indiana: ["Indianapolis", "Fort Wayne", "Evansville"],
  Iowa: ["Des Moines", "Cedar Rapids", "Davenport"],
  Kansas: ["Wichita", "Topeka", "Overland Park"],
  Kentucky: ["Louisville", "Lexington", "Bowling Green"],
  Louisiana: ["New Orleans", "Baton Rouge", "Shreveport"],
  Maine: ["Portland", "Lewiston", "Bangor"],
  Maryland: ["Baltimore", "Annapolis", "Frederick"],
  Massachusetts: ["Boston", "Worcester", "Springfield"],
  Michigan: ["Detroit", "Grand Rapids", "Lansing"],
  Minnesota: ["Minneapolis", "St. Paul", "Rochester"],
  Mississippi: ["Jackson", "Gulfport", "Hattiesburg"],
  Missouri: ["Kansas City", "St. Louis", "Springfield"],
  Montana: ["Billings", "Missoula", "Great Falls"],
  Nebraska: ["Omaha", "Lincoln", "Bellevue"],
  Nevada: ["Las Vegas", "Reno", "Henderson"],
  "New Hampshire": ["Manchester", "Nashua", "Concord"],
  "New Jersey": ["Newark", "Jersey City", "Trenton"],
  "New Mexico": ["Albuquerque", "Santa Fe", "Las Cruces"],
  "New York": ["New York City", "Buffalo", "Rochester"],
  "North Carolina": ["Charlotte", "Raleigh", "Greensboro"],
  "North Dakota": ["Fargo", "Bismarck", "Grand Forks"],
  Ohio: ["Columbus", "Cleveland", "Cincinnati"],
  Oklahoma: ["Oklahoma City", "Tulsa", "Norman"],
  Oregon: ["Portland", "Salem", "Eugene"],
  Pennsylvania: ["Philadelphia", "Pittsburgh", "Harrisburg"],
  "Rhode Island": ["Providence", "Warwick", "Cranston"],
  "South Carolina": ["Charleston", "Columbia", "Greenville"],
  "South Dakota": ["Sioux Falls", "Rapid City", "Aberdeen"],
  Tennessee: ["Nashville", "Memphis", "Knoxville"],
  Texas: ["Houston", "Dallas", "Austin"],
  Utah: ["Salt Lake City", "Provo", "Ogden"],
  Vermont: ["Burlington", "Montpelier", "Rutland"],
  Virginia: ["Richmond", "Virginia Beach", "Norfolk"],
  Washington: ["Seattle", "Spokane", "Tacoma"],
  "West Virginia": ["Charleston", "Huntington", "Morgantown"],
  Wisconsin: ["Milwaukee", "Madison", "Green Bay"],
  Wyoming: ["Cheyenne", "Casper", "Laramie"]
};


  // Function to generate random weather data
  const generateRandomWeather = () => {
    return {
      temperature: (Math.random() * (100 - 30) + 30).toFixed(1), // 30°F to 100°F
      windSpeed: (Math.random() * (25 - 1) + 1).toFixed(1), // 1 to 25 mph
      humidity: Math.floor(Math.random() * (100 - 20) + 20), // 20% to 100%
      uvIndex: (Math.random() * (11 - 0) + 0).toFixed(1), // 0 to 11
    };
  };

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
    setSelectedCity('');
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
    setWeatherData(generateRandomWeather()); // Generate rando data
  };

  return (
    <main className='container-fluid bg-secondary text-center'>
      <div className="weather-container">
        <div className="box">
          <span className="bold-text">Find Your Weather</span>
          <br />
          <label htmlFor="stateDropdown">Select State:</label>
          <select id="stateDropdown" value={selectedState} onChange={handleStateChange}>
            <option value="">--</option>
            {statesList.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
          <br /><br />
          <label htmlFor="cityDropdown">Select City:</label>
          <select id="cityDropdown" value={selectedCity} onChange={handleCityChange} disabled={!selectedState}>
            <option value="">--</option>
            {selectedState && cityOptions[selectedState]?.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        <div className="box">
          <span className="bold-text">Current Weather</span>
          <p>
            <strong>City:</strong> {selectedCity || 'Select a city'} <br />
            <strong>Date:</strong> {new Date().toLocaleDateString()} <br />
            <strong>Temperature:</strong> {weatherData.temperature}°F<br />
            <strong>Wind Speed:</strong> {weatherData.windSpeed} mph<br />
            <strong>Humidity:</strong> {weatherData.humidity}%<br />
            <strong>UV Index:</strong> {weatherData.uvIndex}
          </p>
        </div>
      </div>

      {/* this will all be real data when the api is put in */}
      <div className="box temperature-box">
        <div className="tab-buttons">
          <button className={activeTab === 'temperature' ? 'active' : ''} onClick={() => setActiveTab('temperature')}>Temperature</button>
          <button className={activeTab === 'humidity' ? 'active' : ''} onClick={() => setActiveTab('humidity')}>Humidity</button>
          <button className={activeTab === 'windSpeed' ? 'active' : ''} onClick={() => setActiveTab('windSpeed')}>Wind Speed</button>
        </div>
        <br />

        <img src={`/images/${activeTab}-graph.png`} alt={`${activeTab} graph`} />
      </div>
    </main>
  );
}
