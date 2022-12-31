const SidebarSVG = ({ height, width, className, d, view }) => {
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

      {/* <path d="M13.5 1.515a3 3 0 00-3 0L3 5.845a2 2 0 00-1 1.732V21a1 1 0 001 1h6a1 1 0 001-1v-6h4v6a1 1 0 001 1h6a1 1 0 001-1V7.577a2 2 0 00-1-1.732l-7.5-4.33z"></path> */}
    </svg>
  );
};

export default SidebarSVG;
