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
    <div style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
      <h2>{projectTitle}</h2> {/* Display the project title here */}

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <button
          style={{
            border: 'none',
            borderBottom: activeTab === 'login' ? '2px solid green' : 'none',
            backgroundColor: 'transparent',
            color: activeTab === 'login' ? 'green' : 'black',
            padding: '10px 20px',
            cursor: 'pointer',
            transition: 'border-color 0.3s, color 0.3s'
          }}
          onClick={() => handleTabChange('login')}
        >
          Login
        </button>
        <button
          style={{
            border: 'none',
            borderBottom: activeTab === 'register' ? '2px solid blue' : 'none',
            backgroundColor: 'transparent',
            color: activeTab === 'register' ? 'blue' : 'black',
            padding: '10px 20px',
            cursor: 'pointer',
            transition: 'border-color 0.3s, color 0.3s'
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
