/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: [
      // "i.scdn.co",
      // "mosaic.scdn.co",
      // "seed-mix-image.spotifycdn.com",
      // "spotifycdn.com",
      // "charts-images.scdn.co",
      // "scdn.co",
      // "spotifycdn.com",
      // "i.scdn.co",
    ],
  },

  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
