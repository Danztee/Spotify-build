import Image from "next/image";
import React, { useState } from "react";
import classes from "../styles/Home.module.scss";
import Play from "./Play";
import styled from "styled-components";
import { useRouter } from "next/router";

const RecentlyPlayed = ({ img, name, id }) => {
  const [hover, setHover] = useState(false);
  const router = useRouter();

  const handleHover = (e) => {
    setHover(true);
  };
  const handleOut = (e) => {
    setHover(false);
  };
  const clickHandler = (id) => {
    console.log(id);
    console.log("ok");
    router.push(`/album/${id}`);
  };

  return (
    <Wrapper
      onMouseEnter={handleHover}
      onMouseLeave={handleOut}
      onClick={() => {
        clickHandler(id);
      }}
    >
      {hover && (
        <div id="cover">
          <Play />
        </div>
      )}
      <div className={classes.recently}>
        <Image src={img} alt={name} width={100} height={100} unoptimized />
        <p>{name}</p>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  overflow: hidden;
  cursor: pointer;

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
