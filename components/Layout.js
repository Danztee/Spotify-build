import Head from "next/head";
import Sidebar from "./Sidebar";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";

function Layout({ children }) {
  const { data: session } = useSession();

  const router = useRouter();
  const { pathname } = router;
  const backgroundColor = useSelector((state) => state.backgroundColor.value);

  let back = "";
  {
    back =
      pathname === "/playlist/[playlistId]"
        ? `linear-gradient(180deg, ${backgroundColor}, black 70%)`
        : "rgb(56, 72, 48, 0.4)";
  }

  return (
    <>
      <div className="w-100" id="spotify">
        {pathname !== "/login" && <Sidebar />}
        <main style={{ background: session && back }}>{children}</main>
        <footer>{}</footer>
      </div>
    </>
  );
}

export default Layout;
