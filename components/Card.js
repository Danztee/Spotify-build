import React from "react";
import Image from "next/image";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: #181818;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  width: 350px;

  padding: 1rem;
  transition: background-color 0.3s ease;
  border-radius: 5px;
  padding-bottom: 2rem;

  @media screen and (min-width: 992px) {
    width: 235px;
  }

  .image {
    border-radius: 10px;
    height: 80%;
    width: 100%;

    img {
      width: 100%;
      height: 100%;
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

const Card = ({ name, img, role, radius }) => {
  return (
    <Wrapper radius={radius}>
      <div className="image">
        <Image src={img} width={100} height="100" alt={name} />
        <p className="name mt-3">{name}</p>
        <p className="artist">{role} </p>
      </div>
    </Wrapper>
  );
};

export default Card;
