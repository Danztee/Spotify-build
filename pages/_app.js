import { SessionProvider } from "next-auth/react";
import Header from "../components/Header";
import Layout from "../components/Layout";
import "../styles/globals.css";
import { store } from "../store";
import { Provider } from "react-redux";
import { AppProps } from "next/app";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Layout>
          {session && <Header />}
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </SessionProvider>
  );
}
