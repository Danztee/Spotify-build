import SidebarSVG from "./SidebarSVG";
import classes from "../styles/Songs.module.scss";
import { useSelector } from "react-redux";
import Song from "./Song";
import Play from "./Play";

const Songs = () => {
  const playlist = useSelector((state) => state.playlist.value);
  const backgroundColor = useSelector((state) => state.backgroundColor.value);

  return (
    <article className={classes.song}>
      <div className={classes.playMore}>
        <Play />

        <div className={classes.more}>
          <SidebarSVG
            height="24"
            width="24"
            view="24"
            className=""
            d="M4.5 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm15 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm-7.5 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
          />
        </div>
      </div>

      <div classes={classes.songsContainer}>
        <div
          id={classes.songsHeader}
          style={{
            borderBottom: `solid 1px ${backgroundColor}`,
          }}
        >
          <div>#</div>
          <div>TITLE</div>
          <div className="d-none d-lg-block">ALBUM</div>
          <div className="d-none d-lg-block">DATE ADDED</div>
          <div>
            <SidebarSVG
              height="24"
              width="24"
              view="24"
              className=""
              d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z"
              e="M8 3.25a.75.75 0 01.75.75v3.25H11a.75.75 0 010 1.5H7.25V4A.75.75 0 018 3.25z"
            />
          </div>
        </div>
        {playlist?.tracks.items.map((track, i) => {
          return <Song key={i} track={track} order={i} />;
        })}
      </div>
    </article>
  );
};

export default Songs;
