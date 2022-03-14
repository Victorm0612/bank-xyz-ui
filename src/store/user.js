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
    setInfo(state, { payload }) {
      localStorage.setItem('user', JSON.stringify({ ...payload }));
      state.firstName = payload.firstName;
      state.lastName = payload.lastName;
      state.docType = payload.docType;
      state.docNumber = payload.docNumber;
      state.role = payload.role;
      state.email = payload.email;
      state.password = payload.password;
    },

    logout(state) {
      localStorage.removeItem('user');
      state.firstName = initialState.firstName;
      state.lastName = initialState.lastName;
      state.docType = initialState.docType;
      state.docNumber = initialState.docNumber;
      state.role = initialState.role;
      state.email = initialState.email;
      state.password = initialState.password;
    }
  }
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
