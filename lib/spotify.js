const axios = require("axios");
const SpotifyWebApi = require("spotify-web-api-node");
const btoa = require("btoa");

export const getSpotifyData = async () => {
  const accessToken = process.env.NEXT_PUBLIC_SPOTIFY_ACCESS;
  const refreshToken = process.env.NEXT_PUBLIC_SPOTIFY_REFRESH;
  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_ID;
  const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_SECRET;
  const urlCode = process.env.NEXT_PUBLIC_SPOTIFY_URL_CODE;

  const spotifyApi = new SpotifyWebApi({
    clientId,
    clientSecret,
  });

  spotifyApi.setAccessToken(accessToken);
  spotifyApi.setRefreshToken(refreshToken);

  try {
    const refreshedToken = await spotifyApi.refreshAccessToken();
    spotifyApi.setAccessToken(refreshedToken.body.access_token);

    const recentlyPlayed = await spotifyApi.getMyRecentlyPlayedTracks({
      limit: 1,
    });

    console.log(recentlyPlayed.body.items[0].track.artists[0]);

    return {
      success: true,
      data: recentlyPlayed.body.items[0],
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      data: null,
    };
  }
};
