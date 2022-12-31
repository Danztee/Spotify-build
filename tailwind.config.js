/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // colors: {
      //   "spotify-grey": "#b3b3b3",
      // },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
