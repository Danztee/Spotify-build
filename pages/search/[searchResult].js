import { getSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import useSpotify from "../../hooks/useSpotify";
import millisToMinutesAndSeconds from "../../lib/time";

const SearchResult = ({ search }) => {
  const spotifyApi = useSpotify();
  const router = useRouter();
  const { searchResult } = router.query;
  console.log(searchResult);

  const [searchedArtist, setSearchedArtist] = useState();
  const [searchedTracks, setSearchedTracks] = useState([]);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      async function fetchData() {
        try {
          const searchArtists = await spotifyApi.searchArtists(searchResult);
          const searchTracks = await spotifyApi.searchTracks(searchResult);

          setSearchedArtist(searchArtists.body.artists.items[0]);
          setSearchedTracks(searchTracks.body.tracks.items.slice(0, 4));

          console.log();
        } catch (error) {
          console.error(error);
        }
      }
      fetchData();
    }
  }, [spotifyApi]);

  const artistName = searchedArtist?.name;
  const artistPic = searchedArtist?.images[0];

  return (
    <Wrapper className="row mt-3">
      <aside className="col">
        <h5>Top results</h5>
        <div className="artist mt-4 cardCover">
          <Image
            src={artistPic?.url}
            width={100}
            height={100}
            alt={artistName}
            className="mt-3"
          />
          <h3 style={{ fontWeight: "bold" }} className="mt-4">
            {artistName}
          </h3>
          <p className="stagnant mt-1">ARTIST</p>
        </div>
      </aside>

      <aside className="col">
        <h5>Songs</h5>
        <div className="songContainer mt-4">
          {searchedTracks.map((track, index) => {
            const name = track.artists[0].name;
            const song = track.name;
            const image = track.album.images[1].url;
            const duration = track.duration_ms;
            return (
              <div id="mt-5" key={index} className="cover">
                <Image src={image} width="50" height="50" alt={"song"} />

                <div className="music">
                  <span>{song}</span>
                  <span>{name}</span>
                </div>

                <span className="duration">
                  {millisToMinutesAndSeconds(duration)}
                </span>
              </div>
            );
          })}
        </div>
      </aside>
    </Wrapper>
  );
};

export default SearchResult;

const Wrapper = styled.div`
  color: #fff;

  .cardCover {
    background-color: #1a1a1a;
    width: 100%;
    height: 16rem;
    border-radius: 10px;
    padding: 1rem;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }

  .songContainer {
    padding: 0.5rem !important;

    display: flex;
    flex-direction: column;
    gap: 1rem;

    .cover {
      display: flex;
      gap: 1rem;
      align-items: center;

      display: grid;
      grid-template-columns: 3.5rem 70% 1fr;

      .music {
        display: flex;
        flex-direction: column;
      }
    }
  }

  .artist {
    img {
      border-radius: 50%;
    }

    .stagnant {
      background: #121212;
      width: fit-content;
      padding: 2px 15px;
      border-radius: 20px;
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
