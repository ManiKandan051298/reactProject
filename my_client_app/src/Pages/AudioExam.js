import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import './CourseListPage.css'; 
import usePageTitle from './UsePageTitle';

function AudioExam({ isLoggedIn }) {
  // Redirect to login page if not logged in\
  usePageTitle('Audio Lesson')

  console.log(isLoggedIn)
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="course-options">
      <h2>AudioLession Options</h2>
      <div>
        <Link to="/available" className="option-link">Available Courses</Link>
      </div>
      <div>
        <Link to="/enrolled" className="option-link">Enrolled Courses</Link>
      </div>
      <div>
        <Link to="/completed" className="option-link">Completed Courses</Link>
      </div>
    </div>
  );
}

export default AudioExam;
