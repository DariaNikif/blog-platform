import { createSlice } from '@reduxjs/toolkit';

const initialPage = parseInt(localStorage.getItem('currentPage'), 10) || 1;

const pageSlice = createSlice({
  name: 'page',
  initialState: {
    currentPage: initialPage,
    pageSize: 5,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
      localStorage.setItem('currentPage', action.payload);
    },
  },
});

export const { setCurrentPage } = pageSlice.actions;
export default pageSlice.reducer;
