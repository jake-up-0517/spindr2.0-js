import spotifyProfile, { refreshAccessToken } from './SpotifyProfile';

const authOptions = {
  providers: [spotifyProfile],
  session: {
    maxAge: 60 * 60, // 1hr
  },
  callbacks: {
    async jwt({ token, account }) {
      if (!account) {
        return token;
      }

      const updatedToken = {
        ...token,
        access_token: account?.access_token,
        token_type: account?.token_type,
        expires_at: account?.expires_at ?? Date.now() / 1000,
        expires_in: (account?.expires_at ?? 0) - Date.now() / 1000,
        refresh_token: account?.refresh_token,
        scope: account?.scope,
        id: account?.providerAccountId,
      };

      if (Date.now() < updatedToken.expires_at) {
        return refreshAccessToken(updatedToken);
      }

      return updatedToken;
    },
    async session({ session, token }) {
      const user = {
        ...session.user,
        access_token: token.access_token,
        token_type: token.token_type,
        expires_at: token.expires_at,
        expires_in: token.expires_in,
        refresh_token: token.refresh_token,
        scope: token.scope,
        id: token.id,
      };
      session.user = user;
      session.error = token.error;
      return session;
    },
  },
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
  },
};

export default authOptions;
