import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  show: false,
  text: '',
  title: '',
  type: 'success'
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    setInfo(state, { payload }) {
      return {
        text: payload.text,
        title: payload.title,
        type: payload.type,
        show: payload.show
      };
    }
  }
});

export const toastActions = toastSlice.actions;
export default toastSlice.reducer;
