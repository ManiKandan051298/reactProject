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
        if (response.data.status === 1) {
          const courses = response.data.message.map(course => {
            return {
              ...course,
              status: 1
            };
          });
          setAllCourses(courses);
          console.log(allCourse)
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
    return <Navigate to="/" />;
  }

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
            <div className="course-item">
              <CourceTitle
                courceStatus={course.status}
                imageSrc={course.image_url}
                title={course.name}
                description={course.description}
                courceid={course.id}
                isLoggedIn ={isLoggedIn}
              />
            </div>
          ))}
        </div>
      )}
      {activeTab === 'enrolled' && showEnrolled && (
        <div className="course-list">
          <div className="course-item">
            <CourceTitle
              courceStatus={2}
              imageSrc="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fbrandslogos.com%2Fwp-content%2Fuploads%2Fimages%2Flarge%2Fpython-logo.png&f=1&nofb=1&ipt=ca1e9dd693cee8f8243afa2db341338fd39b225f1732ba1af02e8fd46b052f83&ipo=images"
              title="python"
              description="student"
            />
          </div>
        </div>
      )}
      {activeTab === 'completed' && showCompleted && (
        <div className="course-list">
          <div className="course-item">
            <CourceTitle
              courceStatus={3}
              imageSrc="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fbrandslogos.com%2Fwp-content%2Fuploads%2Fimages%2Flarge%2Fpython-logo.png&f=1&nofb=1&ipt=ca1e9dd693cee8f8243afa2db341338fd39b225f1732ba1af02e8fd46b052f83&ipo=images"
              title="python"
              description="student"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseListPage;
