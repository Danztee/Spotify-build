import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Spotify Build</title>
        <meta name="description" content="Spotify Build created by @danztee" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.10.3/bootstrap-icons.svg" />
      </Head>

      <section className="flex flex-grow">
        <h1>home page</h1>
      </section>
    </>
  );
}
