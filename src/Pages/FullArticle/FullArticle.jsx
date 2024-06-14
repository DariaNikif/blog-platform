import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Popconfirm, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getFullArticle, deleteArticle, Liked, disLiked } from '../../Services/Services';
import {
  selectArticleLoading,
  selectArticleError,
  startLoading,
  stopLoading,
  setError,
} from '../../Redux/slice/articleSlice';
import { selectIsAuthenticated, selectUser } from '../../Redux/slice/authSlice';
import { truncate } from '../../Utils/utilsRulesText';
import Loader from '../../Components/Loader/Loader';
import './FullArticle.scss';

export default function FullArticle() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);

  const loading = useSelector(selectArticleLoading);
  const error = useSelector(selectArticleError);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const currentUser = useSelector(selectUser);

  const likeClick = async () => {
    const token = localStorage.getItem('token');
    try {
      if (liked) {
        await disLiked(token, slug);
        setLiked(false);
        setCount(count - 1);
      } else {
        await Liked(token, slug);
        setLiked(true);
        setCount(count + 1);
      }
    } catch (error) {
      console.error(error);
      message.error('Failed to toggle like');
    }
  };

  useEffect(() => {
    const fetchArticle = async () => {
      dispatch(startLoading());
      try {
        const token = localStorage.getItem('token');
        const response = await getFullArticle(token, slug);
        setArticle(response.article);
        setLiked(response.article.favorited);
        setCount(response.article.favoritesCount);
      } catch (error) {
        dispatch(setError(error));
      } finally {
        dispatch(stopLoading());
      }
    };

    fetchArticle();
  }, [dispatch, slug]);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await deleteArticle(slug, token);
      message.success('Статья успешно удалена.');
      navigate('/');
    } catch (error) {
      message.error('Failed to delete article');
    }
  };

  const cancelDelete = () => {
    message.info('Действие удаления отменено.');
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!article) {
    return <div>Article not found</div>;
  }

  const { title, author, createdAt, description, tagList, body } = article;
  const isAuthor = isAuthenticated && currentUser.username === author.username;

  return (
    <div className='article-page'>
      <div className='header-article'>
        <div className='title'>
          <h2>{title}</h2>{' '}
          <span className='like' onClick={likeClick}>
            <FontAwesomeIcon
              icon={faHeart}
              className={`custom-heart-icon ${liked ? 'custom-heart-icon--like' : ''}`}
            />
            <span>{count}</span>
          </span>
          <ul>
            {tagList.map((tag, index) => (
              <li className='tag stl-tag' key={index}>
                {truncate(tag, 15)}
              </li>
            ))}
          </ul>
        </div>
        <div className='avatar'>
          <span className='container-avatar'>
            {' '}
            <span className='name'>{author.username}</span>
            <span className='time'>{format(new Date(createdAt), 'MMM dd, yyyy')}</span>
          </span>
          <img src={author.image} alt='avatar' />
          <div></div>
        </div>
      </div>
      <div className='descr'>
        <p className='description'>{description}</p>
        <ReactMarkdown>{body}</ReactMarkdown>
      </div>

      {isAuthor && (
        <div className='actions'>
          <Popconfirm
            title='Вы уверены, что хотите удалить эту статью?'
            onConfirm={handleDelete}
            onCancel={cancelDelete}
            okText='Да'
            cancelText='Нет'
            placement='bottom'
          >
            <button className='btn-del'>DELETE</button>
          </Popconfirm>

          <Link to={`/articles/${slug}/edit`}>
            <button className='btn-edit'>EDIT</button>
          </Link>
        </div>
      )}
    </div>
  );
}
