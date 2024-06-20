import { createSlice } from '@reduxjs/toolkit';

const defaultImage = 'https://static.productionready.io/images/smiley-cyrus.jpg';

const token = localStorage.getItem('token');
const username = localStorage.getItem('username');
const email = localStorage.getItem('email');
let image = localStorage.getItem('image') || defaultImage;

if (!localStorage.getItem('image')) {
  localStorage.setItem('image', defaultImage);
}

if (!token) {
  localStorage.removeItem('image');
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: !!token,
    user: {
      username: username || '',
      email: email || '',
      image: image,
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
      else localStorage.setItem('image', defaultImage);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = { username: '', email: '', image: defaultImage };
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
