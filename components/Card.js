import React, { useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import Play from "./Play";
import { useRouter } from "next/router";

const Wrapper = styled.div`
  cursor: pointer;
  background-color: #181818;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  width: 300px;
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
      console.log(type);
      router.push(`/artist/${id}`);
    }

    if (type === "track") {
      console.log(type);
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
          <Play />
        </div>
      )}
      <div className="image">
        <Image src={img} width={100} height="100" alt={name} unoptimized />
      </div>
      <p className="name mt-3">{name}</p>
      <p className="artist">{role}</p>
    </Wrapper>
  );
};

export default Card;
