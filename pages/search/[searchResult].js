import { getSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../../components/Card";
import Play from "../../components/Play";
import useSpotify from "../../hooks/useSpotify";
import millisToMinutesAndSeconds from "../../lib/time";

const SearchResult = () => {
  const spotifyApi = useSpotify();
  const router = useRouter();
  const { searchResult } = router.query;

  const [searchedArtist, setSearchedArtist] = useState();
  const [searchedTracks, setSearchedTracks] = useState();
  const [relatedArtists, setRelatedArtists] = useState();

  const [hover, setHover] = useState(false);
  const [hover2, setHover2] = useState(false);

  const handleHover = () => {
    setHover(true);
  };
  const handleOut = () => {
    setHover(false);
  };

  function handleHover2(e) {}

  const handleOut2 = () => {
    setHover2(false);
  };

  const clickHandler = () => {
    router.push(`/artist/${searchedArtist.id}`);
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      async function fetchData() {
        try {
          const searchArtists = await spotifyApi.searchArtists(searchResult);
          const searchTracks = await spotifyApi.searchTracks(searchResult);
          await spotifyApi.getArtistRelatedArtists(
            searchArtists.body.artists.items[0].id
          );

          setSearchedArtist(searchArtists.body.artists.items[0]);
          setSearchedTracks(searchTracks.body.tracks.items.slice(0, 4));
          setRelatedArtists(searchArtists.body.artists.items.slice(1, 5));
        } catch (error) {
          console.error(error);
        }
      }
      fetchData();
    }
  }, [spotifyApi, searchResult]);

  const artistName = searchedArtist?.name;
  const artistPic = searchedArtist?.images;

  return (
    <>
      <Head>
        <title>Spotify Build - Search</title>
      </Head>
      {searchedArtist === undefined || searchedTracks === undefined ? (
        <div className="loading">
          <h1>loading</h1>
        </div>
      ) : (
        <Wrapper className="row mt-3">
          <aside className="col-sm-12 col-md-6">
            <h5>Top results</h5>
            <div
              className="artist mt-4 cardCover"
              onMouseEnter={handleHover}
              onMouseLeave={handleOut}
              onClick={clickHandler}
            >
              {hover && (
                <div id="cover">
                  <Play />
                </div>
              )}
              <Image
                src={artistPic[1]?.url}
                width={100}
                height={100}
                alt={artistName}
                className="mt-3"
                unoptimized
              />
              <h3 style={{ fontWeight: "bold" }} className="mt-4">
                <Link
                  href={`/artist/${searchedArtist.id}`}
                  style={{ color: "#fff" }}
                >
                  {artistName}
                </Link>
              </h3>
              <p className="stagnant mt-1">ARTIST</p>
            </div>
          </aside>

          <aside className="col-sm-12 col-md-6" id="small">
            <h5>Songs</h5>
            <div className="songContainer mt-4">
              {searchedTracks.map((track, index) => {
                const name = track.artists;
                const song = track.name;
                const image = track.album.images[0]?.url;
                const duration = track.duration_ms;

                return (
                  <div
                    id="mt-5"
                    key={index}
                    className="cover"
                    onMouseEnter={(e) => handleHover2(e)}
                    onMouseLeave={handleOut2}
                  >
                    <div style={{ position: "relative" }}>
                      {hover2 && (
                        <Play
                          style={{
                            position: "absolute",
                            background: "none",
                            color: "#fff",
                            padding: "0",
                            left: "5px",
                            top: "10px",
                          }}
                          size={20}
                        />
                      )}
                      <Image
                        src={image}
                        width="50"
                        height="50"
                        alt={"song"}
                        unoptimized
                      />
                    </div>

                    <div className="music">
                      <span>
                        {`${song.substring(0, 25)}`}
                        {song.length > 25 ? "..." : ""}
                      </span>

                      <div>
                        {name.map((artiste) => {
                          return (
                            <Link
                              key={artiste.id}
                              className="artiste-item"
                              href={`/artist/${artiste.id}`}
                            >
                              {artiste?.name}
                            </Link>
                          );
                        })}
                      </div>
                    </div>

                    <span className="duration">
                      {millisToMinutesAndSeconds(duration)}
                    </span>
                  </div>
                );
              })}
            </div>
          </aside>

          <div className="mt-5">
            <h3>Related Artists</h3>
            <div className="d-flex flex-wrap gap-3 mt-3 justify-content-center">
              {relatedArtists.map((topArtist, index) => {
                const name = topArtist.name;
                const img = topArtist.images[0]?.url;
                return (
                  <Card
                    name={name}
                    img={img}
                    key={index}
                    width="235px"
                    radius="50%"
                    role="Artist"
                    id={topArtist.id}
                    type={topArtist.type}
                  />
                );
              })}
            </div>
          </div>
        </Wrapper>
      )}
    </>
  );
};

const Wrapper = styled.div`
  color: #fff;

  #small {
    margin-top: 3rem;
    @media screen and (min-width: 992px) {
      margin-top: 0;
    }
  }
  .cardCover {
    background-color: #1a1a1a;
    width: 100%;
    height: 16rem;
    border-radius: 10px;
    padding: 1rem;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    position: relative;
    cursor: pointer;

    &:hover {
      background-color: #242424;
    }
  }

  .songContainer {
    display: flex;
    flex-direction: column;

    .cover {
      display: flex;
      gap: 1rem;
      align-items: center;

      display: grid;
      grid-template-columns: 3.5rem 70% 1fr;
      padding: 0.4rem;

      &:hover {
        background-color: #242424;
        border-radius: 5px;

        img {
          opacity: 0.5;
        }
      }

      .music {
        display: flex;
        flex-direction: column;

        span {
          font-size: 17px;
        }

        a {
          font-size: 14px;
        }
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

  #link {
    color: grey;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
      width: fit-content;
    }
  }

  #cover {
    position: absolute;
    transition: background-color 1s ease;
    width: 100%;
    display: flex;
    justify-content: end;

    right: 1rem;
    margin-top: 10rem;
  }
`;

export default SearchResult;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
