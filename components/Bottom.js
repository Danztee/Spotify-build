import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import useSpotify from "../hooks/useSpotify";
import millisToMinutesAndSeconds from "../lib/time";
import Play from "./Play";

const Bottom = ({ id, topTracks, albumTracks, type, order }) => {
  const [hover, setHover] = useState(false);
  const backgroundColor = useSelector((state) => state.backgroundColor.value);

  // const release_date = new Date(album?.release_date).toDateString().slice(4);

  const handleHover = (e) => {
    setHover(true);
  };
  const handleOut = (e) => {
    setHover(false);
  };

  if (type === "album") {
    return (
      <Wrapper
        type={type}
        backgroundColor={backgroundColor}
        onMouseEnter={handleHover}
        onMouseLeave={handleOut}
      >
        <ul>
          <li className="song">
            {hover ? (
              <Play className="playBtn" size={"18"} />
            ) : (
              <p>{order + 1}</p>
            )}

            <div className="title">
              <p>
                <span style={{ color: "#fff", fontSize: "17px" }}>
                  {albumTracks?.name}
                </span>{" "}
                <br />
                {albumTracks?.artists.map((artiste) => {
                  return (
                    <Link
                      key={artiste.id}
                      className="artiste-item"
                      href={`/artist/${artiste.id}`}
                    >
                      {artiste.name}
                    </Link>
                  );
                })}
              </p>
            </div>

            <div className="duration" style={{ color: "#b3b3b3" }}>
              {millisToMinutesAndSeconds(albumTracks?.duration_ms)}
            </div>
          </li>
        </ul>
      </Wrapper>
    );
  }

  if (type === "artist") {
    return (
      <Wrapper
        type={type}
        backgroundColor={backgroundColor}
        onMouseEnter={handleHover}
        onMouseLeave={handleOut}
      >
        <ul className="songs">
          <li className="song">
            {hover ? (
              <Play className="playBtn" size={"18"} />
            ) : (
              <p>{order + 1}</p>
            )}

            <div className="title">
              <Image
                src={topTracks?.album.images[0].url}
                width="50"
                height="50"
                alt="ok"
              />
              <span style={{ color: "#fff" }}>{topTracks?.name}</span> <br />
            </div>

            <div className="duration">
              {millisToMinutesAndSeconds(topTracks?.duration_ms)}
            </div>
          </li>
        </ul>
      </Wrapper>
    );
  }
};

const Wrapper = styled.div`
  color: white;
  /* margin-top: ${({ type }) => (type === "artist" ? "2rem" : "")}; */

  .songs {
    margin-left: 0.5rem;

    @media screen and (min-width: 992px) {
      margin-left: 1rem;
    }
  }

  .song {
    padding: 0.5rem 0;
    display: grid;
    grid-template-columns: 30px 9fr 1fr;
    align-items: center;
    margin-top: 1rem;

    &:hover {
      background-color: ${(props) => props.backgroundColor};
      border-radius: 5px;
    }

    @media screen and (min-width: 992px) {
      padding-left: ${({ type }) => (type === "album" ? "1rem" : "")};
    }
    .title {
      display: flex;
      gap: 1rem;
      align-items: center;

      @media screen and (min-width: 992px) {
        gap: 2rem;
      }
    }
  }

  .playBtn {
    background: none;
    color: #fff;
    padding: 0;
    margin: 0;
  }
`;
export default Bottom;
