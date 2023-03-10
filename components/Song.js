import { intervalToDuration } from "date-fns";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import millisToMinutesAndSeconds from "../lib/time";

import classes from "../styles/Song.module.scss";
import Play from "./Play";

const Song = ({ order, track }) => {
  const [hover, setHover] = useState(false);

  const duration = intervalToDuration({
    start: new Date(track.added_at),
    end: new Date(),
  });

  const backgroundColor = useSelector((state) => state.backgroundColor.value);

  let durationTime = "";

  if (duration.days > 0) {
    durationTime = `${duration.days} ${
      duration.days > 1 ? "days ago" : "day ago"
    }`;
  } else if (duration.hours > 0) {
    durationTime = `${duration.hours} ${
      duration.hours > 1 ? "hours ago" : "hour ago"
    }`;
  } else if (duration.minutes > 0) {
    durationTime = `${duration.minutes} ${
      duration.minutes > 1 ? "minutes ago" : "minute ago"
    }`;
  } else if (duration.seconds > 0) {
    durationTime = `${duration.seconds} ${
      duration.seconds > 1 ? "seconds ago" : "second ago"
    }`;
  }

  const handleHover = (e) => {
    setHover(true);
  };
  const handleOut = (e) => {
    setHover(false);
  };

  // console.log(track);
  return (
    <Wrapper
      className={classes.song}
      backgroundColor={backgroundColor}
      onMouseEnter={handleHover}
      onMouseLeave={handleOut}
    >
      {hover ? (
        <Play
          className={classes.playBtn}
          size={"20"}
          id={track?.track.album.id}
          uri={track?.track.uri}
          trackId={track?.track.id}
        />
      ) : (
        <p>{order + 1}</p>
      )}

      <div className={classes.title}>
        <Image
          src={track.track.album.images[0]?.url}
          width="50"
          height="50"
          alt="ok"
          className="d-none d-lg-block"
          unoptimized
        />

        <p>
          <Link
            style={{ color: "#fff" }}
            href={`/album/${track?.track.album.id}`}
          >
            {track?.track.name}
          </Link>{" "}
          <br />
          {track.track.artists.map((artiste) => {
            return (
              <Link
                key={artiste.id}
                className="artiste-item"
                href={`/artist/${artiste.id}`}
              >
                {artiste.name}
              </Link>
            );
          })}
        </p>
      </div>

      <div id={classes.album} className="d-none d-lg-block">
        {track.track.album.name}
      </div>

      <div id={classes.dateAdded} className="d-none d-lg-block">
        {durationTime}
      </div>

      <div className={classes.time}>
        {millisToMinutesAndSeconds(track.track.duration_ms)}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  &:hover {
    background-color: ${(props) => props.backgroundColor};
  }
`;
export default Song;
