import { getSession } from "next-auth/react";
import React, { useEffect } from "react";
import styled from "styled-components";

const Collection = () => {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();

  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);
  return (
    <Wrapper>
      <h5>Playlists</h5>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  color: #fff;

  h5 {
    font-weight: bold;
  }
`;

export default Collection;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
