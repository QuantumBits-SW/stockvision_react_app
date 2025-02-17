import { configureStore } from '@reduxjs/toolkit';
import popperReducer from './slices/popperSlice';

export const store = configureStore({
  reducer: {
    popper: popperReducer
  }
});
