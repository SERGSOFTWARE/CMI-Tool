import { createSlice } from "@reduxjs/toolkit";

const counterState = {
  value: 100,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState: counterState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;

export default counterSlice.reducer;
