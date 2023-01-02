import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "4hKRNeO42s0138CtX7Bvu8",
};

export const playlistIdSlice = createSlice({
  name: "playlistId",
  initialState,
  reducers: {
    addPlaylistId: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { addPlaylistId } = playlistIdSlice.actions;
export default playlistIdSlice.reducer;
