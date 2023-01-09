import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

export const lyricsSlice = createSlice({
  name: "lyrics",
  initialState,
  reducers: {
    setLyrics: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setLyrics } = lyricsSlice.actions;
export default lyricsSlice.reducer;
