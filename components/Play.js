import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import useSpotify from "../hooks/useSpotify";
import { addCurrentTrack } from "../slices/currentTrackIdSlice";
import SidebarSVG from "./SidebarSVG";
// import SpotifyPlayer from "react-spotify-web-playback";

const Play = ({ style, className, size, id, uri }) => {
  const dispatch = useDispatch();
  const spotifyApi = useSpotify();

  const playHandler = (e) => {
    e.stopPropagation();
    // console.log(id);
    // console.log(uri);
    dispatch(addCurrentTrack(id));
    // spotifyApi.play({
    //   uris: uri,
    // });

    // console.log(e.currentTarget.parentElement.parentElement);
    // console.log("clicked");
  };

  return (
    <Wrapper onClick={playHandler} style={style} className={className}>
      <div className="cover">
        <SidebarSVG
          height={size ? size : "24"}
          width={size ? size : "24"}
          view="24"
          className=""
          d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"
        />
      </div>
    </Wrapper>
  );
};

export default Play;

const Wrapper = styled.div`
  background: #1ed760;
  width: fit-content;
  padding: 0.7rem;
  border-radius: 50%;
  color: #000;
  cursor: pointer;
  transition: background-color 1s ease;
  /* z-index: 999; */

  .cover {
    width: fit-content;
  }
`;
