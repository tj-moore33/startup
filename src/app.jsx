import React, { useState, useEffect } from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Current } from './current/current';
import { Forecast } from './forecast/forecast';
import { World } from './world/world';
import './app.css';

export default function App() {
  const [username, setUsername] = useState('');

  // get username from localStorage 
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

    // Format the username as possessive
    const formatPossessive = (name) => {
      if (!name) return "Weather Watcher"; // default if username is empty
      return name.endsWith("s") ? `${name}'` : `${name}'s`;
    };

  return (
    <BrowserRouter>
      <div className='body bg-dark text-light'>
        <header>
        <h1><span id="username">{formatPossessive(username)}</span> Weather Watcher Page</h1>
          <nav>
            <ul>
              <li><NavLink className="nav-link active" to='login'>Home</NavLink></li>
              <li><NavLink className='nav-link' to='current'>Today</NavLink></li>
              <li><NavLink className='nav-link' to='forecast'>5-Day Forecast</NavLink></li>
              <li><NavLink className='nav-link' to='world'>The World</NavLink></li>
            </ul>
            <div className="header-buttons">
              <a href="https://github.com/tj-moore33/startup.git" target="_blank" rel="noopener noreferrer" className="github-button">GitHub</a>
            </div>
          </nav>
        </header>

        <Routes>
          <Route path='/' element={<Login />} exact />
          <Route path='/current' element={<Current />} />
          <Route path='/forecast' element={<Forecast />} />
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
