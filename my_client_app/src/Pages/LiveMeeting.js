import React from 'react';
import {  Navigate } from 'react-router-dom';
import usePageTitle from './UsePageTitle';
function LiveMeeting({isLoggedIn}) {
  usePageTitle("Live Meeting");

    console.log(isLoggedIn)
    if (!isLoggedIn) {
      return <Navigate to="/login" />;
    }
  return (
    <div>
      <div style={{ width: '100%', height: '500px' }}>
        {/* Replace 'https://example.com' with the URL of the website you want to embed */}
        <iframe title="External Website" src="https://meet.jit.si/kfasldjfalfdja" style={{ border: 'none', width: '100%', height: '100%' }} />
      </div>
    </div>
  );
}

export default LiveMeeting;
