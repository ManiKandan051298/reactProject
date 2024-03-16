import React, { useState,useEffect } from "react";
import { Navigate } from "react-router-dom";
import "./CourseListPage.css";
import usePageTitle from "./UsePageTitle";
import CourceTitle from "./util/CourceTitle";
import { get } from '../axiosWrapper';

function CourseListPage({ isLoggedIn }) {
  const [showAvailable, setShowAvailable] = useState(true);
  const [showEnrolled, setShowEnrolled] = useState(true);
  const [showCompleted, setShowCompleted] = useState(true);
  const [allCource, setAllCourses] = useState([]);
  usePageTitle("Course List");
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await get('/topics');
        console.log(response)
        if (response.data.status === 1) {
          setAllCourses(response.data.message);
        } else {
          console.error('Failed to fetch courses:', response);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    
    fetchData();
  }, []); // Run only once when the component mounts

  // Redirect to login page if not logged in
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  

  
  return (
    <div className="course-options">
      <h2>Course List Options</h2>
      <div>
        <button onClick={() => setShowAvailable(!showAvailable)}>
          {showAvailable ? " Available Courses" : " Available Courses"}{" "}
          {showAvailable ? <span>&#9660;</span> : <span>&#9654;</span>}
        </button>
        {showAvailable && (
         <div className="course-list">
          {allCource.map(course => (
          <div className="course-item">
           <CourceTitle  courceStatus={1} imageSrc={course.image_url} title={course.name} description= {course.description} courceid = {course.id}/>
           </div>
           ))}
           </div>
        )}
      </div>
      <div>
        <button onClick={() => setShowEnrolled(!showEnrolled)}>
          {showEnrolled ? " Enrolled Courses" : " Enrolled Courses"}{" "}
          {showEnrolled ? <span>&#9660;</span> : <span>&#9654;</span>}
        </button>
        {showEnrolled && (
      <div className="course-list">
      <div className="course-item">
       <CourceTitle  courceStatus={2} imageSrc="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fbrandslogos.com%2Fwp-content%2Fuploads%2Fimages%2Flarge%2Fpython-logo.png&f=1&nofb=1&ipt=ca1e9dd693cee8f8243afa2db341338fd39b225f1732ba1af02e8fd46b052f83&ipo=images" title="python" description="student"/></div>
       </div>
        )}
      </div>
      <div>
        <button onClick={() => setShowCompleted(!showCompleted)}>
          {showCompleted ? " Completed Courses" : " Completed Courses"}{" "}
          {showCompleted ? <span>&#9660;</span> : <span>&#9654;</span>}
        </button>
        {showCompleted && (
    <div className="course-list">
    <div className="course-item">
     <CourceTitle  courceStatus={3} imageSrc="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fbrandslogos.com%2Fwp-content%2Fuploads%2Fimages%2Flarge%2Fpython-logo.png&f=1&nofb=1&ipt=ca1e9dd693cee8f8243afa2db341338fd39b225f1732ba1af02e8fd46b052f83&ipo=images" title="python" description="student"/></div>
   
     </div>
        )}
      </div>
    </div>
  );
}

export default CourseListPage;
