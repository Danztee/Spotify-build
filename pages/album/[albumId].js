import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Bottom from "../../components/Bottom";
import Hero from "../../components/Hero";
import Play from "../../components/Play";
import SidebarSVG from "../../components/SidebarSVG";
import useBackgroundPicker from "../../hooks/useBackgroundPicker";
import useSpotify from "../../hooks/useSpotify";

const AlbumId = () => {
  const spotifyApi = useSpotify();
  const [track, setTrack] = useState();
  const { albumId } = useRouter().query;

  const [background, setBackground] = useState();

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      async function fetchData() {
        try {
          const track = await spotifyApi.getTrack(albumId);
          setTrack(track.body);
        } catch (error) {
          console.log(error);
        }
      }
      fetchData();
    }
  }, [albumId, spotifyApi]);

  useEffect(() => {
    if (track) {
      async function background() {
        const blob = await fetch(track.album.images[0].url).then((r) =>
          r.blob()
        );
        setBackground(blob);
      }
      background();
    }
  }, [track]);

  useBackgroundPicker(background);

  return (
    <div>
      {track && (
        <Wrapper>
          <Hero
            image={track.album.images[0].url}
            album_type={track.album.album_type}
            name={track?.album.name}
            type={track.type}
            artists={track.album.artists}
            releaseDate={track.album.release_date}
            total={track.album.total_tracks}
            duration={track.duration_ms}
          />

          <aside className="" style={{ marginTop: "3rem" }}>
            <div className="playMore">
              <Play size={30} />

              <div className="more">
                <SidebarSVG
                  height="27"
                  width="27"
                  view="27"
                  className=""
                  d="M4.5 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm15 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm-7.5 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                />
              </div>
            </div>

            <div className="header d-none d-lg-grid">
              <p>#</p>
              <p>TITLE</p>
              <SidebarSVG
                height="24"
                width="24"
                view="24"
                className=""
                d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z"
                e="M8 3.25a.75.75 0 01.75.75v3.25H11a.75.75 0 010 1.5H7.25V4A.75.75 0 018 3.25z"
              />
            </div>

            <Bottom music={track} type={track.type} />
          </aside>
        </Wrapper>
      )}
    </div>
  );
};

const Wrapper = styled.div`
  color: white;

  .playMore {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: end;

    padding-top: 1.5rem;

    @media screen and (min-width: 992px) {
      justify-content: start;
      gap: 2rem;

      padding-top: 0;
    }

    .more {
      transform: rotate(90deg);

      @media screen and (min-width: 992px) {
        transform: rotate(0);
      }
    }
  }

  .header {
    margin-top: 2rem;
    display: grid;
    grid-template-columns: 30px 10fr 1fr;
    border-bottom: solid 1px #fff;
    padding-left: 1rem;
    padding-bottom: 0.5rem;
    border-bottom-width: thin;
  }
`;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}

export default AlbumId;
