import { cors, runMiddleware } from "../../../utils/middleware";
import NextCors from "nextjs-cors";

const SpotifyWebApi = require("spotify-web-api-node");

export default async function handler(req, res) {
  await NextCors(req, res, cors);

  const accessToken = process.env.SPOTIFY_ACCESS;
  const refreshToken = process.env.SPOTIFY_REFRESH;
  const clientId = process.env.SPOTIFY_ID;
  const clientSecret = process.env.SPOTIFY_SECRET;

  const spotifyApi = new SpotifyWebApi({
    clientId,
    clientSecret,
  });

  spotifyApi.setAccessToken(accessToken);
  spotifyApi.setRefreshToken(refreshToken);

  try {
    const refreshedToken = await spotifyApi.refreshAccessToken();
    spotifyApi.setAccessToken(refreshedToken.body.access_token);

    const isPlaying = await spotifyApi.getMyCurrentPlayingTrack();

    if (isPlaying.statusCode === 200) {
      res.status(200).json({ playing: true, track: isPlaying.body.item });
    }

    const recentlyPlayed = await spotifyApi.getMyRecentlyPlayedTracks({
      limit: 1,
    });

    res
      .status(200)
      .json({ playing: false, track: recentlyPlayed.body.items[0].track });
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
}
