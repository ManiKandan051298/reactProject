import React, { useState } from 'react';
import { post } from '../axiosWrapper';
import './Register.css'; 

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    // Display error message if any field is empty
    if (!username || !password || !confirmPassword || !email) {
      setErrorMessage('All fields are required.');
      setShowModal(true);
    } else if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      setShowModal(true);
    } else {
        const data = {
            "username": username,
            "password": password,
            "email": email
          }

      try {
        // Replace this with your actual registration endpoint
        const responseData = await post('/register/', data);

        if (responseData.status === 0) {
          setErrorMessage(responseData.message.email);
          setShowModal(true);
        } else {
          // Registration successful, you can redirect the user or show a success message
          setSuccessMessage('Registration successful');
          setShowModal(true);
          console.log('Registration successful:', responseData);
        }
      } catch (error) {
        console.error('Error registering:', error);
      }
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <div onSubmit={handleSubmit}>
        <div className="register-form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="register-form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="register-form-group">
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="register-form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="button" className="register-button" onClick={handleSubmit}>Register</button>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <p onClick={() => setShowModal(false)} className="skip-text">Skip</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;
