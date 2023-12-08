import SpotifyProvider from 'next-auth/providers/spotify';

if (!process.env.SPOTIFY_CLIENT_ID) {
  throw new Error('Missing SPOTIFY_CLIENT_ID');
}

if (!process.env.SPOTIFY_CLIENT_SECRET) {
  throw new Error('Missing SPOTIFY_CLIENT_SECRET');
}

const spotifyProfile = SpotifyProvider({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

const authURL = new URL('https://accounts.spotify.com/authorize');

const scopes = [
  'user-read-email',
  'user-top-read',
  'user-read-private',
  'user-read-playback-state',
  'user-library-read',
  'user-modify-playback-state',
  'playlist-read-private',
  'playlist-read-collaborative',
  'playlist-modify-public',
  'playlist-modify-private',
];

authURL.searchParams.append('scope', scopes.join(' '));

spotifyProfile.authorization = authURL.toString();

export default spotifyProfile;

// export async function refreshAccessToken(token) {
//   try {
//     const response = await fetch(authURL, {
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       method: 'POST',
//     });

//     const refreshedTokens = await response.json();

//     if (!response.ok) {
//       throw refreshedTokens;
//     }

//     return {
//       ...token,
//       access_token: refreshedTokens.access_token,
//       token_type: refreshedTokens.token_type,
//       expires_at: refreshedTokens.expires_at,
//       expires_in: (refreshedTokens.expires_at ?? 0) - Date.now() / 1000,
//       refresh_token: refreshedTokens.refresh_token ?? token.refresh_token,
//       scope: refreshedTokens.scope,
//     };
//   } catch (error) {
//     console.error(error);
//     return {
//       ...token,
//       error: 'RefreshAccessTokenError',
//     };
//   }
// }

// access token was not refreshing automatically.  Below code is from ChatGPT

export async function refreshAccessToken(token) {
  try {
    const refreshURL = 'https://accounts.spotify.com/api/token'; // Spotify token refresh endpoint

    const response = await fetch(refreshURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString('base64')}`,
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: token.refresh_token,
      }),
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      access_token: refreshedTokens.access_token,
      token_type: refreshedTokens.token_type,
      expires_at: Date.now() / 1000 + refreshedTokens.expires_in,
      refresh_token: refreshedTokens.refresh_token ?? token.refresh_token,
      scope: refreshedTokens.scope,
    };
  } catch (error) {
    console.error(error);
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}
