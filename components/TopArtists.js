import Card from "./Card";

const TopArtists = ({ name, img, type, id }) => {
  return (
    <Card
      name={name}
      img={img}
      role={"Artist"}
      radius="50%"
      width="235px"
      type={type}
      id={id}
    />
  );
};

export default TopArtists;
