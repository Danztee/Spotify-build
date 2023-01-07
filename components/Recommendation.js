import React from "react";
import Card from "./Card";

const Recommendation = ({ name, img, trackName, type, id }) => {
  return (
    <Card
      name={trackName}
      img={img}
      role={name}
      width="235px"
      type={type}
      id={id}
    />
  );
};

export default Recommendation;
