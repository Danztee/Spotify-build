import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import useSpotify from "../hooks/useSpotify";

const Player = () => {
  const spotifyApi = useSpotify();
  const currentTrackId = useSelector((state) => state.currentTrack.value);
  const [currentTrack, setCurrentTrack] = useState();

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

  // if (!currentTrackId) return;
  // console.log(currentTrack);

  const TrackImg = currentTrack?.images[1].url;
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
          <p style={{ color: "#fff" }}>{TrackName ? TrackName : "TrackName"}</p>
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
