import React, { useState,useEffect } from 'react';
import './CourseTitle.css'; // Import CSS file for styling

function CourseTitle({ imageSrc, title, description, courceStatus,courceid,isLoggedIn }) {
  const [courceStatusid, setcourceStatusid] = useState(courceStatus);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (errorMessage) {
        alert(errorMessage);
    }
}, [errorMessage]);

const handleEnroll = (courseId, title) => {
  const errorMessage = "Enrolled Success :  Cource ID is " + courseId + ", Title is " + title;
  setErrorMessage(errorMessage);
  setcourceStatusid(2);
};


  const handleComplete = (courseId,title) => {
    const errorMessage = "Cource Completed Success :  Cource ID is " + courseId + ", Title is " + title;

    setErrorMessage(errorMessage);
    setcourceStatusid(3);
    // cource completed 
  };

  const handleCertificate = (courseId,title) => {
    const errorMessage = "Get Certificate  Success :  Cource ID is " + courseId + ", Title is " + title;

    setErrorMessage(errorMessage);

    // certificate pop up
  };

  return (
    <div className="course-card">
      <img src={imageSrc} alt={title} className="course-image"  />
      <div className="course-details">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className="buttons">
        {courceStatusid === 1 && (
          <button onClick={() => handleEnroll(courceid,title)}>Add to Enroll</button>
        )}
        {courceStatusid === 2 && (
          <>
            <button onClick={()=>handleComplete(courceid,title)}>Mark as Complete</button>
          </>
        )}
        {courceStatusid === 3 && (
          <button onClick={()=>handleCertificate(courceid,title)}>Get Certificate</button>
        )}
      </div>
    </div>
  );
}

export default CourseTitle;
