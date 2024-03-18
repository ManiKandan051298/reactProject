import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import './CourseListPage.css';
import usePageTitle from './UsePageTitle';
import { get } from '../axiosWrapper';
import { useSpeechSynthesis } from 'react-speech-kit'; // Import useSpeechSynthesis hook
import './AudioExam.css';

function AudioExam({ isLoggedIn }) {
  usePageTitle('Audio Lesson');
  const [allQuestions, setAllQuestions] = useState([]);
  const [currentlyPlayingQuestionIndex, setCurrentlyPlayingQuestionIndex] = useState(null);
  const [currentlyPlayingOptionIndex, setCurrentlyPlayingOptionIndex] = useState(null);
  const [playStates, setPlayStates] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedChoices, setSelectedChoices] = useState({});
  const { speak, speaking, cancel } = useSpeechSynthesis(); // Initialize useSpeechSynthesis hook
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await get('/questions');
        if (response.data.status === 1) {
          setAllQuestions(response.data.message);
          setPlayStates(response.data.message.map(question => Array(question.choices.length).fill(false)));
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

  const handleChoiceSelection = (questionId, choiceId) => {
    setSelectedChoices(prevState => ({
      ...prevState,
      [questionId]: choiceId
    }));
  };

  const handleSpeakQuestion = (text, index) => {
    if (speaking && currentlyPlayingQuestionIndex === index) {
      cancel(); // If currently speaking, stop speaking
      setCurrentlyPlayingQuestionIndex(null);
    } else {
      speak({ text }); // If not speaking, speak the text
      setCurrentlyPlayingQuestionIndex(index);
      setCurrentlyPlayingOptionIndex(null); // Reset option index when a question is played
    }
  };

  const handleSpeakOption = (text, questionIndex, choiceIndex) => {
    if (speaking && currentlyPlayingOptionIndex === `${questionIndex}-${choiceIndex}`) {
      cancel(); // If currently speaking, stop speaking
      setCurrentlyPlayingOptionIndex(null);
      updatePlayStates(questionIndex, choiceIndex, false);
    } else {
      if (currentlyPlayingOptionIndex !== null) {
        cancel(); // If another option is playing, stop it
        const [prevQuestionIndex, prevChoiceIndex] = currentlyPlayingOptionIndex.split('-').map(parseInt);
        updatePlayStates(prevQuestionIndex, prevChoiceIndex, false);
      }
      speak({ text }); // If not speaking, speak the text
      setCurrentlyPlayingOptionIndex(`${questionIndex}-${choiceIndex}`);
      setCurrentlyPlayingQuestionIndex(null); // Reset question index when an option is played
      updatePlayStates(questionIndex, choiceIndex, true);
    }
  };

  const updatePlayStates = (questionIndex, choiceIndex, state) => {
    const newPlayStates = [...playStates];
    newPlayStates[questionIndex] = newPlayStates[questionIndex].map((playState, index) => {
      if (index === choiceIndex) {
        return state;
      } else {
        return playState;
      }
    });
    setPlayStates(newPlayStates);
  };

  // Function to get the option label based on the index
  const getOptionLabel = (index) => {
    const optionLabels = ['A', 'B', 'C', 'D'];
    return `Option ${optionLabels[index]}`;
  };

  const handleSubmit = () => {
    // Check if user has answered all questions
    const unansweredQuestions = allQuestions.filter(
      question => !selectedChoices[question.id]
    );
    if (unansweredQuestions.length > 0) {
      setErrorMessage('Please answer all questions before submitting.');
      setShowModal(true);
      return;
    }

    // Handle submission logic here...

    setIsSubmitted(true);
    setErrorMessage('');
    setSuccessMessage('Submitted successfully. Your score is ' + calculateScore());
    setShowModal(true);
  };

  // Function to calculate the score
  const calculateScore = () => {
    let score = 0;
    const correctAnswers = {
      2: 3,
      3: 6,
      4: 13,
      5: 18,
      6: 22,
      7: 24
    };

    for (const questionId in selectedChoices) {
      if (selectedChoices[questionId] === correctAnswers[questionId]) {
        score++;
      }
    }
    setScore(score)
    return score;
  };

  return (
    <div className="question-list">
      {allQuestions.map((question, questionIndex) => (
        <div key={question.id} className="question">
          <h3 className="question-title">Question {questionIndex + 1}</h3>
          <p className="question-text">{question.question_text}</p>
          <button className={`audio-button ${speaking && currentlyPlayingQuestionIndex === questionIndex ? 'active' : ''}`} onClick={() => handleSpeakQuestion(question.question_text, questionIndex)}>
            <span>{speaking && currentlyPlayingQuestionIndex === questionIndex ? 'Pause' : 'Play'}</span> Question
          </button>
          <div className="choices">
            {question.choices.map((choice, choiceIndex) => (
              <div key={choice.id} className="choice">
                <input type="radio" id={choice.id} name={`question-${question.id}`} value={choice.choice_text}  onChange={() => handleChoiceSelection(question.id, choice.id)} checked={selectedChoices[question.id] === choice.id}/>
                <label htmlFor={choice.id}>{choice.choice_text}</label>
                <br />
                <button id={`option-button-${questionIndex}-${choiceIndex}`} className={`audio-button ${playStates[questionIndex][choiceIndex] ? 'active' : ''}`} onClick={() => handleSpeakOption(choice.choice_text, questionIndex, choiceIndex)}>
                  <span>{playStates[questionIndex][choiceIndex] ? 'Pause' : 'Play'}</span> {getOptionLabel(choiceIndex)}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
     {isSubmitted ?  <p style={{color:'green'}}> You Have Already Submitted Your response ,Your Score is: {score}</p>: <button onClick={handleSubmit} >Submit</button>}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
            {successMessage && <p style={{color: 'green'}}>{successMessage}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export default AudioExam;
