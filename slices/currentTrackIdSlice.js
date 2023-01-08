import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

export const currentTrackIdSlice = createSlice({
  name: "currentTrackId",
  initialState,
  reducers: {
    addCurrentTrack: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { addCurrentTrack } = currentTrackIdSlice.actions;
export default currentTrackIdSlice.reducer;
