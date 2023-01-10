import React from "react";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import useSpotify from "../hooks/useSpotify";
import { setLyrics, setTitle, setName } from "../slices/lyricsSlice";

import axios from "axios";
import { useRouter } from "next/router";

const Player = () => {
  const dispatch = useDispatch();
  const spotifyApi = useSpotify();
  const currentTrackId = useSelector((state) => state.currentTrack.value);
  const [currentTrack, setCurrentTrack] = useState();
  const router = useRouter();

  const { pathname } = useRouter();

  useEffect(() => {
    if (spotifyApi.getAccessToken() && currentTrackId !== null) {
      async function fetchData() {
        try {
          if (
            pathname === "/playlist/[playlistId]" ||
            pathname === "/album/[albumId]" ||
            pathname === "/artist/[artistId]"
          ) {
            const currentTrack = await spotifyApi.getTrack(currentTrackId);
            setCurrentTrack(currentTrack.body);
          } else {
            const currentTrack = await spotifyApi.getAlbum(currentTrackId);
            setCurrentTrack(currentTrack.body);
          }
        } catch (error) {
          console.log(error);
        }
      }
      fetchData();
    }
  }, [currentTrackId, spotifyApi, pathname]);

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

  const TrackImg =
    currentTrack?.album?.images[0].url || currentTrack?.images[0].url;
  const TrackName =
    currentTrack?.album_type === "album"
      ? currentTrack?.tracks.items[0].name
      : currentTrack?.name;
  const TrackArtistName = currentTrack?.artists;

  if (TrackArtistName && TrackName) {
    dispatch(setTitle(TrackName));
    dispatch(setName(TrackArtistName[0].name));
  }

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
          lyrics
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
export default React.memo(Player);
