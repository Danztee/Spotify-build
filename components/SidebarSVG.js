const SidebarSVG = ({ height, width, className, d, e, view }) => {
  return (
    <svg
      role="img"
      height={height}
      width={width}
      aria-hidden="true"
      className={`Svg-sc-ytk21e-0 uPxdw ${className}`}
      viewBox={`0 0 ${view} ${view}`}
      data-encore-id="icon"
      fill="currentColor"
    >
      <path d={d}></path>
      <path d={e}></path>
    </svg>
  );
};

export default SidebarSVG;
