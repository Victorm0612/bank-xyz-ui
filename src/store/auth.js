import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: JSON.parse(localStorage.getItem('token')) || '',
  refresh: JSON.parse(localStorage.getItem('refreshToken')) || ''
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, { payload }) {
      localStorage.setItem('token', JSON.stringify(payload.token));
      localStorage.setItem('refreshToken', JSON.stringify(payload.refresh));
      return {
        token: payload.token,
        refresh: payload.refresh
      };
    }
  }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
