import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../app.css';

export function Authenticated({ userName, onLogout }) {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  async function logout() {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'DELETE',
      });

      if (!response.ok) {
        // Handle logout failure (e.g., unauthorized or server error)
        setError('Logout failed. Please try again.');
        return;
      }

      // Logout successful
      localStorage.removeItem('userToken'); // Clear the authentication token
      localStorage.removeItem('userName'); // Clear the username
      onLogout(); // Update the authentication state in the parent component
    } catch (error) {
      // Handle network errors (e.g., offline)
      setError('Logout failed. You may be offline.');
    }
  }

  return (
    <div>
      {/* Display the authenticated user's name */}
      <div className='playerName'>Welcome, {userName}!</div>

      {/* Display error messages */}
      {error && <p className="error-message">{error}</p>}

      {/* Play button (protected feature) */}
      <Button variant='primary' onClick={() => navigate('/play')}>
        Play
      </Button>

      {/* Logout button */}
      <Button variant='secondary' onClick={logout}>
        Logout
      </Button>
    </div>
  );
}