import React from "react";
import { Routes, Route, BrowserRouter as Router, Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Login from "./Pages/Login";

function App() {
  return (
    <div>
      <Router>
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/home/contact">contact</Link>
            </li>
            <li>
              <Link to="/Login">Login</Link>
            </li>
          </ul>
        </nav> */}

        {/* <hr /> */}

        <Routes>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="home/contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Router>
    </div>
  );
}

function Home() {
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}

function About() {
  return (
    <div>
      <h1>About</h1>
    </div>
  );
}
function Contact() {
  return (
    <div>
      <h1>Contact</h1>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h1>Nothing to see here!</h1>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

export default App;
