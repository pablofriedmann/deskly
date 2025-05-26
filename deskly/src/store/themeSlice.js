import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: localStorage.getItem('theme') || 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', state.theme); 
      document.body.classList.toggle('dark-mode', state.theme === 'dark');
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;