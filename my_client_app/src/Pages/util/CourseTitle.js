import React, { useState, useEffect } from 'react';
import './CourseTitle.css'; // Import CSS file for styling


function UseDelay(ms) {
  const [isDelayed, setIsDelayed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDelayed(true);
    }, ms);

    // Clean-up function to clear the timer
    return () => clearTimeout(timer);
  }, [ms]);

  return isDelayed;
}

function CourseTitle({ imageSrc, title, description, courceStatus, courceid, isLoggedIn, allCourse, setAllCourses }) {
  const [courceStatusid, setcourceStatusid] = useState(courceStatus);
  const [showModal, setShowModal] = useState(false);
  // const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState('');




  const handleEnroll = (courseId, title) => {
    const errorMessage = "Enrolled Success :  Cource ID is " + courseId + ", Title is " + title;

    if (window.confirm(errorMessage)) {
      setSuccessMessage(errorMessage);
      setShowModal(true);
      setcourceStatusid(2);
      setAllCourses(allCourse.map(course =>
        course.id === courceid ? { ...course, status: 2 } : course
      ));
    }
  };


  const handleComplete = (courseId, title) => {
    const errorMessage = "Cource Completed Success :  Cource ID is " + courseId + ", Title is " + title;
    if (window.confirm(errorMessage )) {
      setSuccessMessage(errorMessage);
      setcourceStatusid(3);
      setShowModal(true);
      setAllCourses(allCourse.map(course =>
        course.id === courceid ? { ...course, status: 3 } : course
      ));
    }
    // cource completed 
  };

  const handleCertificate = (courseId, title) => {
    const errorMessage = "Your Certificate Available In Your Email :  Cource ID is " + courseId + ", Title is " + title;
    setSuccessMessage(errorMessage);
    setShowModal(true);
    // certificate pop up
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
          <button onClick={() => handleEnroll(courceid, title)}>Add to Enroll</button>
        )}
        {courceStatusid === 2 && (
          <>
            <button onClick={() => handleComplete(courceid, title)}>Mark as Complete</button>
          </>
        )}
        {courceStatusid === 3 && (
          <button onClick={() => handleCertificate(courceid, title)}>Get Certificate</button>
        )}
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseTitle;
