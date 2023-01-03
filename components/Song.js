import { intervalToDuration } from "date-fns";

import Image from "next/image";
import useSpotify from "../hooks/useSpotify";
import millisToMinutesAndSeconds from "../lib/time";

import classes from "../styles/Song.module.scss";

const Song = ({ order, track }) => {
  const spotifyApi = useSpotify();

  const duration = intervalToDuration({
    start: new Date(track.added_at),
    end: new Date(),
  });

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

  return (
    <div className={classes.song}>
      <p>{order + 1}</p>

      <div className={classes.title}>
        <Image
          src={track.track.album.images[0].url}
          width="50"
          height="50"
          alt="ok"
        />

        <p>
          <span>{track?.track.name}</span> <br />
          {track.track.artists.map((artiste) => {
            return (
              <span key={artiste.id} className="artiste-item">
                {artiste.name}
              </span>
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
    </div>
  );
};

export default Song;
