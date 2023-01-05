import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import styled from "styled-components";
import useSpotify from "../hooks/useSpotify";
import millisToMinutesAndSeconds from "../lib/time";

const Bottom = ({ id, topTracks, music, type }) => {
  console.log(music);
  const release_date = new Date(music?.album.release_date)
    .toDateString()
    .slice(4);

  if (type === "track") {
    return (
      <Wrapper type={type}>
        <ul>
          <li className="song">
            <p>1</p>

            <div className="title">
              <p>
                <span style={{ color: "#fff" }}>{music?.album.name}</span>{" "}
                <br />
                {music?.album.artists.map((artiste) => {
                  return (
                    <Link key={artiste.id} className="artiste-item" href="/">
                      {artiste.name}
                    </Link>
                  );
                })}
              </p>
            </div>

            <div className="duration">
              {millisToMinutesAndSeconds(music?.duration_ms)}
            </div>
          </li>
        </ul>

        <p className="mt-4" style={{ color: "#b3b3b3" }}>
          {release_date}
        </p>
      </Wrapper>
    );
  }

  if (type === "artist") {
    return (
      <Wrapper type={type}>
        <h4 style={{ fontWeight: "bold" }}>Popular</h4>

        <ul className="songs">
          {topTracks?.map((track, index) => {
            return (
              <li key={index} className="song">
                <p>{index + 1}</p>

                <div className="title">
                  <Image
                    src={track?.album.images[0].url}
                    width="50"
                    height="50"
                    alt="ok"
                  />
                  <span style={{ color: "#fff" }}>{track?.name}</span> <br />
                </div>

                <div className="duration">
                  {millisToMinutesAndSeconds(track?.duration_ms)}
                </div>
              </li>
            );
          })}
        </ul>
      </Wrapper>
    );
  }
};

const Wrapper = styled.div`
  color: white;
  margin-top: ${({ type }) => (type === "artist" ? "2rem" : "")};

  .songs {
    margin-left: 0.5rem;

    @media screen and (min-width: 992px) {
      margin-left: 1rem;
    }
  }

  .song {
    padding: 1rem 0;
    display: grid;
    grid-template-columns: 30px 9fr 1fr;
    align-items: center;

    .title {
      display: flex;
      gap: 1rem;
      align-items: center;

      @media screen and (min-width: 992px) {
        gap: 2rem;
      }
    }
  }
`;
export default Bottom;
