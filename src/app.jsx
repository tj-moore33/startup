import React, { useState, useEffect } from 'react';
import { BrowserRouter, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import { Login } from './login/login';
import { Current } from './current/current';
import { Forecast } from './forecast/forecast';
import { World } from './world/world';
import { useLocation } from 'react-router-dom';
import './app.css';
import './forecast/forecast.css';

function LogoutButton({ setUsername }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // clears all stored data (username, state, city)
    setUsername(''); // clears username from state
    navigate('/'); // redirect to login page
    window.location.reload(); // ensures UI fully resets
  };

  return (
    <button className="logout-button" onClick={handleLogout}>
      Logout
    </button>
  );
}

export default function App() {
  const [username, setUsername] = useState('');

  // Shared weather state between Current.js and Forecast.js
  const [weatherData, setWeatherData] = useState({
    temperature: 0,
    windSpeed: 0,
    humidity: 0,
    uvIndex: 0,
    weatherType: 'Sunny' // Default
  });

  // Generate random weather data
  const generateRandomWeather = () => {
    const weatherTypes = ["Sunny", "Cloudy", "Rainy", "Snowy", "Stormy"];
    return {
      temperature: (Math.random() * (100 - 30) + 30).toFixed(1),
      windSpeed: (Math.random() * (25 - 1) + 1).toFixed(1),
      humidity: Math.floor(Math.random() * (100 - 20) + 20),
      uvIndex: (Math.random() * (11 - 0) + 0).toFixed(1),
      weatherType: weatherTypes[Math.floor(Math.random() * weatherTypes.length)] 
    };
  };

  const updateWeather = () => {
    setWeatherData(generateRandomWeather());
  };

  // Get username from localStorage on page load
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  // Possessive format for username
  const formatPossessive = (name) => {
    if (!name || typeof name !=='string') return "";
    return name.endsWith("s") ? `${name}'` : `${name}'s`;
  };

  return (
    <BrowserRouter>
      <div className='body bg-dark text-light'>
        <header>
          <h1><span id="username">{formatPossessive(username)}</span> Weather Watcher Page</h1>
          <nav>
            <ul>
              <li><NavLink className='nav-link' to='/current'>Today</NavLink></li>
              <li><NavLink className='nav-link' to='/forecast'>5-Day Forecast</NavLink></li>
              <li><NavLink className='nav-link' to='/world'>The World</NavLink></li>
            </ul>
            <div className="header-buttons">
              <a href="https://github.com/tj-moore33/startup.git" target="_blank" rel="noopener noreferrer" className="github-button">GitHub</a>
              <LogoutButton setUsername={setUsername} />
            </div>
          </nav>
        </header>

        <Routes>
          <Route path='/' element={<Login setUsername={setUsername} />} exact />
          <Route path='/current' element={<Current weatherData={weatherData} updateWeather={updateWeather} />} />
          <Route path='/forecast' element={<Forecast weatherData={weatherData} />} />
          <Route path='/world' element={<World />} />
          <Route path='*' element={<NotFound />} />
        </Routes>

        <footer>
          <p>&copy; 2025 Thomas Moore. All Rights Reserved</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}

