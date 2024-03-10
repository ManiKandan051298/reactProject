import React from "react";
import { Routes, Route, BrowserRouter as Router, Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Outlet } from "react-router-dom";
import Login from "./Pages/Login";
import fetchData1 from 'axios'
import axios from "axios";
import { get, post, put, remove } from './axiosWrapper'; // Adjust the path to the axios wrapper utility

function App() {
  return (
    <div>
      <Router>
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
    async function fetchData() {
      try {
        const responseData = await get('/articles/');
        console.log(responseData)
        setArticles(responseData.message);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    }
    fetchData()
  }, []);

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
