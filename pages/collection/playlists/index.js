import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Card from "../../../components/Card";
import useSpotify from "../../../hooks/useSpotify";
import { addPlaylistId } from "../../../slices/playlistIdSlice";

const Collection = () => {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const dispatch = useDispatch();

  const [playlists, setPlaylists] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);

  function clickHandler(id) {
    dispatch(addPlaylistId(id));
    router.push(`/playlist/${id}`);
  }

  return (
    <>
      <Head>
        <title>Spotify Build - Your Library</title>
      </Head>
      <Wrapper>
        <h5>Playlists</h5>

        <div className="cover mt-4">
          {playlists.map((playlist, index) => {
            return (
              <div
                onClick={() => {
                  clickHandler(playlist.id);
                }}
                key={index}
              >
                <Card
                  img={playlist.images[0].url}
                  name={playlist.name}
                  role={`By ${playlist.owner.display_name}`}
                  width="235px"
                />
              </div>
            );
          })}
        </div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  color: #fff;

  h5 {
    font-weight: bold;
  }

  .cover {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    gap: 3rem;

    @media screen and (min-width: 992px) {
      flex-direction: row;
      gap: 1rem;
    }
  }
`;

export default Collection;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
