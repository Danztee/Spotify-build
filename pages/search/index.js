import { useSession, getSession } from "next-auth/react";

const Search = () => {
  return (
    <div>
      <h1> search route</h1>
    </div>
  );
};

export default Search;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
