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
      state.text = payload.text;
      state.title = payload.title;
      state.type = payload.type;
      state.show = payload.sho;
    }
  }
});

export const toastActions = toastSlice.actions;
export default toastSlice.reducer;
