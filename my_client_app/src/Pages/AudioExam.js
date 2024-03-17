import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import './CourseListPage.css';
import usePageTitle from './UsePageTitle';
import { get } from '../axiosWrapper';
import './AudioExam.css';

function AudioExam({ isLoggedIn }) {
  usePageTitle('Audio Lesson');
  const [allQuestions, setAllQuestions] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await get('/questions');
        if (response.data.status === 1) {
          setAllQuestions(response.data.message);
        } else {
          console.error('Failed to fetch courses:', response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    
    fetchData();
  }, []); // Run only once when the component mounts

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="question-list">
      {allQuestions.map((question, index) => (
        <div key={question.id} className="question">
          <h3 className="question-title">Question {index + 1}</h3>
          <p className="question-text">{question.question_text}</p>
          <audio controls>
            <source src={question.soundUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          <div className="choices">
            {question.choices.map(choice => (
              <div key={choice.id} className="choice">
                <input type="radio" id={choice.id} name={`question-${question.id}`} value={choice.choice_text} />
                <label htmlFor={choice.id}>{choice.choice_text}</label>
                <audio controls>
                  <source src={choice.soundUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default AudioExam;
