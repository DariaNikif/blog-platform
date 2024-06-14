import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { message } from 'antd';
import { loginUser } from '../../Services/Services';
import { login } from '../../Redux/slice/authSlice';
import './SignIn.scss';

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await loginUser(data);
      if (res) {
        dispatch(login(res.data.user));
        navigate('/');
      }
    } catch (error) {
      message.error('Повторите попытку или проверьте данные.');
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className='sign-in-form'>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor='email' className='email stl-label'>
          Email address
          <input
            {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
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
            {...register('password', { required: true, validate: (value) => !/\s/.test(value) })}
            type='password'
            id='password'
            placeholder='Password'
            autoComplete='off'
            className={errors.password ? 'error-input' : ''}
          />
          {errors.password && (
            <span className='error-msg'>
              {errors.password.type === 'required' && 'Необходимо ввести пароль.'}
              {errors.password.type === 'validate' && 'Пароль не может содержать пробел.'}
            </span>
          )}
        </label>

        <button type='submit'>Login</button>
        <span className='question'>
          Don&apos;t have an account?&nbsp;
          <Link to='/sign-up' className='link-blue'>
            Sign Up.
          </Link>
        </span>
      </form>
    </div>
  );
}
