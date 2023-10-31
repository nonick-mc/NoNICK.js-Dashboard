import { NextAuthOptions } from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';

export const authOption: NextAuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.NEXT_PUBLIC_DISCORD_ID,
      clientSecret: process.env.DISCORD_OAUTH_SECRET,
      authorization: { params: { scope: process.env.DISCORD_OAUTH_SCOPE } },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: async ({ token, account }) => {
      if (account) {
        token.accessToken = account.access_token;
        token.accessTokenExpires = account.expires_at;
      }

      if (token.accessTokenExpires && Date.now() > token.accessTokenExpires * 1000) {
        token.error = 'invalid_token';
      }

      return token;
    },
    session: async ({ session, token }) => {
      session.accessToken = token.accessToken;
      session.error = token.error;
      return session;
    },
  },
};
