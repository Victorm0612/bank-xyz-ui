import { createSlice } from '@reduxjs/toolkit';

const initialState = JSON.parse(localStorage.getItem('user')) || {
  firstName: '',
  lastName: '',
  docType: '1',
  docNumber: '',
  role: 1,
  email: '',
  password: ''
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setInfo(state, action) {
      const data = action.payload;
      localStorage.setItem('user', JSON.stringify({ ...data }));
      return {
        ...data
      };
    },

    logout() {
      localStorage.removeItem('user');
      return {
        ...initialState
      };
    }
  }
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
