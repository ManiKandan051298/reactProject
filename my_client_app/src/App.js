import React, { useState } from "react";
import { Routes, Route, BrowserRouter as Router, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import NoMatch from "./Pages/NoMatch";

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
          <Route path="login" element={<Login onLogin={handleLogin} onLogout={handleLogout} />} />
          <Route index element={<Home isLoggedIn={isLoggedIn}  />} />
          <Route path="about" element={<About  isLoggedIn={isLoggedIn}  />} />
          <Route path="home/contact" element={<Contact isLoggedIn={isLoggedIn}  />} />
          <Route path="register" element={<Register isLoggedIn={isLoggedIn}  />} />
          <Route path="*" element={<NoMatch isLoggedIn={isLoggedIn}  />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
