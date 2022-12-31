import Head from "next/head";
import Sidebar from "./Sidebar";
import { useRouter } from "next/router";

function Layout({ children }) {
  const router = useRouter();
  console.log(router);

  return (
    <>
      <div
        className={`bg-black h-screen overflow-hidden ${
          router.pathname === "/" && "flex"
        }`}
        style={{ padding: "1.5rem 0" }}
      >
        {router.pathname === "/" && <Sidebar />}
        <main>{children}</main>
        <footer>{/* player */}</footer>
      </div>
    </>
  );
}

export default Layout;
