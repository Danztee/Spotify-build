import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const isPlayingSlice = createSlice({
  name: "isPlaying",
  initialState,
  reducers: {
    playing: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { playing } = isPlayingSlice.actions;
export default isPlayingSlice.reducer;
