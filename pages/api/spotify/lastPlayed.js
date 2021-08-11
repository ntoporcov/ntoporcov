const SpotifyWebApi = require("spotify-web-api-node");

export default async function handler(req, res) {
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
