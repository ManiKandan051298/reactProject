import React, { useState } from 'react';
import {  Navigate } from 'react-router-dom';
import './Home.css';
import LiveMeeting from './LiveMeeting';
import CourseListPage from './CourseListPage';
import AudioExam from './AudioExam';
import AudioLesson from './AudioLesson';
import usePageTitle from './UsePageTitle';
import WelcomePage from './Welcome';
export default function Home({ handleLogout, isLoggedIn,tabname}) {
  const [activeTab, setActiveTab] = useState(tabname);
  usePageTitle('welcome');
  // Function to set the active tab
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const logoutActivate = () => {
    handleLogout('');
    return <Navigate to="/" />
  };

  // Redirect to login page if not logged in
  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="home-container">
      <div className="tab-container">
        <div className={`tab ${activeTab === 'Welcome' ? 'active' : ''}`} onClick={() => handleTabClick('Welcome')}>
          {/* <Link to="/" className="tab-link">Welcome</Link> */} Welcome
        </div>
        <div className={`tab ${activeTab === 'Course List' ? 'active' : ''}`} onClick={() => handleTabClick('Course List')}>
          {/* <Link to="/courselist" className="tab-link">Course List</Link> */} CourceList
        </div>
        <div className={`tab ${activeTab === 'Live Meeting' ? 'active' : ''}`} onClick={() => handleTabClick('Live Meeting')}>
          {/* <Link to="/livemeeting" className="tab-link">Live Meeting</Link> */} LiveMeeting
        </div>
        <div className={`tab ${activeTab === 'Audio Lesson' ? 'active' : ''}`} onClick={() => handleTabClick('Audio Lesson')}>
          {/* <Link to="/audiolesson" className="tab-link">Audio Lesson</Link> */} Audio Lesson
        </div>
        <div className={`tab ${activeTab === 'Audio Exam' ? 'active' : ''}`} onClick={() => handleTabClick('Audio Exam')}>
          {/* <Link to="/audioexam" className="tab-link">Audio Exam</Link> */} Audio Exam
        </div>
      </div>
      <div className="content">
        {/* Render the content based on the active tab */}
        {activeTab === 'Welcome' && (
          <WelcomePage isLoggedIn={isLoggedIn}/>
        )}

{activeTab === 'Course List' && (
          <CourseListPage  isLoggedIn={isLoggedIn}/>
        )}

{activeTab === 'Live Meeting' && (
                    <LiveMeeting isLoggedIn={isLoggedIn}/>
        )}

{activeTab === 'Audio Lesson' && (
          <AudioLesson isLoggedIn={isLoggedIn} />
        )}

{activeTab === 'Audio Exam' && (
          <AudioExam isLoggedIn={isLoggedIn} />
        )}

       
      </div>
      <div className="nav-bar">
        <button className="logout-btn" onClick={logoutActivate}>Logout</button>
      </div>
    </div>
  );
}
