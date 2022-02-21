import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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

export const userActions = userSlice.actions;
export default userSlice.reducer;
