// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../app.css';

// export function Login({ setUsername }) {
//   const [localUsername, setLocalUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   function handleSubmit(event) {
//     event.preventDefault();

//     if (!localUsername.trim() || !password.trim()) {
//       setError('Username and password are required.');
//       return;
//     }

//     //store username and simulate login
//     localStorage.setItem('userToken', 'mock-auth-token');
//     localStorage.setItem('username', localUsername);
//     setUsername(username); 

//     navigate('/current'); //redirect after login
//   }

//   return (
//     <main className='container-fluid bg-secondary text-center'>
//       <div className="login-wrapper">
//         <h2 className="login-header">Welcome Weather Watchers!</h2>
        
//         {error && <p className="error-message">{error}</p>}

//         <form className="login-container" onSubmit={handleSubmit}>
//           <p>
//             <input 
//               type="text" 
//               placeholder="Username" 
//               value={localUsername} 
//               onChange={(e) => setLocalUsername(e.target.value)} 
//               required
//             />
//           </p>
//           <p>
//             <input 
//               type="password" 
//               placeholder="Password" 
//               value={password} 
//               onChange={(e) => setPassword(e.target.value)} 
//               required
//             />
//           </p>
//           <p><input type="submit" value="Login" /></p>
//         </form>
        
//         <p className="tagline">Wind, rain, or warmth, we've got you!</p>
//       </div>
//     </main>
//   );
// }



// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../app.css';
// import { AuthState } from './authState'; // Assuming you have an AuthState enum

// export function Login({ userName, authState, onAuthChange }) {
//   const [localUsername, setLocalUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   // Handle account creation
//   const handleCreateAccount = async () => {
//     const response = await fetch('/api/auth/create', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email: localUsername, password }),
//     });

//     if (response.ok) {
//       // Log the user in after successful registration or login
//       localStorage.setItem('userToken', 'mock-auth-token');
//       onAuthChange(localUsername, AuthState.Authenticated);
//       navigate('/current');
//     } else {
//       const data = await response.json();
//       setError(data.msg || 'Account creation failed.');
//     }
//   };

//   // Handle login
//   const handleLogin = async () => {
//     const response = await fetch('/api/auth/login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email: localUsername, password }),
//     });

//     if (response.ok) {
//       // Log the user in
//       localStorage.setItem('userToken', 'mock-auth-token');
//       onAuthChange(localUsername, AuthState.Authenticated);
//       navigate('/current');
//     } else {
//       const data = await response.json();
//       setError(data.msg || 'Invalid username or password.');
//     }
//   };

//   // Handle logout
//   const handleLogout = () => {
//     localStorage.removeItem('userToken');
//     onAuthChange('', AuthState.Unauthenticated);
//   };

//   return (
//     <main className='container-fluid bg-secondary text-center'>
//       <div className="login-wrapper">
//         {authState !== AuthState.Unknown && <h2 className="login-header">Welcome Weather Watchers!</h2>}

//         {authState === AuthState.Authenticated ? (
//           <div>
//             <p>Welcome back, {userName}!</p>
//             <button onClick={handleLogout}>Logout</button>
//           </div>
//         ) : (
//           <>
//             {error && <p className="error-message">{error}</p>}

//             <div className="login-container">
//               <p>
//                 <input
//                   type="text"
//                   placeholder="Username"
//                   value={localUsername}
//                   onChange={(e) => setLocalUsername(e.target.value)}
//                   required
//                 />
//               </p>
//               <p>
//                 <input
//                   type="password"
//                   placeholder="Password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//               </p>
//               <p>
//                 <button onClick={handleLogin}>Login</button>
//                 <button onClick={handleCreateAccount}>Create Account</button>
//               </p>
//             </div>
//           </>
//         )}

//         <p className="tagline">Wind, rain, or warmth, we've got you!</p>
//       </div>
//     </main>
//   );
// }


import React from 'react';
import '../app.css';

import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './authenticated';
import { AuthState } from './authState';

export function Login({ userName, authState, onAuthChange }) {
  return (
    <main className='container-fluid bg-secondary text-center'>
      <div>
        {authState !== AuthState.Unknown && <h1>Welcome Weather Watchers</h1>}
        {authState === AuthState.Authenticated && (
          <Authenticated userName={userName} onLogout={() => onAuthChange(userName, AuthState.Unauthenticated)} />
        )}
        {authState === AuthState.Unauthenticated && (
          <Unauthenticated
            userName={userName}
            onLogin={(loginUserName) => {
              onAuthChange(loginUserName, AuthState.Authenticated);
            }}
          />
        )}
      </div>
    </main>
  );
}
