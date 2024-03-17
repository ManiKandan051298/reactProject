import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

function AuthTabs({ handleLogin, handleLogout }) {
  const [activeTab, setActiveTab] = useState('login');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const projectTitle = process.env.REACT_APP_PROJECT_TITLE; // Access the project title from environment variable

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto',justifyContent:'center' }}>
      <h2>{projectTitle}</h2> {/* Display the project title here */}
      
      <div style={{ display: 'flex', marginBottom: '20px', justifyContent: 'center' }}>
        <button
       style={{
        borderBottom: '2px solid green', // Specify border bottom with red color
        color: 'black', // Set font color to black
        padding: '10px 20px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        backgroundColor: activeTab === 'login' ? 'whitesmoke' : 'white', // Set background color based on activeTab
      }}
          onClick={() => handleTabChange('login')}
        >
          Login
        </button>
        <button
          style={{
            borderBottom: '2px solid blue', // Specify border bottom with red color
            backgroundColor: activeTab === 'register' ? 'whitesmoke' : 'white',
            padding: '10px 20px',
            color: 'black', // Set font color to black
            cursor: 'pointer',
            transition: 'background-color 0.3s ease'
          }}
          onClick={() => handleTabChange('register')}
        >
          Register
        </button>
      </div>
      <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '5px', backgroundColor: '#fff' }}>
        {activeTab === 'login' ? <Login handleLogin={handleLogin} /> : <Register />}
      </div>
    </div>
  );
}

export default AuthTabs;
