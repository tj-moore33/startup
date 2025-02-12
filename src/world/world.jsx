import React from 'react';
import '../app.css'

export function World() {
  return (
    <main className='container-fluid bg-secondary text-center'>
    {/* <!-- Im gonna change this to be weather around the world when I add JS --> */}
    <div class="box" id="friends">
        <span class="bold-text">Your Friends</span>
        <p>
            {/* <!-- placeholder for WedSocket --> */}
            <strong>John:</strong> Viewed - Anchorage, AL<br/>
            <strong>Caio:</strong> Viewed - Atlanta, GA<br/>
            <strong>Jaeli:</strong> Viewed - Rochester, NY<br/>
            <strong>Harrison:</strong> Viewed - Richmond, VA<br/>
        </p>
    </div>
    </main>
  );
}