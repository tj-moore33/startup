import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Current } from './current/current';
import { Forecast } from './forecast/forecast';
import { World } from './world/world';

export default function App() {
  return (

    <BrowserRouter>
  <div className='body bg-dark text-light'>
      <header>
           {/* This will populate with the entered username*/}
          <h1><span id="username">Weather Watcher</span>'s</h1>
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
            <Route path='/login' element={<Login />} exact />
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
