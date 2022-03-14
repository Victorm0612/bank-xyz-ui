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
    setInfo(state, { payload }) {
      localStorage.setItem('client', JSON.stringify({ ...payload }));
      state.firstName = payload.firstName;
      state.lastName = payload.lastName;
      state.docType = payload.docType;
      state.docNumber = payload.docNumber;
      state.role = payload.role;
      state.email = payload.email;
      state.password = payload.password;
    }
  }
});

export const clientActions = clientSlice.actions;
export default clientSlice.reducer;
