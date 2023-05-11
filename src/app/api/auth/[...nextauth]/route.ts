import NextAuth, { NextAuthOptions } from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';

export const authOption: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      authorization: { params: { scope: 'identify email guilds' } }
    })
  ],

  callbacks: {
    async session({ session, token }) {
      if (session.user)
        session.id = token.id;

      return session;
    },

    async jwt({ token, account }) {
      if (account && account.access_token)
        token.accessToken = account.access_token;
      if (account?.userId)
        token.id = account?.userId;
      
      return token;
    },
  },
};

const handler = NextAuth(authOption);

export { handler as GET, handler as POST }