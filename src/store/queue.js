import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  queue: JSON.parse(localStorage.getItem('queue')) || ''
};

const queueSlice = createSlice({
  name: 'queue',
  initialState,
  reducers: {
    setQueue(state, { payload }) {
      localStorage.setItem('queue', JSON.stringify(payload.queue));
      return {
        queue: payload.queue
      };
    }
  }
});

export const queueActions = queueSlice.actions;
export default queueSlice.reducer;
