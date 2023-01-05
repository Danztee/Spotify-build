import React from "react";
import SidebarSVG from "../components/SidebarSVG";
import Image from "next/image";
import classes from "../styles/Home.module.scss";

import { useSession, signOut } from "next-auth/react";
import SearchBar from "./SearchBar";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const Header = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { pathname } = router;

  const backgroundColor = useSelector((state) => state.backgroundColor.value);

  let newName = "";
  if (session?.user.name.length > 11) {
    newName = `${session?.user.name.substring(0, 13)}...`;
  }

  let background = "";
  if (
    pathname === "/search/[searchResult]" ||
    pathname === "/search" ||
    pathname === "/collection/playlists",
    pathname === "/artist/artistId"
  ) {
    background = "#121212";
  } else if (pathname === "/artist/[artistId]") {
    background = null;
  } else {
    background = `${backgroundColor}`;
  }

  return (
    <header id={classes.header}>
      <div id={classes.bottom} style={{ background }}>
        <div id={classes.buttonContainer}>
          <div className="d-none d-lg-flex gap-3">
            <button className={classes.btn}>
              <SidebarSVG
                height="24"
                width="24"
                view="24"
                className="back"
                d="M15.957 2.793a1 1 0 010 1.414L8.164 12l7.793 7.793a1 1 0 11-1.414 1.414L5.336 12l9.207-9.207a1 1 0 011.414 0z"
              />
            </button>
            <button className={classes.btn}>
              <SidebarSVG
                height="24"
                width="24"
                view="24"
                className="front"
                d="M8.043 2.793a1 1 0 000 1.414L15.836 12l-7.793 7.793a1 1 0 101.414 1.414L18.664 12 9.457 2.793a1 1 0 00-1.414 0z"
              />
            </button>
          </div>

          {router.pathname === "/search" && <SearchBar />}
        </div>

        <div
          id={classes.usernameContainer}
          onClick={() => {
            signOut();
          }}
        >
          {session && (
            <Image
              src={session.user.image}
              alt={session.user.name}
              width="30"
              height="30"
            />
          )}
          <p className="text-white d-none d-lg-block">{newName}</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-chevron-down"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </div>
      </div>
    </header>
  );
};

export default Header;
