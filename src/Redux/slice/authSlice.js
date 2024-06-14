import { createSlice } from '@reduxjs/toolkit';

const myPhoto = '../../Assets/channels4_profile.jpg';

const token = localStorage.getItem('token');
const username = localStorage.getItem('username');
const email = localStorage.getItem('email');
const image = localStorage.getItem('image');

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: !!token,
    user: {
      username: username || '',
      email: email || '',
      image: image || myPhoto,
    },
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      if (action.payload.token) localStorage.setItem('token', action.payload.token);
      if (action.payload.username) localStorage.setItem('username', action.payload.username);
      if (action.payload.email) localStorage.setItem('email', action.payload.email);
      if (action.payload.image) localStorage.setItem('image', action.payload.image);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = { username: '', email: '', image: '' };
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('email');
      localStorage.removeItem('image');
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      if (action.payload.username) localStorage.setItem('username', action.payload.username);
      if (action.payload.email) localStorage.setItem('email', action.payload.email);
      if (action.payload.image) localStorage.setItem('image', action.payload.image);
    },
  },
});

export const { login, logout, updateUser } = authSlice.actions;

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;
