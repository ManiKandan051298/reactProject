import React, { useState } from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./Pages/Home";
import CourseListPage from './Pages/CourseListPage';
import NoMatch from "./Pages/NoMatch";
import AuthTabs from "./Pages/AuthTabs";
import LiveMeeting from "./Pages/LiveMeeting";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState('');

  // Function to set login status
  const handleLogin = (id) => {
    setIsLoggedIn(id);
    console.log("Login Success ", isLoggedIn);
  };

  // Function to set logout status
  const handleLogout = (id) => {
    setIsLoggedIn(id);
    console.log("Logout Success!!");
  };

  return (
    <div>
      <Router>
        <Routes>

         
          <Route path="/home" element={<Home handleLogout={handleLogout} isLoggedIn = {isLoggedIn} tabname="Welcome" />} />
        
          <Route path="/login" element={<AuthTabs handleLogin={handleLogin} handleLogout={handleLogout} />} />
          <Route path="/register" element={<AuthTabs handleLogin={handleLogin} handleLogout={handleLogout} />} />
          <Route path="/*" element={<NoMatch handleLogin={handleLogin} handleLogout={handleLogout} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
