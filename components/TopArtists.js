import Card from "./Card";

const TopArtists = ({ name, img }) => {
  return <Card name={name} img={img} role={"Artist"} radius="50%" />;
};

export default TopArtists;
