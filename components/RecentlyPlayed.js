import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import useSpotify from "../hooks/useSpotify";
import classes from "../styles/Home.module.scss";
import logo from "../public/spotify.png";

const RecentlyPlayed = ({ img, name }) => {
  return (
    <div className="">
      <div className={classes.recently}>
        <Image src={img} alt={name} width={100} height={100} />
        <p>{name}</p>
      </div>
    </div>
  );
};

export default RecentlyPlayed;
