import { configureStore } from '@reduxjs/toolkit';
import technologyReducer from './technologySlice';

export const store = configureStore({
  reducer: {
    technology: technologyReducer,
  },
});