import React from "react";
import styled from "styled-components";
import SidebarSVG from "./SidebarSVG";

const Play = ({ style }) => {
  const playHandler = () => {
    console.log("clicked");
  };

  return (
    <Wrapper onClick={playHandler} style={style}>
      <div className="cover">
        <SidebarSVG
          height="24"
          width="24"
          view="24"
          className=""
          d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"
        />
      </div>
    </Wrapper>
  );
};

export default Play;

const Wrapper = styled.div`
  background: #1ed760;
  width: fit-content;
  padding: 0.7rem;
  border-radius: 50%;
  color: #000;
  cursor: pointer;
  transition: background-color 1s ease;

  .cover {
    width: 100%;
  }
`;
