import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CourseListPage.css';
import usePageTitle from './UsePageTitle';
import './Welcome.css';
import '@fortawesome/fontawesome-free/css/all.css';


function WelcomePage({ isLoggedIn }) {
  const navigate = useNavigate();
  const [currentBox, setCurrentBox] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speechText, setSpeechText] = useState('');
  const [synth, setSynth] = useState(null);

  // Text content for each box
  const boxText = [
    {
      title: 'Welcome',
      content: 'Welcome to our Application! This application is designed to provide you with a seamless learning experience. Explore our courses, join live meetings, and take audio lessons and exams.',
    },
    {
      title: 'About Us',
      content: 'We are dedicated to helping individuals reach new heights by providing accessible education.',
    },
    {
      title: 'Contact Us',
      content: 'For any queries or assistance, feel free to reach out to us at example@example.com',
    },
  ];

  // Set page title
  usePageTitle("Welcome ");

  // Redirect to login page if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  // Initialize SpeechSynthesis
  useEffect(() => {
    if ('speechSynthesis' in window) {
      const synth = window.speechSynthesis;
      setSynth(synth);
    } else {
      alert('Your browser does not support text-to-speech functionality.');
    }
  }, []);

  // Function to handle text-to-speech
  const handleTextToSpeech = (text) => {
    if (synth) {
      synth.cancel(); // Stop any ongoing speech
      const utterance = new SpeechSynthesisUtterance(text);
      synth.speak(utterance); // Start or resume speech
      setSpeechText(text);
      setIsPlaying(true);

      utterance.onend = () => {
        setIsPlaying(false);
      };
    }
  };

  // Function to toggle play/pause
  const togglePlayPause = () => {
    if (isPlaying) {
      synth.pause();
    } else {
      if (synth.paused) {
        synth.resume();
      } else {
        handleTextToSpeech(boxText[currentBox].content);
      }
    }
    setIsPlaying(!isPlaying);
  };

  // Function to handle box navigation
  const handleNextClick = () => {
    setCurrentBox((prevBox) => (prevBox === 2 ? 0 : prevBox + 1)); // Loop back to Welcome box after Contact Us box
  };

  return (
    <div>
      <h2 id="loggedUse">Hey {isLoggedIn},</h2>

      <div className="rotating-container">
        {boxText.map((box, index) => (
          <div key={index} className={`box ${index === currentBox ? 'active' : ''} ${box.title.toLowerCase().replace(' ', '-')}`}>
            <div className="box-content">
              <h3>{box.title}</h3>
              <p>{box.content}</p>
            </div>
            <div className="icon-container">
              <button onClick={togglePlayPause}>
                {isPlaying && speechText === box.content ? <i className="fas fa-pause"></i> : <i className="fas fa-play"></i>}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="icon-container">
        <button onClick={handleNextClick} style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '3px', padding: '8px 16px', cursor: 'pointer' }}>
          <i className="fas fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
}

export default WelcomePage;
