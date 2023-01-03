import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    searchNow: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { searchNow } = searchSlice.actions;
export default searchSlice.reducer;
