import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "#121212",
  image: "",
};

export const backgroundSlice = createSlice({
  name: "backgroundColor",
  initialState,
  reducers: {
    changeBackground: (state, action) => {
      state.value = action.payload;
    },
    changeImage: (state, action) => {
      state.image = action.payload;
    },
  },
});

export const { changeBackground, changeImage } = backgroundSlice.actions;
export default backgroundSlice.reducer;
