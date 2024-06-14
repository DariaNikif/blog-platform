import { configureStore } from '@reduxjs/toolkit';
import pageReducer from './slice/pageSlice';
import authReducer from './slice/authSlice';
import articleReducer from './slice/articleSlice';

export const store = configureStore({
  reducer: {
    page: pageReducer,
    auth: authReducer,
    article: articleReducer,
  },
});
