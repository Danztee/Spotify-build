import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import RecentlyPlayed from "../components/RecentlyPlayed";
import useSpotify from "../hooks/useSpotify";
import classes from "../styles/Home.module.scss";

import useBackgroundPicker from "../hooks/useBackgroundPicker";
import { useDispatch } from "react-redux";
import TopArtists from "../components/TopArtists";
import TopTracks from "../components/TopTracks";
import Recommendation from "../components/Recommendation";
import useSWR from "swr";

export default function Home() {
  const spotifyApi = useSpotify();

  const { data: session } = useSession();
  const [recentlyPlayed, setRecentlyPlayed] = useState();
  const [topArtists, setTopArtists] = useState();
  const [topTracks, setTopTracks] = useState();
  const [recommendations, setRecommendations] = useState();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      async function fetchData() {
        try {
          const recentlyPlayed = await spotifyApi.getMyRecentlyPlayedTracks();
          setRecentlyPlayed(recentlyPlayed.body.items.slice(0, 6));

          const topArtist = await spotifyApi.getMyTopArtists();
          setTopArtists(topArtist.body.items.slice(0, 4));

          const topTracks = await spotifyApi.getMyTopTracks();
          setTopTracks(topTracks.body.items.slice(0, 4));

          const recommendations = await spotifyApi.getNewReleases();
          setRecommendations(recommendations.body.albums.items.slice(0, 8));
        } catch (error) {
          console.error(error);
        }
      }
      fetchData();
    }
  }, [session, spotifyApi]);

  useEffect(() => {
    if (
      recentlyPlayed &&
      topArtists &&
      topTracks &&
      recommendations !== undefined
    ) {
      setLoading(false);
    }
  }, [recentlyPlayed, topArtists, topTracks, recommendations]);

  // useBackgroundPicker(recentlyPlayed[0]?.track.album.images[0].url);

  return (
    <>
      {loading ? (
        <div className="loading">
          <h1>loading</h1>
        </div>
      ) : (
        <section className="mt-2" id={classes.index}>
          <h2>Good evening</h2>

          <div className="d-flex flex-wrap gap-3 mt-4">
            {recentlyPlayed.map((recent, index) => {
              const name = recent.track.album.name;
              const img = recent.track.album.images[0].url;
              return <RecentlyPlayed key={index} img={img} name={name} />;
            })}
          </div>

          <div className="mt-5">
            <h3>My Top Artists</h3>
            <div className="d-flex flex-wrap gap-3 mt-3 justify-content-center">
              {topArtists.map((topArtist, index) => {
                const name = topArtist.name;
                const img = topArtist.images[0].url;
                const id = topArtist.id;
                return (
                  <TopArtists
                    name={name}
                    img={img}
                    key={index}
                    type={topArtist.type}
                    id={id}
                  />
                );
              })}
            </div>
          </div>

          <div className="mt-5">
            <h3>My Top Tracks</h3>
            <div className="d-flex flex-wrap gap-3 mt-3 justify-content-center">
              {topTracks.map((topTrack, index) => {
                const name = topTrack?.album.artists[0].name;
                const trackName = topTrack?.album.name;
                const img = topTrack?.album.images[0].url;
                return (
                  <TopTracks
                    name={name}
                    img={img}
                    key={index}
                    trackName={trackName}
                    type={topTrack.type}
                    id={topTrack.id}
                  />
                );
              })}
            </div>
          </div>

          <div className="mt-5">
            <h3>Recommendations for you</h3>
            <div className="d-flex flex-wrap gap-3 mt-3 justify-content-center">
              {recommendations.map((recommendation, index) => {
                const name = recommendation?.artists[0].name;
                const trackName = recommendation?.name;
                const img = recommendation?.images[0].url;
                return (
                  <Recommendation
                    name={name}
                    img={img}
                    key={index}
                    trackName={trackName}
                  />
                );
              })}
            </div>
          </div>
        </section>
      )}
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
