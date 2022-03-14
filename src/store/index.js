import { configureStore } from '@reduxjs/toolkit';
import toastReducer from './toast';
import userReducer from './user';
import authReducer from './auth';
import clientReducer from './client';

const store = configureStore({
  reducer: {
    toast: toastReducer,
    user: userReducer,
    auth: authReducer,
    client: clientReducer
  }
});

export default store;
