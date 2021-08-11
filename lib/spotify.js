import axios from "axios";
const SpotifyWebApi = require("spotify-web-api-node");
const btoa = require("btoa");

export const getSpotifyData = async () => {
  const accessToken = process.env.NEXT_PUBLIC_SPOTIFY_ACCESS;
  const refreshToken = process.env.NEXT_PUBLIC_SPOTIFY_REFRESH;
  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_ID;
  const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_SECRET;

  const spotifyApi = new SpotifyWebApi({
    clientId,
    clientSecret,
  });

  spotifyApi.setAccessToken(accessToken);
  spotifyApi.setRefreshToken(refreshToken);

  const { body } = await spotifyApi.getMyRecentlyPlayedTracks({ limit: 1 });
  return body.items[0];
};
