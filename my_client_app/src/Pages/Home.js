import { useState, useEffect } from 'react';
import { get} from '../axiosWrapper'; // Adjust the path to the axios wrapper utility

export default function Home({isLoggedIn}) {
    const [articles, setArticles] = useState([]);

    if(isLoggedIn) {
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
    ); }
    return(
        <div>need to login</div>
    )
  }