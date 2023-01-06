import { getSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Bottom from "../../components/Bottom";
import Hero from "../../components/Hero";
import Play from "../../components/Play";
import SidebarSVG from "../../components/SidebarSVG";
import Songs from "../../components/Songs";
import useSpotify from "../../hooks/useSpotify";

import { changeImage } from "../../slices/backgroundSlice";

const ArtistId = () => {
  const spotifyApi = useSpotify();
  const [artist, setArtist] = useState();
  const [topTracks, setTopTracks] = useState();
  const { artistId } = useRouter().query;

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      async function fetchData() {
        const artist = await spotifyApi.getArtist(artistId);
        setArtist(artist.body);
        const topTracks = await spotifyApi.getArtistTopTracks(artistId, "GB");
        setTopTracks(topTracks.body.tracks.slice(0, 5));
        try {
        } catch (error) {
          console.log(error);
        }
      }
      fetchData();
    }
  }, [spotifyApi, artistId]);

  return (
    <>
      {artist && (
        <Wrapper>
          <Hero
            image={artist.images[0].url}
            name={artist.name}
            type={artist.type}
          />

          <aside id="aside">
            <div className="playMore">
              <Play size={30} />

              <div className="more">
                <SidebarSVG
                  height="27"
                  width="27"
                  view="27"
                  className=""
                  d="M4.5 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm15 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm-7.5 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                />
              </div>
            </div>

            <Bottom topTracks={topTracks} type={artist.type} />
          </aside>
        </Wrapper>
      )}
    </>
  );
};

export default ArtistId;

const Wrapper = styled.div`
  color: white;
  padding: 1rem 2rem;

  #aside {
    margin-top: 1rem;

    @media screen and (min-width: 992px) {
      margin-top: 3rem;
    }
  }

  .playMore {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: end;

    @media screen and (min-width: 992px) {
      justify-content: start;
      gap: 2rem;
    }

    .more {
      transform: rotate(90deg);

      @media screen and (min-width: 992px) {
        transform: rotate(0);
      }
    }
  }
`;
export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
