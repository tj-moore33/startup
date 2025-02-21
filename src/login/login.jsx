import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../app.css';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    if (!username.trim() || !password.trim()) {
      setError('Username and password are required.');
      return;
    }

    // Store the username and simulate login
    localStorage.setItem('userToken', 'mock-auth-token');
    localStorage.setItem('username', username); // Store the username
    
    navigate('/current'); // Redirect after login
  }

  return (
    <main className='container-fluid bg-secondary text-center'>
      <div className="login-wrapper">
        <h2 className="login-header">Welcome Weather Watchers!</h2>
        
        {error && <p className="error-message">{error}</p>}

        <form className="login-container" onSubmit={handleSubmit}>
          <p>
            <input 
              type="text" 
              placeholder="Username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required
            />
          </p>
          <p>
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required
            />
          </p>
          <p><input type="submit" value="Login" /></p>
        </form>
        
        <p className="tagline">Wind, rain, or warmth, we've got you!</p>
      </div>
    </main>
  );
}
