import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { message } from 'antd';
import { selectIsAuthenticated, selectUser, updateUser } from '../../Redux/slice/authSlice';
import { updateProfile } from '../../Services/Services';
import './EditProfile.scss';

export default function EditProfile() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [initialUsername, setInitialUsername] = useState('');
  const [initialEmail, setInitialEmail] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isAuthenticated) {
      setUsername(user.username || '');
      setEmail(user.email || '');
      setInitialUsername(user.username || '');
      setInitialEmail(user.email || '');
      setValue('username', user.username || '');
      setValue('email', user.email || '');
    }
  }, [isAuthenticated, user, setValue]);

  const onSubmit = async (data) => {
    if (
      data.username === initialUsername &&
      data.email === initialEmail &&
      data.avatar === user.image &&
      !data.password
    ) {
      return;
    }

    try {
      const updatedUser = await updateProfile(data);
      dispatch(updateUser(updatedUser));
      message.success('Успешно обновлено.');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className='edit-profile'>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Username
          <input
            id='text'
            type='text'
            placeholder='Username'
            defaultValue={username}
            onChange={(e) => setUsername(e.target.value)}
            className={errors.username ? 'error-input' : ''}
            {...register('username', {
              required: 'Необходимо ввести имя пользователя.',
              validate: (value) => !/\s/.test(value) || 'Имя не может содержать пробелы.',
            })}
          />
          {errors.username && (
            <p className='error-message'>
              {errors.username.type === 'required' && errors.username.message}
              {errors.username.type === 'validate' && errors.username.message}
            </p>
          )}
        </label>
        <label className='email'>
          Email address
          <input
            id='email'
            type='email'
            placeholder='Email address'
            defaultValue={email}
            onChange={(e) => setEmail(e.target.value)}
            className={errors.email ? 'error-input' : ''}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Некорректный адрес электронной почты.',
              },
            })}
          />
          {errors.email && <p className='error-message'>{errors.email.message}</p>}
        </label>
        <label>
          New password
          <input
            id='password'
            type='password'
            placeholder='New password'
            autoComplete='off'
            name='password'
            {...register('password', {
              minLength: {
                value: 6,
                message: 'Длина пароля должна составлять не менее 6 символов.',
              },
              maxLength: {
                value: 40,
                message: 'Длина пароля не должна превышать 40 символов.',
              },
              validate: (value) => !/\s/.test(value) || 'Пароль не может содержать пробелы.',
            })}
            className={errors && errors.password && errors.password.message ? 'error-input' : ''}
          />
          {errors && errors.password && (
            <p className='error-message'>
              {errors.password.type === 'minLength' && errors.password.message}
              {errors.password.type === 'maxLength' && errors.password.message}
              {errors.password.type === 'validate' && errors.password.message}
            </p>
          )}
        </label>
        <label>
          Avatar image (URL)
          <input
            id='avatar'
            type='url'
            placeholder={user.image ? 'Avatar image URL' : 'Avatar image URL'}
            name='image'
            {...register('image', {
              pattern: {
                value: /^https?:\/\/\S+$/i,
                message: 'Пожалуйста, введите корректный URL-адрес для изображения аватара.',
              },
            })}
            className={errors && errors.avatar && errors.avatar.message ? 'error-input' : ''}
          />
          {errors && errors.avatar && errors.avatar.message && (
            <p className='error-message'>{errors.avatar.message}</p>
          )}
        </label>
        <button type='submit'>Save</button>
      </form>
    </div>
  );
}
