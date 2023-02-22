Ddimport { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
  title: "",
  name: "",
};

export const lyricsSlice = createSlice({
  name: "lyrics",
  initialState,
  reducers: {
    setLyrics: (state, action) => {
      state.value = action.payload;
    },
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { setLyrics, setTitle, setName } = lyricsSlice.actions;
export default lyricsSlice.reducer;
