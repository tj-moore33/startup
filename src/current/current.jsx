// import React, { useState, useEffect } from 'react';
// import './current.css';

// export function Current({ weatherData, updateWeather }) {
//   const [selectedState, setSelectedState] = React.useState('');
//   const [selectedCity, setSelectedCity] = React.useState('');
//   const [activeTab, setActiveTab] = React.useState('temperature'); // Default tab

//   const statesList = [
//     "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
//     "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
//     "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi",
//     "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico",
//     "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania",
//     "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
//     "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
//   ];

//   const cityOptions = {
//     Alabama: ["Birmingham", "Montgomery", "Mobile"],
//     Alaska: ["Anchorage", "Juneau", "Fairbanks"],
//     Arizona: ["Phoenix", "Tucson", "Mesa"],
//     Arkansas: ["Little Rock", "Fort Smith", "Fayetteville"],
//     California: ["Los Angeles", "San Francisco", "San Diego"],
//     Colorado: ["Denver", "Colorado Springs", "Aurora"],
//     Connecticut: ["Hartford", "New Haven", "Stamford"],
//     Delaware: ["Wilmington", "Dover", "Newark"],
//     Florida: ["Miami", "Orlando", "Tampa"],
//     Georgia: ["Atlanta", "Savannah", "Augusta"],
//     Hawaii: ["Honolulu", "Hilo", "Kailua"],
//     Idaho: ["Boise", "Meridian", "Nampa"],
//     Illinois: ["Chicago", "Springfield", "Peoria"],
//     Indiana: ["Indianapolis", "Fort Wayne", "Evansville"],
//     Iowa: ["Des Moines", "Cedar Rapids", "Davenport"],
//     Kansas: ["Wichita", "Topeka", "Overland Park"],
//     Kentucky: ["Louisville", "Lexington", "Bowling Green"],
//     Louisiana: ["New Orleans", "Baton Rouge", "Shreveport"],
//     Maine: ["Portland", "Lewiston", "Bangor"],
//     Maryland: ["Baltimore", "Annapolis", "Frederick"],
//     Massachusetts: ["Boston", "Worcester", "Springfield"],
//     Michigan: ["Detroit", "Grand Rapids", "Lansing"],
//     Minnesota: ["Minneapolis", "St. Paul", "Rochester"],
//     Mississippi: ["Jackson", "Gulfport", "Hattiesburg"],
//     Missouri: ["Kansas City", "St. Louis", "Springfield"],
//     Montana: ["Billings", "Missoula", "Great Falls"],
//     Nebraska: ["Omaha", "Lincoln", "Bellevue"],
//     Nevada: ["Las Vegas", "Reno", "Henderson"],
//     "New Hampshire": ["Manchester", "Nashua", "Concord"],
//     "New Jersey": ["Newark", "Jersey City", "Trenton"],
//     "New Mexico": ["Albuquerque", "Santa Fe", "Las Cruces"],
//     "New York": ["New York City", "Buffalo", "Rochester"],
//     "North Carolina": ["Charlotte", "Raleigh", "Greensboro"],
//     "North Dakota": ["Fargo", "Bismarck", "Grand Forks"],
//     Ohio: ["Columbus", "Cleveland", "Cincinnati"],
//     Oklahoma: ["Oklahoma City", "Tulsa", "Norman"],
//     Oregon: ["Portland", "Salem", "Eugene"],
//     Pennsylvania: ["Philadelphia", "Pittsburgh", "Harrisburg"],
//     "Rhode Island": ["Providence", "Warwick", "Cranston"],
//     "South Carolina": ["Charleston", "Columbia", "Greenville"],
//     "South Dakota": ["Sioux Falls", "Rapid City", "Aberdeen"],
//     Tennessee: ["Nashville", "Memphis", "Knoxville"],
//     Texas: ["Houston", "Dallas", "Austin"],
//     Utah: ["Salt Lake City", "Provo", "Ogden"],
//     Vermont: ["Burlington", "Montpelier", "Rutland"],
//     Virginia: ["Richmond", "Virginia Beach", "Norfolk"],
//     Washington: ["Seattle", "Spokane", "Tacoma"],
//     "West Virginia": ["Charleston", "Huntington", "Morgantown"],
//     Wisconsin: ["Milwaukee", "Madison", "Green Bay"],
//     Wyoming: ["Cheyenne", "Casper", "Laramie"]
//   };

