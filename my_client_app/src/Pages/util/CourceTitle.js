import React, { useState } from 'react';
import './CourseTitle.css'; // Import CSS file for styling

function CourseTitle({ imageSrc, title, description, courceStatus }) {
  const [courceStatusid, setcourceStatusid] = useState(courceStatus);
  const [showPopup, setShowPopup] = useState(false);

  const handleEnroll = () => {
    console.log("enrolled course")
    setcourceStatusid(2);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="course-card">
      <img src={imageSrc} alt={title} className="course-image" />
      <div className="course-details">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className="buttons">
        {courceStatusid === 1 && (
          <button onClick={handleEnroll}>Add to Enroll</button>
        )}
        {courceStatusid === 2 && (
          <button className="enrolled-button">Enrolled</button>
        )}
      </div>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>Course enrolled successfully!</p>
            <button onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseTitle;
