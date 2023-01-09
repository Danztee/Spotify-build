const lyricsFinder = require("lyrics-finder");

export default async function handler(req, res) {
  const { artist, title } = req.query;
  let lyrics = (await lyricsFinder(artist, title)) || "Not Found!";
  res.status(200).json({ lyrics });
}
