import React from "react";
import Card from "./Card";

const Recommendation = ({ name, img, trackName }) => {
  return <Card name={trackName} img={img} role={name} />;
};

export default Recommendation;
