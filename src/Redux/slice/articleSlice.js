import { createSlice } from '@reduxjs/toolkit';

export const articleSlice = createSlice({
  name: 'article',
  initialState: {
    loading: false,
    error: null,
    articles: {},
  },
  reducers: {
    startLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setArticles: (state, action) => {
      state.articles = action.payload;
    },
  },
});

export const { startLoading, stopLoading, setError, setArticles } = articleSlice.actions;

export const selectArticleLoading = (state) => state.article.loading;
export const selectArticleError = (state) => state.article.error;
export const selectArticles = (state) => state.article.articles;

export default articleSlice.reducer;
