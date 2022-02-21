import { configureStore } from '@reduxjs/toolkit';
import toastReducer from './toast';
import userReducer from './user';

const store = configureStore({
  reducer: { toast: toastReducer, user: userReducer }
});

export default store;
