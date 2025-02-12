import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return (
  <div className='body bg-dark text-light'>
      <header>
           {/* This will populate with the entered username*/}
          <h1><span id="username">Weather Watcher</span>'s Weather Page</h1>
          <nav>
              <ul>
                  <li><a href="../current/current.html">Today</a></li>
                  <li><a href="../forecast/forecast.html">5-day Forecast</a></li>
                  <li><a href="../world/world.html">The World</a></li>
              </ul>
              <div className="header-buttons">
                  <a href="https://github.com/tj-moore33/startup.git" target="_blank" rel="noopener noreferrer" class="github-button">GitHub</a>
                  <form className="logout-container" action="../login/login.html">
                      <input type="submit" value="Logout" class="logout-button"/>
                  </form>
              </div>
            </nav>
      </header>

        <main> App will display here </main>

      <footer>
          <p>&copy; 2025 Thomas Moore. All Rights Reserved</p>
      </footer>
  </div>
    );
}