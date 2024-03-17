import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import './CourseListPage.css';
import usePageTitle from './UsePageTitle';
import { get } from '../axiosWrapper';
import './AudioExam.css';
// 2:3 3: 6 4: 13 5: 18 6:22 7:24

function AudioExam({ isLoggedIn }) {
  usePageTitle('Audio Lesson');
  const [allQuestions, setAllQuestions] = useState([]);
  const [selectedChoices, setSelectedChoices] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setsuccessMessage] = useState('');


  useEffect(() => {
    async function fetchData() {
      try {
        console.log("data collect started")
        const response = await get('/questions');
        if (response.data.status === 1) {
          setAllQuestions(response.data.message);
          console.log(response.data.message)
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

  // Function to handle user selection of choices
  const handleChoiceSelection = (questionId, choiceId) => {
    setSelectedChoices(prevState => ({
      ...prevState,
      [questionId]: choiceId
    }));
    console.log(selectedChoices, isLoggedIn)

  };

// Define the correct answers
const correctAnswers = {
  2: 3,
  3: 6,
  4: 13,
  5: 18,
  6: 22,
  7: 24
};

// Function to calculate the score
const calculateScore = () => {
  let score = 0;
  for (const questionId in selectedChoices) {
    if (selectedChoices[questionId] === correctAnswers[questionId]) {
      score++;
    }
  }
  return score;
};

// Function to handle form submission
const handleSubmit = () => {
  // Check if user has answered all questions
  const unansweredQuestions = allQuestions.filter(
    question => !selectedChoices[question.id]
  );
  if (unansweredQuestions.length > 0) {
    setErrorMessage('Please answer all questions before submitting.');
    return;
  }

  // Calculate the score
  const score = calculateScore();
  console.log('Score:', score);

  // Handle other submission logic
  setIsSubmitted(true);
  setErrorMessage('');
  setsuccessMessage('Submitted successfully. Your score is ' + score);
};
  return (

    <div className="question-list">
     {errorMessage ? <p style={{color:'red'}}>{errorMessage}</p> : <p></p>}
     {successMessage ? <p style={{color:'green'}}>{successMessage}</p> : <p></p>}

      {allQuestions.map((question, index) => (
        <div key={question.id} className="question">
          <h3 className="question-title">Question {index + 1}</h3>
          <p className="question-text">{question.question_text}</p>
          <div className="choices">
            {question.choices.map(choice => (
              <div key={choice.id} className="choice">
                <input 
                  type="radio" 
                  id={choice.id} 
                  name={`question-${question.id}`} 
                  value={choice.choice_text} 
                  checked={selectedChoices[question.id] === choice.id} 
                  onChange={() => handleChoiceSelection(question.id, choice.id)}
                />
                <label htmlFor={choice.id}>{choice.choice_text}</label>
              </div>
            ))}
          </div>
        </div>
      ))}
     {isSubmitted ?  <p style={{color:'green'}}>User Already Submitted</p>: <button onClick={handleSubmit} >Submit</button>}
    </div>
  );
}

export default AudioExam;
