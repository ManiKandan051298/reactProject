import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import CourseListPage from './CourseListPage';


// Main Component
export default function Home() {
  const [activeTab, setActiveTab] = useState(null);

  // Function to set the active tab
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="home-container">
      <h1>Welcome to Home Page</h1>
      <div className="tab-container">
        <Link to="/courselist" className="tab" onClick={() => handleTabClick('Course List')}>Course List</Link>
        <Link to="/livemeeting" className="tab" onClick={() => handleTabClick('Live Meeting')}>Live Meeting</Link>
        <Link to="/audiolesson" className="tab" onClick={() => handleTabClick('Audio Lesson')}>Audio Lesson</Link>
        <Link to="/audioexam" className="tab" onClick={() => handleTabClick('Audio Exam')}>Audio Exam</Link>
      </div>
      {/* Render the selected tab */}
      {activeTab === 'Course List' && <CourseListPage/>}
    </div>
  );
}
