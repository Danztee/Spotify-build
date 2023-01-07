import Image from "next/image";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

const Hero = ({
  image,
  name,
  type,
  album_type,
  artists,
  releaseDate,
  total,
}) => {
  return (
    <Wrapper className="mt-5" type={type}>
      <aside className="pic">
        <Image src={image} height="250" width="250" alt="text" />
      </aside>
      <aside className="title">
        <p>{album_type?.toUpperCase()}</p>
        <h1 className="mt-2">{name}</h1>
        {type === "track" && (
          <div className="track">
            {artists?.map((artiste) => {
              return (
                <Link
                  key={artiste.id}
                  className="artiste-item"
                  href={`/artist/${artiste.id}`}
                >
                  {artiste?.name + " " + "."}
                </Link>
              );
            })}
            <p>{releaseDate?.slice(0, 4) + " " + "."}</p>
            <p>{total} song</p>
          </div>
        )}
      </aside>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 992px) {
    flex-direction: row;
    align-items: center;
    gap: 2rem;
  }

  .pic {
    display: flex;
    justify-content: center;

    @media screen and (min-width: 992px) {
      justify-content: start;
    }

    img {
      border-radius: ${({ type }) => (type === "artist" ? "50%" : "")};
    }
  }

  .title {
    margin-top: 3rem;

    @media screen and (min-width: 992px) {
      margin-top: 0;
    }

    h1 {
      font-size: ${({ type }) => (type === "artist" ? "2.5rem" : "1.5rem")};
      font-weight: 700;

      @media screen and (min-width: 992px) {
        font-size: ${({ type }) => (type === "artist" ? "5rem" : "3rem")};
      }
    }

    .track {
      display: flex;
      gap: 1rem;

      padding-top: 0;
      margin-bottom: -4rem;

      @media screen and (min-width: 992px) {
        padding-top: 2rem;
      }
    }
  }
`;
export default Hero;
