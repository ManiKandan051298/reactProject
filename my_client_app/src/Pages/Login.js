import React, { useState } from 'react';
import { post } from '../axiosWrapper';
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
   
    // Display error message if username or password is empty
    if (!username || !password) {
      setErrorMessage('Username and password are required.');
    } else {
      async function fetchData() {
        const dict = {
          "username": username,
          "password": password
        }
        console.log(dict)
        try {
          const responseData = await post('/login/',dict);
          console.log(responseData)
          if(parseInt(responseData.status) === parseInt(0) ){
            setErrorMessage(responseData.message)
          }
          if(responseData.status === parseInt(1)){
            setErrorMessage(responseData.message)
          }
        } catch (error) {
          console.error('Error fetching data:', error.message);
        }
      }
      fetchData()
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
    </div>
  );
}

export default Login;
