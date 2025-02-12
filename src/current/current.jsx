import React from 'react';
import './current.css';

export function Current() {
  return (
    <main className='container-fluid bg-secondary text-center'>
          <div class="box">
        <span class="bold-text">Find Your Weather</span>
        <br/>

        {/* <!-- I'll use JS to have the cities sort based off of what state is selected --> */}
        <label for="stateDropdown">Select State:</label>
        <select id="stateDropdown" name="dropdown" aria-label="Select State">
            <option value="0">--</option>
            <option value="Alaska">Alaska</option>
            <option value="Georgia">Georgia</option>
            <option value="New York">New York</option>
            <option value="Virginia">Virginia</option>
        </select>
        <br/><br/>

        <label for="cityDropdown">Select City:</label>
        <select id="cityDropdown" name="cityDropdown" aria-label="Select City">
            <option value="0">--</option>
            <option value="Anchorage">Anchorage</option>
            <option value="Atlanta">Atlanta</option>
            <option value="Rochester">Rochester</option>
            <option value="Richmond">Richmond</option>
        </select>
    </div>
    <div class="box" id="temperature">
        <span class="bold-text">Current Weather</span>
        <p>
            {/* <!-- this data will come from my 3rd party API -->
            <!-- This is all placeholder data --> */}
            <strong>City:</strong> Atlanta<br/>
            <strong>Date:</strong> 1/27/25 <br/>
            <strong>Temperature:</strong> 43°F<br/>
            <strong>Wind Speed:</strong> 8 mph<br/>
            <strong>Humidity:</strong> 82%<br/>
            <strong>UV Index:</strong> 0.4
        </p>
    </div>
    <div class="box">
        {/* <!-- this will have options for multiple metrics, temp, humidity, wind, etc --> */}
        {/* <!-- this data will come from my DB --> */}
        <span class="bold-text">Temperature</span>
        <br/>
        <img src="../images/Graph placeholder.png" alt="placeholder graph"/>
    </div>
    </main>
  );
}