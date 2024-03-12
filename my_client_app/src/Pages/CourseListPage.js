import React from 'react';
// import AvailableCourse from './AvailableCourse';
// import EnrolledCourse from './EnrolledCourse';
// import CompletedCourse from './CompletedCourse';
import { Link } from 'react-router-dom';
import './CourseListPage.css'; 


function CourseListPage() {
  return (
    <div className="course-options">
      <h2>Course List Options</h2>
      <div>
        <Link to="/available" className="option-link">Available Courses</Link>
      </div>
      <div>
        <Link to="/enrolled" className="option-link">Enrolled Courses</Link>
      </div>
      <div>
        <Link to="/completed" className="option-link">Completed Courses</Link>
      </div>
    </div>
  );
}
export default CourseListPage;

