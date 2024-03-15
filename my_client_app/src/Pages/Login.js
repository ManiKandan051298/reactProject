import React, { useState } from 'react';
import { post } from '../axiosWrapper';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import usePageTitle from './UsePageTitle'
function Login({ handleLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State variable for showing password
  const navigate = useNavigate(); // Initialize navigate function
  usePageTitle("Login")
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Display error message if username or password is empty
    if (!username || !password) {
      setErrorMessage('Username and password are required.');
      return;
    }

    try {
      const dict = {
        "username": username,
        "password": password
      };

      const responseData = await post('/login/', dict);

      if (responseData.status === 1) {
        setErrorMessage('');
        handleLogin(username);
        console.log(responseData)
        navigate('/home'); // Navigate to home page
      } else {
        setErrorMessage(responseData.message);
      }
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <div className="password-input-container">
            <input
              type={showPassword ? 'text' : 'password'} // Show password if showPassword is true
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="password-toggle-button"
              onClick={() => setShowPassword(!showPassword)} // Toggle showPassword state
            >
              {showPassword ? 'Hide password' : 'Show password'}
            </button>
          </div>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
