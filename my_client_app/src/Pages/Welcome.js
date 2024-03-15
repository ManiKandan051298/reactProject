import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CourseListPage.css'; 
import usePageTitle from './UsePageTitle';

function WelcomePage({ isLoggedIn }) {
  const navigate = useNavigate();

  // Redirect to login page if not logged in\
  usePageTitle("Welcome ");
  console.log(isLoggedIn)
  if (!isLoggedIn) {
    navigate('/login');
  }

  return (
    <div className="welcome-page">
    <h1>Welcome {isLoggedIn},to our Application!</h1>
    <p>This application is designed to provide you with a seamless learning experience.</p>
    <p>Explore our courses, join live meetings, and take audio lessons and exams.</p>
    {/* Add more introductory text as needed */}
  </div>
  );
}

export default WelcomePage;
