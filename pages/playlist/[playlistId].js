import { getSession, useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Songs from "../../components/Songs";
import useBackgroundPicker from "../../hooks/useBackgroundPicker";
import useSpotify from "../../hooks/useSpotify";
import classes from "../../styles/Playlist.module.scss";
import { addPlaylist } from "../../slices/playlistSlice";
import Head from "next/head";
import absoluteUrl from "next-absolute-url";

const Playlist = () => {
  const dispatch = useDispatch();
  const { data: session } = useSession();

  const spotifyApi = useSpotify();
  const playlistId = useSelector((state) => state.playlistId.value);
  const playlist = useSelector((state) => state.playlist.value);

  const [background, setBackground] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await spotifyApi.getPlaylist(playlistId);
        dispatch(addPlaylist(response.body));
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [spotifyApi, playlistId, dispatch]);

  useEffect(() => {
    if (playlist) {
      async function background() {
        const blob = await fetch(playlist.images?.[0].url).then((r) =>
          r.blob()
        );
        console.log(blob);
        setBackground(blob);
      }
      background();
    }
  }, [playlist]);

  useBackgroundPicker(background);

  if (playlist.images) {
    return (
      <>
        <Head>
          <title>Spotify Build - {playlist?.name}</title>
        </Head>
        {playlist.length === 0 ? (
          <div className="loading">
            <h1>loading</h1>
          </div>
        ) : (
          <section>
            <div className={classes.playlist}>
              <div className={classes.head}>
                <div className={classes.img}>
                  <Image
                    src={playlist?.images?.[0].url}
                    width={230}
                    height={230}
                    alt="ok"
                    priority
                  />
                </div>

                <div className={classes.cover}>
                  <p className="d-none d-lg-block">PLAYLIST</p>
                  <h1>{playlist?.name}</h1>
                  <div className="d-flex gap-2">
                    <p>{playlist?.owner?.display_name}</p>
                    <span>.</span>
                    <p>{playlist?.tracks?.total + " " + "songs"}</p>
                  </div>
                </div>
              </div>
            </div>
            <Songs />
          </section>
        )}
      </>
    );
  }
};

export default Playlist;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
}
