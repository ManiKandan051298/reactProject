import React, { useState } from 'react';
import './CourseTitle.css'; // Import CSS file for styling

function CourseTitle({ imageSrc, title, description, courceStatus }) {
  const [courceStatusid, setcourceStatusid] = useState(courceStatus);

  const handleEnroll = () => {
    console.log("enrolled cource")
    setcourceStatusid(2);
  };

  const handleRemoveEnroll = () => {
    setcourceStatusid(1);
  };

  const handleComplete = () => {
    setcourceStatusid(3);
  };

  const handleInComplete = () => {
    setcourceStatusid(2);
  };

  return (
    <div className="course-card">
      <img src={imageSrc} alt={title} className="course-image" style={{ maxWidth: '100%', height: 'auto' }} />
      <div className="course-details">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className="buttons">
        {courceStatusid === 1 && (
          <button onClick={handleEnroll}>Add to Enroll</button>
        )}
        {courceStatusid === 2 && (
          <>
            <button onClick={handleRemoveEnroll}>Remove Enroll</button>
            <button onClick={handleComplete}>Mark as Complete</button>
          </>
        )}
        {courceStatusid === 3 && (
          <button onClick={handleInComplete}>Mark as Incomplete</button>
        )}
      </div>
    </div>
  );
}

export default CourseTitle;
