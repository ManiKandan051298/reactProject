// Home.js
import React, {useState } from 'react';
import {Link } from 'react-router-dom'; 
import './Home.css';
import CourseListPage from './CourseListPage';

// Main Component
export default function Home() {
  const [activeTab, setActiveTab] = useState('Welcome');

  // Function to set the active tab
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

 
return (
    <div className="home-container">
      <div className="tab-container">
        <div className={`tab ${activeTab === 'Welcome' ? 'active' : ''}`} onClick={() => handleTabClick('Welcome')}>
          <Link to="/" className="tab-link">Welcome</Link>
        </div>
        <div className={`tab ${activeTab === 'Course List' ? 'active' : ''}`} onClick={() => handleTabClick('Course List')}>
          <Link to="/courselist" className="tab-link">Course List</Link>
        </div>
        <div className={`tab ${activeTab === 'Live Meeting' ? 'active' : ''}`} onClick={() => handleTabClick('Live Meeting')}>
          <Link to="/livemeeting" className="tab-link">Live Meeting</Link>
        </div>
        <div className={`tab ${activeTab === 'Audio Lesson' ? 'active' : ''}`} onClick={() => handleTabClick('Audio Lesson')}>
          <Link to="/audiolesson" className="tab-link">Audio Lesson</Link>
        </div>
        <div className={`tab ${activeTab === 'Audio Exam' ? 'active' : ''}`} onClick={() => handleTabClick('Audio Exam')}>
          <Link to="/audioexam" className="tab-link">Audio Exam</Link>
        </div>
      </div>
      <div className="content">
        {/* Render the content based on the active tab */}
        {activeTab === 'Welcome' && (
          <div className="welcome-page">
            <h1>Welcome to our Application!</h1>
            <p>This application is designed to provide you with a seamless learning experience.</p>
            <p>Explore our courses, join live meetings, and take audio lessons and exams.</p>
            {/* Add more introductory text as needed */}
          </div>
        )}
        {activeTab === 'Course List' && <CourseListPage />}
        {/* Add components for other tabs as needed */}
      </div>
      <div className="nav-bar">
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}
