import React ,{useState} from 'react';
import { Link, Navigate } from 'react-router-dom';
import './CourseListPage.css'; 
import usePageTitle from './UsePageTitle';

function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioUrl = 'https://commondatastorage.googleapis.com/codeskulptor-assets/sounddogs/thrust.mp3'; // Replace with your audio file URL

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div>
      <audio src={audioUrl} controls={true} autoPlay={false} />
      <button onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
    </div>
  );
}
function AudioLesson({ isLoggedIn }) {
  usePageTitle('Audio Lesson')
  console.log(isLoggedIn)
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="course-options">
      <h2>AudioLession Options</h2>
      <AudioPlayer />
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

export default AudioLesson;
