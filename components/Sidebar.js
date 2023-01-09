import Link from "next/link";
import SidebarSVG from "./SidebarSVG";

import classes from "../styles/Sidebar.module.scss";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useSpotify from "../hooks/useSpotify";

import { useDispatch } from "react-redux";
import { addPlaylistId } from "../slices/playlistIdSlice";

const Sidebar = () => {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  let user = session?.user.username;
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);

  const dispatch = useDispatch();

  const playlistHandler = (id) => {
    dispatch(addPlaylistId(id));
  };

  return (
    <aside
      id={classes.sidebar}
      className="overflow-y-scroll h-screen scrollbar-hide"
    >
      <div id="spotify-logo" className="d-none d-lg-block">
        <Link href="/" className={classes.sidebarLink}>
          <svg
            viewBox="0 0 1134 340"
            style={{
              width: "100%",
              maxWidth: "131px",
              height: "40px",
              color: "white",
            }}
          >
            <path
              fill="currentColor"
              d="M8 171c0 92 76 168 168 168s168-76 168-168S268 4 176 4 8 79 8 171zm230 78c-39-24-89-30-147-17-14 2-16-18-4-20 64-15 118-8 162 19 11 7 0 24-11 18zm17-45c-45-28-114-36-167-20-17 5-23-21-7-25 61-18 136-9 188 23 14 9 0 31-14 22zM80 133c-17 6-28-23-9-30 59-18 159-15 221 22 17 9 1 37-17 27-54-32-144-35-195-19zm379 91c-17 0-33-6-47-20-1 0-1 1-1 1l-16 19c-1 1-1 2 0 3 18 16 40 24 64 24 34 0 55-19 55-47 0-24-15-37-50-46-29-7-34-12-34-22s10-16 23-16 25 5 39 15c0 0 1 1 2 1s1-1 1-1l14-20c1-1 1-1 0-2-16-13-35-20-56-20-31 0-53 19-53 46 0 29 20 38 52 46 28 6 32 12 32 22 0 11-10 17-25 17zm95-77v-13c0-1-1-2-2-2h-26c-1 0-2 1-2 2v147c0 1 1 2 2 2h26c1 0 2-1 2-2v-46c10 11 21 16 36 16 27 0 54-21 54-61s-27-60-54-60c-15 0-26 5-36 17zm30 78c-18 0-31-15-31-35s13-34 31-34 30 14 30 34-12 35-30 35zm68-34c0 34 27 60 62 60s62-27 62-61-26-60-61-60-63 27-63 61zm30-1c0-20 13-34 32-34s33 15 33 35-13 34-32 34-33-15-33-35zm140-58v-29c0-1 0-2-1-2h-26c-1 0-2 1-2 2v29h-13c-1 0-2 1-2 2v22c0 1 1 2 2 2h13v58c0 23 11 35 34 35 9 0 18-2 25-6 1 0 1-1 1-2v-21c0-1 0-2-1-2h-2c-5 3-11 4-16 4-8 0-12-4-12-12v-54h30c1 0 2-1 2-2v-22c0-1-1-2-2-2h-30zm129-3c0-11 4-15 13-15 5 0 10 0 15 2h1s1-1 1-2V93c0-1 0-2-1-2-5-2-12-3-22-3-24 0-36 14-36 39v5h-13c-1 0-2 1-2 2v22c0 1 1 2 2 2h13v89c0 1 1 2 2 2h26c1 0 1-1 1-2v-89h25l37 89c-4 9-8 11-14 11-5 0-10-1-15-4h-1l-1 1-9 19c0 1 0 3 1 3 9 5 17 7 27 7 19 0 30-9 39-33l45-116v-2c0-1-1-1-2-1h-27c-1 0-1 1-1 2l-28 78-30-78c0-1-1-2-2-2h-44v-3zm-83 3c-1 0-2 1-2 2v113c0 1 1 2 2 2h26c1 0 1-1 1-2V134c0-1 0-2-1-2h-26zm-6-33c0 10 9 19 19 19s18-9 18-19-8-18-18-18-19 8-19 18zm245 69c10 0 19-8 19-18s-9-18-19-18-18 8-18 18 8 18 18 18zm0-34c9 0 17 7 17 16s-8 16-17 16-16-7-16-16 7-16 16-16zm4 18c3-1 5-3 5-6 0-4-4-6-8-6h-8v19h4v-6h4l4 6h5zm-3-9c2 0 4 1 4 3s-2 3-4 3h-4v-6h4z"
            ></path>
          </svg>
        </Link>
      </div>

      <ul className="d-flex" id={classes.firstPart}>
        <li>
          <Link href="/" className={classes.sidebarLink}>
            <SidebarSVG
              height="24"
              width="24"
              view="24"
              className="home-active-icon"
              d="M13.5 1.515a3 3 0 00-3 0L3 5.845a2 2 0 00-1 1.732V21a1 1 0 001 1h6a1 1 0 001-1v-6h4v6a1 1 0 001 1h6a1 1 0 001-1V7.577a2 2 0 00-1-1.732l-7.5-4.33z"
            />
            <span>Home</span>
          </Link>
        </li>

        <li>
          <Link href="/search" className={classes.sidebarLink}>
            <SidebarSVG
              height="24"
              width="24"
              view="24"
              className="search-icon"
              d="M10.533 1.279c-5.18 0-9.407 4.14-9.407 9.279s4.226 9.279 9.407 9.279c2.234 0 4.29-.77 5.907-2.058l4.353 4.353a1 1 0 101.414-1.414l-4.344-4.344a9.157 9.157 0 002.077-5.816c0-5.14-4.226-9.28-9.407-9.28zm-7.407 9.279c0-4.006 3.302-7.28 7.407-7.28s7.407 3.274 7.407 7.28-3.302 7.279-7.407 7.279-7.407-3.273-7.407-7.28z"
            />
            <span>Search</span>
          </Link>
        </li>

        <li>
          <Link href="/collection/playlists" className={classes.sidebarLink}>
            <SidebarSVG
              height="24"
              width="24"
              view="24"
              className="collection-icon"
              d="M14.5 2.134a1 1 0 011 0l6 3.464a1 1 0 01.5.866V21a1 1 0 01-1 1h-6a1 1 0 01-1-1V3a1 1 0 01.5-.866zM16 4.732V20h4V7.041l-4-2.309zM3 22a1 1 0 01-1-1V3a1 1 0 012 0v18a1 1 0 01-1 1zm6 0a1 1 0 01-1-1V3a1 1 0 012 0v18a1 1 0 01-1 1z"
            />
            <span>Your Library</span>
          </Link>
        </li>
      </ul>

      <ul className="second-part d-none d-lg-flex">
        <li>
          <Link href="/" className={classes.sidebarLink}>
            <SidebarSVG
              height="20"
              width="20"
              view="16"
              className="bi bi-plus-square-fill"
              d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z"
            />
            <span>Create Playlist</span>
          </Link>
        </li>

        <li>
          <Link href="/" className={classes.sidebarLink}>
            <SidebarSVG
              height="20"
              width="20"
              view="16"
              className=""
              d="M15.724 4.22A4.313 4.313 0 0012.192.814a4.269 4.269 0 00-3.622 1.13.837.837 0 01-1.14 0 4.272 4.272 0 00-6.21 5.855l5.916 7.05a1.128 1.128 0 001.727 0l5.916-7.05a4.228 4.228 0 00.945-3.577z"
            />
            <span>Liked Songs</span>
          </Link>
        </li>
      </ul>

      <hr />

      <div id={classes.container} className="d-none d-lg-flex">
        {/* playlist */}
        <ul style={{ marginTop: "-1rem" }}>
          {playlists.map((playlist, index) => {
            return (
              <li key={index}>
                <Link
                  href={`/playlist/${playlist.id}`}
                  className={classes.sidebarLink}
                  onClick={() => playlistHandler(playlist.id)}
                >
                  {playlist.name}
                </Link>
              </li>
            );
          })}
        </ul>

        <Link href="/" className={classes.sidebarLink}>
          <SidebarSVG
            height="24"
            width="24"
            view="24"
            className=""
            d="M12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24ZM2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12ZM16.2929 11.2929L13 14.5858V6H11V14.5858L7.70711 11.2929L6.29289 12.7071L11.2929 17.7071L12 18.4142L12.7071 17.7071L17.7071 12.7071L16.2929 11.2929Z"
          />
          <p>Install app</p>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
