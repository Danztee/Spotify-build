import Card from "./Card";

const TopTracks = ({ name, img, trackName }) => {
  return (
    <Card role={name} img={img} name={trackName} radius="10px" width="235px" />
  );
};

export default TopTracks;
