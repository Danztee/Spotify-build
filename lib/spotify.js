import SpotifyWebApi from "spotify-web-api-node";

const scopes = [
  "user-read-email",
  "playlist-read-private",
  "playlist-read-collaborative",
  "streaming",
  "user-read-private",
  // "user-library-end",
  // "user-top-read",
  // "user-library-modify",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-follow-read",
  //

  // " user-read-playback-position",
  // "user-library-modify",
  // "user-read-email",
  // "playlist-modify-private",
  // "playlist-read-private",
  // "playlist-read-collaborative",
  // "user-follow-read",
  // "user-read-playback-state",
  // "user-read-currently-playing",

  // "user-library-read",
].join(",");

const params = {
  scope: scopes,
};

const queryParamString = new URLSearchParams(params);

export const LOGIN_URL =
  "https://accounts.spotify.com/authorize?" + queryParamString.toString();
// export const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString.toString()}`;

const spotifyAPI = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

export default spotifyAPI;
