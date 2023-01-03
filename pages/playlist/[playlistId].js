import { getSession, useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Songs from "../../components/Songs";
import useBackgroundPicker from "../../hooks/useBackgroundPicker";
import useSpotify from "../../hooks/useSpotify";
import classes from "../../styles/Playlist.module.scss";
import { addPlaylist } from "../../slices/playlistSlice";

// let img = "";
const Playlist = () => {
  const dispatch = useDispatch();
  const { data: session } = useSession();

  const spotifyApi = useSpotify();
  const playlistId = useSelector((state) => state.playlistId.value);
  const playlist = useSelector((state) => state.playlist.value);
  const [imgURL, setImgURL] = useState();

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

  // if (playlist.length === undefined) {
  //   img = playlist.images[0].url;
  // }

  useBackgroundPicker(playlist.images?.[0].url);

  if (playlist.images) {
    return (
      <section>
        <div className={classes.playlist}>
          <div className={classes.head}>
            <Image
              src={playlist?.images?.[0].url}
              width={230}
              height={230}
              alt="ok"
              priority
            />

            <div style={{ marginTop: "4rem" }}>
              <p>PLAYLIST</p>
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
