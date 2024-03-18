import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import './CourseListPage.css';
import usePageTitle from './UsePageTitle';
import { get } from '../axiosWrapper';
import { useSpeechSynthesis } from 'react-speech-kit'; // Import useSpeechSynthesis hook

function Presentation({ data }) {
  return (
    <div>
      {data.map(item => (
        <div key={item.id}>
          <h2 style={{ marginTop: 150,textAlign:'center' }}>{item.topic.name} , {item.title}  </h2>
          {/* <TextWithSpeechButton text={item.topic.name} label="Topic" /> */}
          <TextWithSpeechButton text={item.topic.description} label="Description" />
          <TextWithSpeechButton text={item.content} label="Content" />
          <p><strong>Publication Date:</strong> {new Date(item.pub_date).toLocaleString()}</p>
          <img src={item.image_url} alt={item.title} style={{ maxWidth: '100%', height: 'auto' }} />
        </div>
      ))}
    </div>
  );
}

function TextWithSpeechButton({ text, label }) {
  const { speak, cancel, speaking } = useSpeechSynthesis();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setIsPlaying(false); // Reset isPlaying state when text changes
  }, [text]);

  const handleToggle = () => {
    if (speaking && isPlaying) {
      cancel(); // If speech is currently playing and button is in play state, pause it
      setIsPlaying(false);
    } else {
      speak({ text }); // If speech is paused or not playing, play it
      setIsPlaying(true);
    }
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <p><strong>{label}:</strong> {text}</p>
      <button onClick={handleToggle}>{isPlaying ? `Pause ${label}` : `Play ${label}`}</button>
    </div>
  );
}

function AudioLesson({ isLoggedIn }) {
  usePageTitle('Audio Lesson')
  const [allCourse, setAllCourse] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await get('/articles');
        if (response.data.status === 1) {
          console.log(response.data.message)
          setAllCourse(response.data.message);
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
    return <Navigate to="/" />;
  }

  return (
    <div className="course-options">
      {/* <h2>Audio Lesson Options</h2> */}
      <Presentation data={allCourse} />
    </div>
  );
}

export default AudioLesson;
