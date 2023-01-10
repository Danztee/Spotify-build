import { getSession } from "next-auth/react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Lyrics = () => {
  const lyrics = useSelector((state) => state.lyrics.value);
  const backgroundColor = useSelector((state) => state.backgroundColor.value);
  return (
    <Wrapper backgroundColor={backgroundColor}>
      <h3>{lyrics}</h3>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  letter-spacing: 3px;
  display: flex;

  h3 {
    color: #fff;
    line-height: 3rem;
    font-size: 1rem;
    white-space: break-spaces;
    font-weight: bold;

    @media screen and (min-width: 992px) {
      font-size: 1.4rem;
      white-space: pre;
      margin-left: 7rem;
      word-wrap: break-word;

      display: flex;
      flex-wrap: wrap;
    }
  }
`;

export default Lyrics;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
