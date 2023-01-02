import { getProviders, signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import spotifyImage from "../public/spotify.png";

const Login = ({ providers }) => {
  const { data: session } = useSession();
  console.log(session);
  return (
    <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center gap-10">
      <Image src={spotifyImage} width="300" alt="spotify-img" />
      {Object.values(providers).map((provider, index) => (
        <div key={index}>
          <button
            className="btn mt-5 btn-secondary"
            onClick={() => {
              signIn(provider.id, { callbackUrl: "/" });
            }}
          >
            login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
};

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}

export default Login;
