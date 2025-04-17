import React, { useState, useEffect } from 'react';
import './current.css';

export function Current({ weatherData, updateWeather }) {
  const [selectedState, setSelectedState] = React.useState('');
  const [selectedCity, setSelectedCity] = React.useState('');
  const [activeTab, setActiveTab] = React.useState('temperature'); // Default tab

  const statesList = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
    "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
    "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi",
    "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico",
    "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania",
    "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
    "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
  ];

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

  useEffect(() => {
    const savedState = localStorage.getItem('selectedState');
    const savedCity = localStorage.getItem('selectedCity');
    if (savedState) setSelectedState(savedState);
    if (savedCity) setSelectedCity(savedCity);
  }, []);

  const handleStateChange = (event) => {
    const newState = event.target.value;
    setSelectedState(newState);
    setSelectedCity('');
    localStorage.setItem('selectedState', newState); // Save to localStorage
    localStorage.removeItem('selectedCity'); // Clear previous city selection
  };

  const handleCityChange = (event) => {
    const newCity = event.target.value;
    setSelectedCity(newCity);
    localStorage.setItem('selectedCity', newCity); // Save to localStorage
    updateWeather(); // Update weather when a new city is selected
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
            <strong>Temperature:</strong> {Math.round(weatherData.temperature)}°F<br />
            <strong>Wind Speed:</strong> {Math.round(weatherData.windSpeed)} mph<br />
            <strong>Humidity:</strong> {Math.round(weatherData.humidity)}%<br />
            <strong>UV Index:</strong> {Math.round(weatherData.uvIndex)}
          </p>
        </div>
      </div>

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




// import React, { useState, useEffect } from 'react';
// import './current.css';

// export function Current({ updateWeather }) {
//   const [weather, setWeather] = useState(null);
//   const [error, setError] = useState(null);

//   // Function to fetch weather data from the backend with credentials
//   const fetchWeatherData = async () => {
//     try {
//       const response = await fetch('/api/weather', { credentials: 'include' });
//       if (!response.ok) {
//         throw new Error('Failed to fetch weather data');
//       }
//       const data = await response.json();
//       setWeather(data);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   useEffect(() => {
//     fetchWeatherData();
//   }, []);

//   return (
//     <main className="container-fluid bg-secondary text-center">
//       <div className="box current-box">
//         <h2>Current Weather</h2>
//         {error && <p className="error">{error}</p>}
//         {weather ? (
//           <div>
//             <p>
//               <strong>City:</strong> {weather.city}<br />
//               <strong>State:</strong> {weather.state}<br />
//               <strong>Temperature:</strong> {weather.weather.main ? Math.round(weather.weather.main.temp) : 'N/A'}°F<br />
//               <strong>Humidity:</strong> {weather.weather.main ? weather.weather.main.humidity : 'N/A'}%<br />
//               <strong>Wind Speed:</strong> {weather.weather.wind ? weather.weather.wind.speed : 'N/A'} mph<br />
//             </p>
//             <button onClick={updateWeather}>Update Weather</button>
//           </div>
//         ) : (
//           <p>Loading weather data...</p>
//         )}
//       </div>
//     </main>
//   );
// }





// import React, { useState, useEffect } from 'react';
// import './current.css';

// export function Current({ updateWeather }) {
//   const [selectedState, setSelectedState] = useState(localStorage.getItem('selectedState') || '');
//   const [selectedCity, setSelectedCity] = useState(localStorage.getItem('selectedCity') || '');
//   const [activeTab, setActiveTab] = useState('temperature'); // Default tab
//   const [weatherData, setWeatherData] = useState(null);

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

//   // Load state and city from localStorage when component mounts
//   useEffect(() => {
//     const savedState = localStorage.getItem('selectedState');
//     const savedCity = localStorage.getItem('selectedCity');
//     if (savedState) setSelectedState(savedState);
//     if (savedCity) setSelectedCity(savedCity);
//   }, []);

//   // Function to fetch weather data from the API
//   const fetchWeatherData = async () => {
//     try {
//       const response = await fetch('/api/weather', { credentials: 'include' });
//       if (!response.ok) {
//         throw new Error('Failed to fetch weather data');
//       }
//       const data = await response.json();
//       setWeatherData(data);
//     } catch (err) {
//       console.error('Error fetching weather data:', err.message);
//       setWeatherData(null);
//     }
//   };

//   // Fetch weather data when a new city is selected
//   useEffect(() => {
//     if (selectedCity) {
//       fetchWeatherData();
//     }
//   }, [selectedCity]);

//   const handleStateChange = (event) => {
//     const newState = event.target.value;
//     setSelectedState(newState);
//     setSelectedCity('');
//     localStorage.setItem('selectedState', newState);
//     localStorage.removeItem('selectedCity');
//   };

//   const handleCityChange = (event) => {
//     const newCity = event.target.value;
//     setSelectedCity(newCity);
//     localStorage.setItem('selectedCity', newCity);
//     // Optionally call updateWeather() if needed
//     fetchWeatherData();
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
//           {weatherData ? (
//             <p>
//               <strong>City:</strong> {weatherData.city || selectedCity} <br />
//               <strong>Date:</strong> {new Date().toLocaleDateString()} <br />
//               <strong>Temperature:</strong> {Math.round(weatherData.weather.main ? weatherData.weather.main.temp : 0)}°F<br />
//               <strong>Wind Speed:</strong> {Math.round(weatherData.weather.wind ? weatherData.weather.wind.speed : 0)} mph<br />
//               <strong>Humidity:</strong> {Math.round(weatherData.weather.main ? weatherData.weather.main.humidity : 0)}%<br />
//               <strong>UV Index:</strong> {Math.round(weatherData.weather.uvi || 0)}
//             </p>
//           ) : (
//             <p>Loading weather data...</p>
//           )}
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
