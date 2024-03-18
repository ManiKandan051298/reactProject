import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import "./CourseListPage.css";
import usePageTitle from "./UsePageTitle";
import CourceTitle from "./util/CourseTitle";
import { get } from '../axiosWrapper';

function CourseListPage({ isLoggedIn }) {
  const [showAvailable, setShowAvailable] = useState(true);
  const [showEnrolled, setShowEnrolled] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);
  const [allCourse, setAllCourses] = useState([]);
  const [activeTab, setActiveTab] = useState('available');
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [enrolledCourseId, setEnrolledCourseId] = useState(null);
  usePageTitle("Course List");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await get('/topics');
        console.log(response)
        if (response.data.status === 1) {
          setAllCourses(response.data.message.map(course => ({
            ...course,
            status: 1
          })));
        } else {
          console.error('Failed to fetch courses:', response);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    // Refresh the active tab whenever allCourse changes
    switch (activeTab) {
      case 'available':
        setShowAvailable(true);
        setShowEnrolled(false);
        setShowCompleted(false);
        break;
      case 'enrolled':
        setShowAvailable(false);
        setShowEnrolled(true);
        setShowCompleted(false);
        break;
      case 'completed':
        setShowAvailable(false);
        setShowEnrolled(false);
        setShowCompleted(true);
        break;
      default:
        break;
    }
    console.log(activeTab)
  }, [allCourse]); // Re-run effect whenever allCourse changes

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  const handleEnroll = (courseId) => {
    // Logic to handle enrollment
    setAllCourses(allCourse.map(course =>
      course.id === courseId ? { ...course, enrolled: true } : course
    ));
    setEnrolledCourseId(courseId);
    setEnrollModalOpen(true);
    console.log("Enrolled in course with ID:", courseId);
  };

  const closeModal = () => {
    setEnrollModalOpen(false);
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
      {allCourse.length > 0 && (
        <>
          {activeTab === 'available' && showAvailable && (
            <div className="course-list">
              {allCourse.filter(course => course.status === 1).length > 0 ? (
                allCourse.map(course =>
                  course.status === 1 ? (
                    <div className="course-item" key={course.id}>
                      <CourceTitle
                        allCourse={allCourse} setAllCourses={setAllCourses}
                        courceStatus={course.status}
                        imageSrc={course.image_url}
                        title={course.name}
                        description={course.description}
                        courceid={course.id}
                        handleEnroll={handleEnroll} // Pass handleEnroll function to CourceTitle component
                      />
                    </div>
                  ) : null
                )
              ) : (
                <div style={{ textAlign: "center" }} > <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpurepng.com%2Fpublic%2Fuploads%2Fmedium%2Fpurepng.com-recycle-binrecycle-bincomputer-recyclebindustbinrecycleempty-1421526586123phutm.png&f=1&nofb=1&ipt=f09ec70a71626338bf877745d85da9aca26d25ef3f917360cecd4d818c757be8&ipo=images" style={{ width: '100px', height: '100px', marginTop: 100 }} alt="Empty Bin" />
                  <p style={{ textAlign: "center", color: 'blue', marginTop: 30 }}>No completed courses found</p>
                </div>
              )}
            </div>
          )}
          {activeTab === 'enrolled' && showEnrolled && (
            <div className="course-list">
              {allCourse.filter(course => course.status === 2).length > 0 ? (
                allCourse.map(course =>
                  course.status === 2 ? (
                    <div className="course-item" key={course.id}>
                      <CourceTitle
                        allCourse={allCourse} setAllCourses={setAllCourses}
                        courceStatus={course.status}
                        imageSrc={course.image_url}
                        title={course.name}
                        description={course.description}
                        courceid={course.id}
                      />
                    </div>
                  ) : null
                )
              ) : (
                <div style={{ textAlign: "center" }} > <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpurepng.com%2Fpublic%2Fuploads%2Fmedium%2Fpurepng.com-recycle-binrecycle-bincomputer-recyclebindustbinrecycleempty-1421526586123phutm.png&f=1&nofb=1&ipt=f09ec70a71626338bf877745d85da9aca26d25ef3f917360cecd4d818c757be8&ipo=images" style={{ width: '100px', height: '100px', marginTop: 100 }} alt="Empty Bin" />
                  <p style={{ textAlign: "center", color: 'blue', marginTop: 30 }}>No completed courses found</p>
                </div>
              )}
            </div>
          )}
          {activeTab === 'completed' && showCompleted && (
            <div className="course-list">
              {allCourse.filter(course => course.status === 3).length > 0 ? (
                allCourse.map(course =>
                  course.status === 3 ? (
                    <div className="course-item" key={course.id}>
                      <CourceTitle
                        allCourse={allCourse} setAllCourses={setAllCourses}
                        courceStatus={course.status}
                        imageSrc={course.image_url}
                        title={course.name}
                        description={course.description}
                        courceid={course.id}
                      />
                    </div>
                  ) : null
                )
              ) : (
                <div style={{ textAlign: "center" }} > <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpurepng.com%2Fpublic%2Fuploads%2Fmedium%2Fpurepng.com-recycle-binrecycle-bincomputer-recyclebindustbinrecycleempty-1421526586123phutm.png&f=1&nofb=1&ipt=f09ec70a71626338bf877745d85da9aca26d25ef3f917360cecd4d818c757be8&ipo=images" style={{ width: '100px', height: '100px', marginTop: 100 }} alt="Empty Bin" />
                  <p style={{ textAlign: "center", color: 'blue', marginTop: 30 }}>No completed courses found</p>
                </div>
              )}
            </div>
          )}
        </>
      )}
      {/* Enrollment Modal */}
      {enrollModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-content">
              <p>You have successfully enrolled in the course!</p>
            </div>
            <div className="modal-actions">
              <button onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseListPage;
