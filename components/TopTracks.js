import Card from "./Card";

const TopTracks = ({ name, img, trackName, type, id }) => {
  return (
    <Card
      role={name}
      img={img}
      name={trackName}
      radius="10px"
      width="235px"
      type={type}
      id={id}
    />
  );
};

export default TopTracks;
