import React from "react";
import { Routes, Route, BrowserRouter as Router, Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Outlet } from "react-router-dom";
import Login from "./Pages/Login";
import fetchData1 from 'axios'
import axios from "axios";

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
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await fetch("http://localhost:8000/articles/");
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        const data = await response.json();
        setArticles(data.message); // Extract articles from the server response
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    }

    fetchArticles();
  }, []);

  useEffect(() => {
    console.log(articles); // Log articles when the state updates
  }, [articles]);

  return (
    <div>
      <div>home</div>
      {/* Render articles here */}
      {articles.map(article => (
        <div key={article.id}>
          <h2>{article.title}</h2>
          <p>{article.content}</p>
          <p>Published Date: {article.pub_date}</p>
        </div>
      ))}
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
