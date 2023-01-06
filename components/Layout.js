import Head from "next/head";
import Sidebar from "./Sidebar";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import Image from "next/image";

function Layout({ children }) {
  const { data: session } = useSession();

  const router = useRouter();
  const { pathname } = router;
  const backgroundColor = useSelector((state) => state.backgroundColor.value);
  const backgroundImg = useSelector((state) => state.backgroundColor.image);

  let background = `linear-gradient(180deg, ${backgroundColor}, #121212 30%)`;
  // if (pathname === "/artist/[artistId]") {
  //   background = `url(${backgroundImg})`;
  // } else if (
  //   pathname === "/search/[searchResult]" ||
  //   pathname === "/search" ||
  //   pathname === "/collection/playlists"
  // ) {
  //   background = "#121212";
  // } else {
  //   background = `linear-gradient(180deg, ${backgroundColor}, black 70%)`;
  // }

  return (
    <>
      <div className="w-100" id="spotify">
        {pathname !== "/login" && <Sidebar />}
        <main>
          <div style={{ background: session && background }} id="main">
            {children}
          </div>
        </main>
        <footer>{}</footer>
      </div>
    </>
  );
}

export default Layout;
