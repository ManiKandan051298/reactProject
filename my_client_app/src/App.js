import React, { useState } from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./Pages/Home";
import CourseListPage from './Pages/CourseListPage';

import AuthTabs from "./Pages/AuthTabs";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState('');

  // Function to set login status
  const handleLogin = (id)=> {
    setIsLoggedIn(id);
    console.log("isLoggedIn status: ",isLoggedIn)
  };

  // Function to set logout status
  const handleLogout = (id) => {
    setIsLoggedIn(id);
    console.log("isLoggedIn status: ",isLoggedIn)
  };

  return (
    <div>
      <Router>
        <Routes>
          {/* <Route path="login" element={<Login onLogin={handleLogin} onLogout={handleLogout} />} /> */}
          <Route path="/*" element={<AuthTabs onLogin={handleLogin} onLogout={handleLogout} />} />
          <Route path="/home" element={<Home />} />
          <Route path="/courselist" element={<CourseListPage />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
