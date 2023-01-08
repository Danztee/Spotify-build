import SpotifyPlayer from "react-spotify-web-playback";

const Player = (uri) => {
  console.log(uri);
  return (
    <SpotifyPlayer
      token="BQAguxWKpb9g6SJbdFMLytg9sIrGdyxepoNISYCbGAx_0OXV-yMsY0EL4Es_Rll7uhxMcPmThMaO3oCdMHpcx9msaBKninP6TxusxTeWgY2q-BKw3KAOCtm5FLCy9REmbvfaNY6YAPUaDjkJM2APo8dsx7I9wfQChuLEXJFtYIOW3tpOqXUTI3xT98qJldvK8nTw8uUBotv1d71nRzUhzcO1Y_23kAEmG8bRW3GwSfM-yzS8ZUZzPYDcIA"
      uris={uri ? [uri] : []}
    />
  );
};

export default Player;
