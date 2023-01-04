import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import useSpotify from "../hooks/useSpotify";
import classes from "../styles/Home.module.scss";
import logo from "../public/spotify.png";
import Play from "./Play";
import SidebarSVG from "./SidebarSVG";
import styled from "styled-components";

const RecentlyPlayed = ({ img, name }) => {
  const [hover, setHover] = useState(false);

  const handleHover = (e) => {
    setHover(true);
  };
  const handleOut = (e) => {
    setHover(false);
  };

  return (
    <Wrapper onMouseEnter={handleHover} onMouseLeave={handleOut}>
      {hover && (
        <div id="cover">
          <Play />
        </div>
      )}
      <div className={classes.recently}>
        <Image src={img} alt={name} width={100} height={100} />
        <p>{name}</p>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  overflow: hidden;

  #cover {
    transition: background-color 1s ease;
    width: 100%;
    display: flex;
    justify-content: end;
    position: absolute;
    right: 0.5rem;
    margin-top: 1.3rem;
  }
`;

export default RecentlyPlayed;
