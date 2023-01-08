import { configureStore } from "@reduxjs/toolkit";
import playlistIdReducer from "./slices/playlistIdSlice";
import backgroundReducer from "./slices/backgroundSlice";
import playlistReducer from "./slices/playlistSlice";
import recentSearchReducer from "./slices/recentSearchSlice";
import currentTrackReducer from "./slices/currentTrackIdSlice";
import isPlayingReducer from "./slices/isPlayingSlice";

export const store = configureStore({
  reducer: {
    backgroundColor: backgroundReducer,
    playlistId: playlistIdReducer,
    playlist: playlistReducer,
    recentSearch: recentSearchReducer,
    currentTrack: currentTrackReducer,
    isPlaying: isPlayingReducer,
  },
});
