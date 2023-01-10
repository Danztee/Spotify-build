import React, { useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import Play from "./Play";
import { useRouter } from "next/router";

const Wrapper = styled.div`
  cursor: pointer;
  background-color: #1a1a1a;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  width: 300px;
  position: relative;
  overflow: hidden;

  &:hover {
    background-color: #242424;
  }

  padding: 1rem;
  transition: background-color 0.3s ease;
  border-radius: 10px;
  padding-bottom: 2rem;

  @media screen and (min-width: 992px) {
    width: ${(props) => props.width};
  }

  #cover {
    position: absolute;
    transition: background-color 1s ease;
    width: 100%;
    display: flex;
    justify-content: end;

    right: 1.5rem;
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
  }

  .name {
    font-weight: bold;
    font-size: 17px;
  }

  .artist {
    color: #b3b3b3;
    font-size: 14px;
  }
`;

const Card = ({ name, img, role, radius, width, style, type, id }) => {
  const [hover, setHover] = useState(false);
  const router = useRouter();

  const handleHover = (e) => {
    setHover(true);
  };
  const handleOut = (e) => {
    setHover(false);
  };

  const handleClick = (e, id) => {
    const parent = e.currentTarget;
    const type = parent.children[0].textContent;

    if (type === "artist") {
      router.push(`/artist/${id}`);
    }

    if (type === "track") {
      router.push(`/album/${id}`);
    }
  };

  return (
    <Wrapper
      radius={radius}
      width={width}
      style={style}
      onMouseEnter={handleHover}
      onMouseLeave={handleOut}
      onClick={(e) => handleClick(e, id)}
    >
      <span style={{ display: "none" }}>{type}</span>
      {hover && (
        <div id="cover">
          <Play id={id} />
        </div>
      )}
      <div className="image">
        <Image src={img} width={100} height="100" alt={name} unoptimized />
      </div>
      <p className="name">{name}</p>
      <p className="artist">{role}</p>
    </Wrapper>
  );
};

export default Card;
