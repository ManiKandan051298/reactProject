import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CourseListPage.css'; 
import usePageTitle from './UsePageTitle';
import './Welcome.css'; 

function WelcomePage({ isLoggedIn }) {
  const navigate = useNavigate();
  const [currentBox, setCurrentBox] = useState(0);

  // Set page title
  usePageTitle("Welcome ");

  // Redirect to login page if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

 

  const handleNextClick = () => {
    setCurrentBox(prevBox => prevBox === 2 ? 0 : prevBox + 1); // Loop back to Welcome box after Contact Us box
  };

  return (
    <div>
      <h2 id="loggedUse">Hey {isLoggedIn},</h2>

      <div className="rotating-container">
        <div className={`box welcome ${currentBox === 0 ? 'active' : ''}`}>
          <div className="box-content">
            <p><span className="welcome-text"><h3>Welcome</h3></span> to our Application!</p>
            <p>This application is designed to provide you with a seamless learning experience.</p>
            <p>Explore our courses, join live meetings, and take audio lessons and exams.</p>
          </div>
          <div className="icon-container">
            <button onClick={handleNextClick}>Next</button>
          </div>
        </div>
        <div className={`box about-us ${currentBox === 1 ? 'active' : ''}`}>
          <div className="box-content">
            <h3><span className="about-us-text">About Us</span></h3>
            <p>We are dedicated to helping individuals reach new heights by providing accessible education.</p>
            {/* Add more about us text as needed */}
          </div>
          <div className="icon-container">
            <button onClick={handleNextClick}>Next</button>
          </div>
        </div>
        <div className={`box contact-us ${currentBox === 2 ? 'active' : ''}`}>
          <div className="box-content">
            <h3><span className="contact-us-text">Contact Us</span></h3>
            <p>For any queries or assistance, feel free to reach out to us at example@example.com</p>
            {/* Add more contact details or form as needed */}
          </div>
          <div className="icon-container">
            <button onClick={handleNextClick}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
