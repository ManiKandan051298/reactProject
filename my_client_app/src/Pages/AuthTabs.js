import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Login from './Login';
import Register from './Register';

function AuthTabs() {
  const [activeTab, setActiveTab] = useState('login');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <div style={{ display: 'flex', marginBottom: '20px' }}>
        <button
          style={{
            border: 'none',
            backgroundColor: activeTab === 'login' ? '#f0f0f0' : 'transparent',
            padding: '10px 20px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease'
          }}
          onClick={() => handleTabChange('login')}
        >
          Login
        </button>
        <button
          style={{
            border: 'none',
            backgroundColor: activeTab === 'register' ? '#f0f0f0' : 'transparent',
            padding: '10px 20px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease'
          }}
          onClick={() => handleTabChange('register')}
        >
          Register
        </button>
      </div>
      <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '5px', backgroundColor: '#fff' }}>
        {activeTab === 'login' ? <Login /> : <Register />}
      </div>
      <p>{activeTab === 'login' ? "Don't have an account?" : "Already have an account?"} <Link to={activeTab === 'login' ? '/register' : '/login'}>{activeTab === 'login' ? 'Register' : 'Login'}</Link></p>
    </div>
  );
}

export default AuthTabs;
