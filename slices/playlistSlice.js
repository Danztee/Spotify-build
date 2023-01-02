import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    addPlaylist: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { addPlaylist } = playlistSlice.actions;
export default playlistSlice.reducer;
