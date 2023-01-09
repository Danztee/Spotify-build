import { SessionProvider } from "next-auth/react";
import Header from "../components/Header";
import Layout from "../components/Layout";
import "../styles/globals.css";
import { store } from "../store";
import { Provider, useSelector } from "react-redux";
import { AppProps } from "next/app";
import Head from "next/head";
import Image from "next/image";
import FooterLinks from "../components/FooterLinks";
import { useRouter } from "next/router";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const router = useRouter();
  const { pathname } = router;
  let backgroundImage = "";
  if (typeof window !== "undefined") {
    backgroundImage = localStorage.getItem("backgroundImage");
  }

  return (
    <>
      <Head>
        <title>Spotify Build</title>
        <meta name="description" content="Spotify Build created by @danztee" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SessionProvider session={session}>
        <Provider store={store}>
          <Layout>
            {session && <Header />}
            <Component {...pageProps} />
            {pathname !== "/lyrics" && session && <FooterLinks />}
          </Layout>
        </Provider>
      </SessionProvider>
    </>
  );
}
