import React, { useState,useEffect }  from 'react';
import { Link, Navigate } from 'react-router-dom';
import './CourseListPage.css'; 
import usePageTitle from './UsePageTitle';
import QuestionAndChoices from './AudioExam/QuestionAndChoices';
import { get } from '../axiosWrapper';
function AudioExam({ isLoggedIn }) {
  // Redirect to login page if not logged in\
  usePageTitle('Audio Lesson')
  const [allQuestions, setAllQuestions] = useState([]);
  usePageTitle("Course List");
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await get('/choices');
        console.log(response)
        if (response.data.status === 1) {
          console.log(response.data.message)
          await setAllQuestions(response.data.message);
          console.log(allQuestions)
          const sortedQuestions = allQuestions.sort((a, b) => a.question.id - b.question.id);
setAllQuestions(sortedQuestions);
console.log(allQuestions)
        } else {
          console.error('Failed to fetch courses:', response);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    
    fetchData();
  }, []); // Run only once when the component mounts

  console.log(isLoggedIn)
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="course-options">
      {allQuestions.map(question => (
        <QuestionAndChoices key={question.id} question={question} />
      ))}
    </div>
  );
}

export default AudioExam;
