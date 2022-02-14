import { configureStore } from '@reduxjs/toolkit';
import toastReducer from './toast';

const store = configureStore({
  reducer: { toast: toastReducer }
});

export default store;
