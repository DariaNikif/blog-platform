import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { createArticle } from '../../Services/Services.js';
import { message } from 'antd';
import './CreateArticle.scss';

export default function CreateArticle() {
  const navigate = useNavigate();
  const [tags, setTags] = useState([{ id: Date.now(), value: '' }]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();

  const onSubmit = async (data) => {
    const areTagsValid = tags.every((tag) => tag.value.trim() !== '');

    if (!areTagsValid) {
      setError('tags', {
        type: 'manual',
        message: 'Нельзя использовать одни пробелы в тегах.',
      });
      return;
    }

    try {
      await createArticle({ ...data, tags });
      message.success('Статья создана');
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const addTagInput = () => {
    setTags([...tags, { id: Date.now(), value: '' }]);
  };

  const deleteTagInput = (id) => {
    setTags(tags.filter((tag) => tag.id !== id));
  };

  const handleTagInputChange = (id, value) => {
    clearErrors('tags');
    setTags(tags.map((tag) => (tag.id === id ? { ...tag, value } : tag)));
  };

  return (
    <div className='create-article'>
      <h2>Create new article</h2>

      <form className='create-article' onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor='title'>Title</label>

        <input
          className='input'
          id='title'
          type='text'
          placeholder='Title'
          {...register('title', {
            required: 'Необходимо ввести название статьи.',
            validate: {
              notOnlySpaces: (value) =>
                value.trim() !== '' || 'Нельзя использовать одни пробелы в названии статьи.',
            },
          })}
        />
        {errors.title && <p className='error-message'>{errors.title.message}</p>}

        <label htmlFor='description'>Short description</label>

        <input
          className='input'
          id='description'
          type='text'
          placeholder='Short description'
          {...register('description', {
            required: 'Необходимо ввести краткое описание статьи.',
            validate: {
              notOnlySpaces: (value) =>
                value.trim() !== '' ||
                'Нельзя использовать одни пробелы в кратком описании статьи.',
            },
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
          {...register('text', {
            required: 'Необходимо ввести текст-содержание статьи.',
            validate: {
              notOnlySpaces: (value) =>
                value.trim() !== '' || 'Нельзя использовать одни пробелы в тексте статьи.',
            },
          })}
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
          {errors.tags && <p className='error-message-tags'>{errors.tags.message}</p>}
        </div>

        <button type='submit' className='send'>
          SEND
        </button>
      </form>
    </div>
  );
}
