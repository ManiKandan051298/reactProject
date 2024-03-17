import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import "./CourseListPage.css";
import usePageTitle from "./UsePageTitle";
import CourceTitle from "./util/CourceTitle";
import { get } from '../axiosWrapper';

function CourseListPage({ isLoggedIn }) {
  const [showAvailable, setShowAvailable] = useState(true);
  const [showEnrolled, setShowEnrolled] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);
  const [allCourse, setAllCourses] = useState([]);
  const [activeTab, setActiveTab] = useState('available');
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
  }, []);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  const handleEnroll = (courseId) => {
    // Logic to handle enrollment
    console.log("Enrolled in course with ID:", courseId);
  };

  return (
    <div className="course-options">
      <div className="main-tab">
        <h2>Course List Options</h2>
      </div>
      <div className="option-tabs">
        <span
          className={activeTab === 'available' ? 'active' : ''}
          onClick={() => {
            setShowAvailable(true);
            setShowEnrolled(false);
            setShowCompleted(false);
            setActiveTab('available');
          }}
        >
          Available Courses
        </span>
        <span
          className={activeTab === 'enrolled' ? 'active' : ''}
          onClick={() => {
            setShowAvailable(false);
            setShowEnrolled(true);
            setShowCompleted(false);
            setActiveTab('enrolled');
          }}
        >
          Enrolled Courses
        </span>
        <span
          className={activeTab === 'completed' ? 'active' : ''}
          onClick={() => {
            setShowAvailable(false);
            setShowEnrolled(false);
            setShowCompleted(true);
            setActiveTab('completed');
          }}
        >
          Completed Courses
        </span>
      </div>
      {activeTab === 'available' && showAvailable && (
        <div className="course-list">
          {allCourse.map(course => (
            <div className="course-item" key={course.id}>
              <CourceTitle
                courceStatus={1}
                imageSrc={course.image_url}
                title={course.name}
                description={course.description}
                courceid={course.id}
                actionButton={
                  <button onClick={() => handleEnroll(course.id)}>
                    Add to Enroll
                  </button>
                }
              />
            </div>
          ))}
        </div>
      )}
      {activeTab === 'enrolled' && showEnrolled && (
        <div className="course-list">
          {allCourse.map(course => (
            <div className="course-item" key={course.id}>
              <CourceTitle
                courceStatus={2}
                imageSrc={course.image_url}
                title={course.name}
                description={course.description}
                courceid={course.id}
              />
            </div>
          ))}
        </div>
      )}
      {activeTab === 'completed' && showCompleted && (
        <div className="course-list">
          {allCourse.map(course => (
            <div className="course-item" key={course.id}>
              <CourceTitle
                courceStatus={3}
                imageSrc={course.image_url}
                title={course.name}
                description={course.description}
                courceid={course.id}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CourseListPage;
