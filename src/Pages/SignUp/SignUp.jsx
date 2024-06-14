import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { registerUser } from '../../Services/Services';
import { message } from 'antd';
import utilsCheckForRegistration from '../../Utils/utilsFormRegistration';
import './SignUp.scss';

export default function SignUp() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const [, setSuccessMessage] = useState(false);

  const onSubmit = async (data) => {
    try {
      await registerUser(data);
      setSuccessMessage(true);
      setTimeout(() => {
        navigate('/sign-in');
      }, 2000);
      message.success('Аккаунт успешно создан!');
    } catch (error) {
      console.error('Error registering:', error);
      utilsCheckForRegistration(error);
    }
  };

  const password = watch('password');

  return (
    <div className='sign-up-form'>
      <h2>Create new account</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor='username' className='username stl-label'>
          Username
          <input
            {...register('username', {
              required: true,
              minLength: 3,
              maxLength: 20,
              validate: (value) => !/\s/.test(value),
            })}
            type='text'
            id='username'
            placeholder='Username'
            className={errors.username ? 'error-input' : ''}
          />
          {errors.username && (
            <span className='error-msg'>
              {errors.username.type === 'required' && 'Необходимо ввести имя пользователя.'}
              {errors.username.type === 'minLength' &&
                'Имя пользователя должно содержать не менее 3 символов.'}
              {errors.username.type === 'maxLength' &&
                'Длина имени пользователя не должна превышать 20 символов.'}
              {errors.username.type === 'validate' && 'Имя пользователя не может содержать пробел.'}
            </span>
          )}
        </label>

        <label htmlFor='email' className='email stl-label'>
          Email address
          <input
            {...register('email', {
              required: true,

              pattern: /^\S+@\S+$/i,
            })}
            type='email'
            id='email'
            placeholder='Email address'
            className={errors.email ? 'error-input' : ''}
          />
          {errors.email && (
            <span className='error-msg'>
              {errors.email.type === 'required' && 'Необходимо ввести электронную почту.'}
              {errors.email.type === 'pattern' && 'Неверный адрес электронной почты.'}
            </span>
          )}
        </label>

        <label htmlFor='password' className='pass stl-label'>
          Password
          <input
            {...register('password', {
              required: true,
              minLength: 6,
              maxLength: 40,
              validate: (value) => !/\s/.test(value),
            })}
            type='password'
            id='password'
            placeholder='Password'
            autoComplete='off'
            className={errors.password ? 'error-input' : ''}
          />
          {errors.password && (
            <span className='error-msg'>
              {errors.password.type === 'required' && 'Необходимо ввести пароль.'}
              {errors.password.type === 'minLength' &&
                'Пароль должен содержать не менее 6 символов.'}
              {errors.password.type === 'maxLength' &&
                'Длина пароля не должна превышать 40 символов.'}
              {errors.password.type === 'validate' && 'Пароль не может содержать пробел.'}
            </span>
          )}
        </label>

        <label htmlFor='repeatPassword' className='stl-label'>
          Repeat Password
          <input
            {...register('repeatPassword', {
              required: true,
              validate: (value) => value === password || 'Пароли не совпадают.',
            })}
            type='password'
            id='repeatPassword'
            placeholder='Password'
            autoComplete='off'
            className={errors.repeatPassword ? 'error-input' : ''}
          />
          {errors.repeatPassword && (
            <span className='error-msg'>{errors.repeatPassword.message}</span>
          )}
        </label>

        <div className='check'>
          <input {...register('checkbox', { required: true })} type='checkbox' id='checkbox' />
          <span className='check-text'>I agree to the processing of my personal information.</span>
          {errors.checkbox && (
            <span className='error-msg error-check'>You must agree to the terms.</span>
          )}
        </div>

        <button type='submit'>Create</button>

        <span className='already'>
          Already have an account?&nbsp;
          <Link to='/sign-in' className='link-blue'>
            Sign In.
          </Link>
        </span>
      </form>
    </div>
  );
}
