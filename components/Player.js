import { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import useSpotify from "../hooks/useSpotify";

const Player = () => {
  const spotifyApi = useSpotify();
  const currentTrackId = useSelector((state) => state.currentTrack.value);

  useEffect(() => {
    if (spotifyApi.getAccessToken() && currentTrackId !== null) {
      async function fetchData() {
        try {
          const currentTrack = await spotifyApi.getAlbum(currentTrackId);
          console.log(currentTrack);
        } catch (error) {
          console.error(error);
        }
      }
      fetchData();
    }
  }, [currentTrackId, spotifyApi]);

  return (
    <Wrapper>
      <div className="d-flex align-items-center gap-3">
        <div className="img"></div>
        <div>
          <p style={{ color: "#fff" }}>Emiliana</p>
          <p style={{ fontSize: "14px" }}>ckay</p>
        </div>
      </div>

      <div>
        <h4 style={{ textDecoration: "underline", cursor: "pointer" }}>
          view lyrics
        </h4>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  z-index: 99999999;

  padding: 1rem 1rem;

  background-color: #2a2a2a;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100vw;

  .img {
    height: 55px;
    width: 55px;
    background: red;
  }
`;
export default Player;
