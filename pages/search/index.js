import { useSession, getSession } from "next-auth/react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import useSpotify from "../../hooks/useSpotify";
import Card from "../../components/Card";
import { useEffect, useState } from "react";
import TopTracks from "../../components/TopTracks";
import Head from "next/head";

const Search = () => {
  const spotifyApi = useSpotify();
  const recentlySearched = useSelector((state) => state.recentSearch.value);
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    recentlySearched.map(async (search) => {
      if (spotifyApi.getAccessToken()) {
        const res = await spotifyApi.searchArtists(search);
        setRecent((prev) => {
          return [...prev, res.body.artists.items[0]];
        });
      }
    });
  }, [recentlySearched, spotifyApi]);

  const newRecent = recent.reverse().slice(-8);

  return (
    <>
      <Head>
        <title>Spotify Build - Search</title>
      </Head>
      {newRecent.length === 0 ? (
        <div className="loading">
          <h1>No recent tracks found</h1>
        </div>
      ) : (
        <Wrapper className="mt-3">
          <h3>Recent searches</h3>

          <div className="d-flex mt-3 flex-wrap" id="cover">
            {newRecent.map((recently, index) => {
              return (
                <Card
                  name={recently?.name}
                  img={recently?.images[0].url}
                  key={index}
                  radius="50%"
                  role="artist"
                  width="230px"
                  style={{ height: "18rem" }}
                />
              );
            })}
          </div>
        </Wrapper>
      )}
    </>
  );
};

export default Search;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}

const Wrapper = styled.div`
  color: #fff;

  #cover {
    justify-content: center;
    gap: 3rem;

    @media screen and (min-width: 992px) {
      justify-content: start;
      gap: 1rem;
    }
  }
`;
