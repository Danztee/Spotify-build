import { configureStore } from "@reduxjs/toolkit";
import playlistIdReducer from "./slices/playlistIdSlice";
import backgroundReducer from "./slices/backgroundSlice";
import playlistReducer from "./slices/playlistSlice";
import recentSearchReducer from "./slices/recentSearchSlice";

export const store = configureStore({
  reducer: {
    backgroundColor: backgroundReducer,
    playlistId: playlistIdReducer,
    playlist: playlistReducer,
    recentSearch: recentSearchReducer,
  },
});
