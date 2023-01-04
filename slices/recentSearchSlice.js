import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const recentSearchSlice = createSlice({
  name: "recentSearch",
  initialState,
  reducers: {
    recentSearch: (state, action) => {
      state.value.push(action.payload);
    },
  },
});

export const { recentSearch } = recentSearchSlice.actions;
export default recentSearchSlice.reducer;
