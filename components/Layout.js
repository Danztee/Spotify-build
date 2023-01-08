import Sidebar from "./Sidebar";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import Player from "./Player";
import FooterLinks from "./FooterLinks";

function Layout({ children }) {
  const { data: session } = useSession();

  const router = useRouter();
  const { pathname } = router;
  const backgroundColor = useSelector((state) => state.backgroundColor.value);

  let background = "#121212";
  if (
    pathname === "/search/[searchResult]" ||
    pathname === "/search" ||
    pathname === "/collection/playlists" ||
    pathname === "/artist/artistId"
  ) {
    background = "#121212";
  } else {
    background = `linear-gradient(180deg, ${backgroundColor}, #121212 40%)`;
  }

  return (
    <>
      <div className="w-100" id="spotify">
        {pathname !== "/login" && <Sidebar />}
        <main>
          <div style={{ background: session && background }} id="main">
            {children}
          </div>
          <FooterLinks />
        </main>
        {pathname !== "/login" && (
          <footer className="none">
            <Player />
          </footer>
        )}
      </div>
    </>
  );
}

export default Layout;
