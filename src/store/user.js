import { createSlice } from '@reduxjs/toolkit';

const initialState = JSON.parse(localStorage.getItem('user')) || {
  firstName: '',
  lastName: '',
  docType: '1',
  docNumber: '',
  role: 1,
  email: '',
  password: '',
  locationId: ''
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setInfo(state, action) {
      const data = action.payload;
      localStorage.setItem('user', JSON.stringify({ ...data, locationId: '' }));
      return {
        ...data,
        locationId: ''
      };
    },

    logout() {
      localStorage.removeItem('user');
      return {
        ...initialState
      };
    },

    setLocation(state, action) {
      const data = action.payload;
      localStorage.setItem('user', JSON.stringify({ ...state, ...data }));
      return { ...state, ...data };
    }
  }
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
