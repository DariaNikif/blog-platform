import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { disLiked, Liked, getFullArticle } from '../../Services/Services';
import { selectIsAuthenticated } from '../../Redux/slice/authSlice';
import { truncate } from '../../Utils/utilsRulesText';
import './Article.scss';

export default function Article({
  title,
  favoritesCount,
  author,
  createdAt,
  description,
  tagList,
  slug,
  favorited,
}) {
  const Navigate = useNavigate();
  const [liked, setLiked] = useState(favorited);
  const [count, setCount] = useState(favoritesCount);
  const tokenFromRedux = useSelector((state) => state.auth.user.token);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const token = tokenFromRedux || localStorage.getItem('token');

  useEffect(() => {
    setLiked(favorited);
    setCount(favoritesCount);
  }, [favorited, favoritesCount, isAuthenticated]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const article = await getFullArticle(token, slug);
        setLiked(article.article.favorited);
        setCount(article.article.favoritesCount);
      } catch (error) {
        console.error('Error fetching article data:', error);
      }
    };

    fetchData();
  }, [slug, token]);

  const likeClick = async () => {
    if (!isAuthenticated) {
      Navigate('/sign-in');
      return;
    }

    if (liked) {
      try {
        await disLiked(token, slug);
        setLiked(false);
        setCount(count - 1);
      } catch (error) {
        console.error('Error disliking article:', error);
      }
    } else {
      try {
        await Liked(token, slug);
        setLiked(true);
        setCount(count + 1);
      } catch (error) {
        console.error('Error liking article:', error);
      }
    }
  };

  return (
    <div className='article'>
      <div className='header-article'>
        <div className='title'>
          <Link to={`/articles/${slug}`}>
            <h2>{truncate(title, 40)}</h2>
          </Link>
          <span className='like' onClick={likeClick}>
            <FontAwesomeIcon
              icon={faHeart}
              className={`custom-heart-icon ${liked ? 'custom-heart-icon--like' : ''}`}
            />
            <span>{count}</span>
          </span>
          <ul className='tag-list'>
            {tagList.map((tag, index) => (
              <li className='tag' key={index}>
                {truncate(tag, 15)}
              </li>
            ))}
          </ul>
        </div>
        <div className='avatar'>
          <span className='container-avatar'>
            <span className='name'>{author.username}</span>
            <span className='time'>{format(new Date(createdAt), 'MMM dd, yyyy')}</span>
          </span>
          <img src={author.image} alt='фото профиля' />
        </div>
      </div>
      <p>{truncate(description, 150)}</p>
    </div>
  );
}
