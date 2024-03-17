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

  const { speak, speaking, cancel } = useSpeechSynthesis(); // Initialize useSpeechSynthesis hook

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
    if (speaking && currentlyPlayingOptionIndex === questionIndex) {
      cancel(); // If currently speaking, stop speaking
      setCurrentlyPlayingOptionIndex(null);
      updatePlayStates(questionIndex, choiceIndex, false);
    } else {
      if (currentlyPlayingOptionIndex !== null) {
        cancel(); // If another option is playing, stop it
        updatePlayStates(currentlyPlayingOptionIndex, null, false);
      }
      speak({ text }); // If not speaking, speak the text
      setCurrentlyPlayingOptionIndex(questionIndex);
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
                <input type="radio" id={choice.id} name={`question-${question.id}`} value={choice.choice_text} />
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
    </div>
  );
}

export default AudioExam;
