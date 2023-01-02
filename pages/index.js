import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import classes from "../styles/Home.module.scss";

export default function Home() {
  return (
    <>
      <Head>
        <title>Spotify Build</title>
        <meta name="description" content="Spotify Build created by @danztee" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className={classes.home}></section>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
}
