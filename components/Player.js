import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import useSpotify from "../hooks/useSpotify";
import { setLyrics } from "../slices/lyricsSlice";

import axios from "axios";
import { useRouter } from "next/router";

const Player = () => {
  const dispatch = useDispatch();
  const spotifyApi = useSpotify();
  const currentTrackId = useSelector((state) => state.currentTrack.value);
  const [currentTrack, setCurrentTrack] = useState();
  const router = useRouter();

  useEffect(() => {
    if (spotifyApi.getAccessToken() && currentTrackId !== null) {
      async function fetchData() {
        try {
          const currentTrack = await spotifyApi.getAlbum(currentTrackId);
          setCurrentTrack(currentTrack.body);
        } catch (error) {
          console.error(error);
        }
      }
      fetchData();
    }
  }, [currentTrackId, spotifyApi]);

  const getLyrics = async (TrackName, TrackArtistName) => {
    const res = await axios.get("/api/lyrics", {
      params: {
        artist: TrackArtistName,
        title: TrackName,
      },
    });
    const lyrics = res.data.lyrics;
    if (!lyrics) return;
    dispatch(setLyrics(lyrics));
    router.push("/lyrics");
  };

  const lyricsHandler = () => {
    getLyrics(TrackName, TrackArtistName);
  };

  const TrackImg = currentTrack?.images[0].url;
  const TrackName = currentTrack?.tracks.items[0].name;
  const TrackArtistName = currentTrack?.tracks?.items[0]?.artists;

  return (
    <Wrapper>
      <div className="d-flex align-items-center gap-3">
        {TrackImg ? (
          <Image
            src={TrackImg}
            height="55"
            width="55"
            alt={TrackName}
            unoptimized
          />
        ) : (
          <div className="img"></div>
        )}

        <div>
          <p style={{ color: "#fff" }}>
            {TrackName ? TrackName : "Track Name"}
          </p>
          {TrackArtistName
            ? TrackArtistName.map((artiste) => {
                return (
                  <Link
                    key={artiste.id}
                    className="artiste-item"
                    href={`/artist/${artiste.id}`}
                  >
                    {artiste.name}
                  </Link>
                );
              })
            : "Artist Name"}
        </div>
      </div>

      <div onClick={lyricsHandler}>
        <h5 style={{ textDecoration: "underline", cursor: "pointer" }}>
          view lyrics
        </h5>
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
