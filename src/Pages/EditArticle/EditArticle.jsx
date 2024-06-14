import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { getFullArticle, updateArticle } from '../../Services/Services.js';
import { message } from 'antd';
import Loader from '../../Components/Loader/Loader.jsx';
import './EditArticle.scss';

export default function EditArticle() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [, setLoading] = useState(true);
  const [tags, setTags] = useState([{ id: Date.now(), value: '' }]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await getFullArticle(token, slug);
        setArticle(response.article);
        setValue('title', response.article.title);
        setValue('description', response.article.description);
        setValue('text', response.article.body);
        const initialTags =
          response.article.tagList.length > 0
            ? response.article.tagList.map((tag, index) => ({ id: index, value: tag }))
            : [{ id: Date.now(), value: '' }];

        setTags(initialTags);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };

    fetchArticle();
  }, [slug, setValue]);

  const onSubmit = async (data) => {
    try {
      const { title, description, text } = data;
      await updateArticle(title, description, text, tags, localStorage.getItem('token'), slug);
      message.success('Статья успешно обновлена.');
      navigate('/');
    } catch (error) {
      console.error('Error updating article:', error);
    }
  };

  const addTagInput = () => {
    setTags([...tags, { id: Date.now(), value: '' }]);
  };

  const deleteTagInput = (id) => {
    setTags(tags.filter((tag) => tag.id !== id));
  };

  const handleTagInputChange = (id, value) => {
    setTags(tags.map((tag) => (tag.id === id ? { ...tag, value } : tag)));
  };

  return (
    <>
      {article ? (
        <div className='create-article'>
          <h2>Edit article</h2>

          <form className='create-article' onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor='title'>Title</label>

            <input
              className='input'
              id='title'
              type='text'
              placeholder='Title'
              defaultValue={article.title}
              {...register('title', { required: 'Необходимо ввести название статьи.' })}
            />
            {errors.title && <p className='error-message'>{errors.title.message}</p>}

            <label htmlFor='description'>Short description</label>

            <input
              className='input'
              id='description'
              type='text'
              placeholder='Short description'
              defaultValue={article.description}
              {...register('description', {
                required: 'Необходимо ввести краткое описание статьи.',
              })}
            />
            {errors.description && <p className='error-message'>{errors.description.message}</p>}
            <label htmlFor='body'>Text</label>

            <textarea
              name='text'
              id='body'
              cols='30'
              rows='10'
              placeholder='Text'
              className='text'
              defaultValue={article.body}
              {...register('text', { required: 'Необходимо ввести текст-содержание статьи.' })}
            ></textarea>
            {errors.text && <p className='error-message'>{errors.text.message}</p>}

            <label htmlFor='tag'>Tags</label>
            <div className='tags'>
              {tags.map((tag) => (
                <div key={tag.id} className='tags-input'>
                  <input
                    className='tag'
                    type='text'
                    placeholder='Tag'
                    value={tag.value}
                    onChange={(e) => handleTagInputChange(tag.id, e.target.value)}
                  />
                  <button type='button' className='del' onClick={() => deleteTagInput(tag.id)}>
                    DELETE
                  </button>
                </div>
              ))}
              <button type='button' className='add' onClick={addTagInput}>
                ADD TAG
              </button>
            </div>

            <button type='submit' className='send'>
              SEND
            </button>
          </form>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}
