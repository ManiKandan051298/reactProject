// usePageTitle.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const usePageTitle = (title) => {
  const location = useLocation();

  useEffect(() => {
    document.title =process.env.REACT_APP_PROJECT_TITLE+" | "+ title;
  }, [title, location.pathname]);
};

export default usePageTitle;
