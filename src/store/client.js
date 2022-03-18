import { createSlice } from '@reduxjs/toolkit';

const initialState = JSON.parse(localStorage.getItem('client')) || {
  firstName: '',
  lastName: '',
  docType: '1',
  docNumber: '',
  role: 1,
  email: '',
  password: ''
};

const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    setInfo(state, action) {
      const data = action.payload;
      localStorage.setItem('client', JSON.stringify({ ...data }));
      return {
        ...data
      };
    }
  }
});

export const clientActions = clientSlice.actions;
export default clientSlice.reducer;