//   useEffect(() => {
//     const savedState = localStorage.getItem('selectedState');
//     const savedCity = localStorage.getItem('selectedCity');
//     if (savedState) setSelectedState(savedState);
//     if (savedCity) setSelectedCity(savedCity);
//   }, []);

//   const handleStateChange = (event) => {
//     const newState = event.target.value;
//     setSelectedState(newState);
//     setSelectedCity('');
//     localStorage.setItem('selectedState', newState); // Save to localStorage
//     localStorage.removeItem('selectedCity'); // Clear previous city selection
//   };

//   const handleCityChange = (event) => {
//     const newCity = event.target.value;
//     setSelectedCity(newCity);
//     localStorage.setItem('selectedCity', newCity); // Save to localStorage
//     updateWeather(); // Update weather when a new city is selected
//   };

//   return (
//     <main className='container-fluid bg-secondary text-center'>
//       <div className="weather-container">
//         <div className="box">
//           <span className="bold-text">Find Your Weather</span>
//           <br />
//           <label htmlFor="stateDropdown">Select State:</label>
//           <select id="stateDropdown" value={selectedState} onChange={handleStateChange}>
//             <option value="">--</option>
//             {statesList.map((state) => (
//               <option key={state} value={state}>{state}</option>
//             ))}
//           </select>
//           <br /><br />
//           <label htmlFor="cityDropdown">Select City:</label>
//           <select id="cityDropdown" value={selectedCity} onChange={handleCityChange} disabled={!selectedState}>
//             <option value="">--</option>
//             {selectedState && cityOptions[selectedState]?.map((city) => (
//               <option key={city} value={city}>{city}</option>
//             ))}
//           </select>
//         </div>

//         <div className="box">
//           <span className="bold-text">Current Weather</span>
//           <p>
//             <strong>City:</strong> {selectedCity || 'Select a city'} <br />
//             <strong>Date:</strong> {new Date().toLocaleDateString()} <br />
//             <strong>Temperature:</strong> {Math.round(weatherData.temperature)}°F<br />
//             <strong>Wind Speed:</strong> {Math.round(weatherData.windSpeed)} mph<br />
//             <strong>Humidity:</strong> {Math.round(weatherData.humidity)}%<br />
//             <strong>UV Index:</strong> {Math.round(weatherData.uvIndex)}
//           </p>
//         </div>
//       </div>

//       <div className="box temperature-box">
//         <div className="tab-buttons">
//           <button className={activeTab === 'temperature' ? 'active' : ''} onClick={() => setActiveTab('temperature')}>Temperature</button>
//           <button className={activeTab === 'humidity' ? 'active' : ''} onClick={() => setActiveTab('humidity')}>Humidity</button>
//           <button className={activeTab === 'windSpeed' ? 'active' : ''} onClick={() => setActiveTab('windSpeed')}>Wind Speed</button>
//         </div>
//         <br />

//         <img src={`/images/${activeTab}-graph.png`} alt={`${activeTab} graph`} />
//       </div>
//     </main>
//   );
// }




import React, { useState } from 'react';

export function Current() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    setError(null); // Clear previous errors
    try {
      const response = await fetch(`/api/weather/${city}`);
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      setError(error.message);
      setWeather(null);
    }
  };

  return (
    <div>
      <input 
        type="text" 
        placeholder="Enter city" 
        value={city} 
        onChange={(e) => setCity(e.target.value)} 
      />
      <button onClick={fetchWeather}>Get Weather</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {weather && (
        <div>
          <h2>Weather in {weather.name}</h2>
          <p>Temperature: {weather.main.temp}°F</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} mph</p>
        </div>
      )}
    </div>
  );
}