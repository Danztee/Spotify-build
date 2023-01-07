import Sidebar from "./Sidebar";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";

function Layout({ children }) {
  const { data: session } = useSession();

  const router = useRouter();
  const { pathname } = router;
  const backgroundColor = useSelector((state) => state.backgroundColor.value);

  let background = `linear-gradient(180deg, ${backgroundColor}, #121212 60%)`;

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
