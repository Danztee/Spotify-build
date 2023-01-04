import React, { useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import Play from "./Play";

const Wrapper = styled.div`
  cursor: pointer;
  background-color: #181818;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  width: 350px;
  position: relative;

  padding: 1rem;
  transition: background-color 0.3s ease;
  border-radius: 5px;
  padding-bottom: 2rem;

  height: 19rem;

  @media screen and (min-width: 992px) {
    width: ${(props) => props.width};
  }

  #cover {
    position: absolute;
    transition: background-color 1s ease;
    width: 100%;
    display: flex;
    justify-content: end;

    right: 1rem;
    margin-top: 8.5rem;
  }

  .image {
    border-radius: 10px;
    height: 80%;
    width: 100%;

    img {
      width: 100%;
      height: 90%;
      border-radius: ${(props) => props.radius};
    }

    .name {
      font-weight: bold;
    }

    .artist {
      color: #6a6a6a;
    }
  }
`;

const Card = ({ name, img, role, radius, width, style }) => {
  const [hover, setHover] = useState(false);

  const handleHover = (e) => {
    setHover(true);
  };
  const handleOut = (e) => {
    setHover(false);
  };

  return (
    <Wrapper
      radius={radius}
      width={width}
      style={style}
      onMouseEnter={handleHover}
      onMouseLeave={handleOut}
    >
      {hover && (
        <div id="cover">
          <Play />
        </div>
      )}
      <div className="image">
        <Image src={img} width={100} height="100" alt={name} unoptimized />
        <p className="name mt-3">{name}</p>
        <p className="artist">{role} </p>
      </div>
    </Wrapper>
  );
};

export default Card;
