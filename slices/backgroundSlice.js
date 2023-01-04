import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "#121212",
};

export const backgroundSlice = createSlice({
  name: "backgroundColor",
  initialState,
  reducers: {
    changeBackground: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { changeBackground } = backgroundSlice.actions;
export default backgroundSlice.reducer;

// rgb(154,144,117)
