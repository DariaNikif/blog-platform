import React, { useEffect, useState } from 'react';
import { getArticles } from '../../Services/Services';
import goslingImage from '../../Assets/gosling.png';
import './RyanGosling.scss';

const RyanGosling = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timeoutId;
    let intervalId;

    const loadArticlesAndShowGosling = async () => {
      try {
        await getArticles();

        timeoutId = setTimeout(() => {
          setVisible(true);
          intervalId = setInterval(() => {
            setVisible(false);
          }, 10000);
        }, 20000);
      } catch (error) {
        console.error('Failed to load articles:', error);
      }
    };

    loadArticlesAndShowGosling();

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className={`gosling-container ${visible ? 'visible' : 'hide'}`}>
      {visible && <div className='one-text'>я пришел за зачетом</div>}
      {visible && <div className='two-text'>если вы его не ставите</div>}
      {visible && <div className='three-text'>я ухожу...</div>}
      {visible && <img src={goslingImage} alt='Ryan Gosling' />}
    </div>
  );
};

export default RyanGosling;
