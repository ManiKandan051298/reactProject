import React, { useState } from 'react';
import { post } from '../axiosWrapper';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate hook

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Initialize navigate function

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
        onLogin(username);
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
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>Create an account? <Link to="/register">register</Link></p>
    </div>
  );
}

export default Login;
