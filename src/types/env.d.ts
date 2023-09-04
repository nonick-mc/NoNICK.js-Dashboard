declare namespace NodeJS {
  interface ProcessEnv extends Env {
    readonly DISCORD_ID: string;
    readonly DISCORD_TOKEN: string;
    readonly DISCORD_OAUTH_SECRET: string;
    readonly DISCORD_OAUTH_SCOPE: string;

    readonly NEXTAUTH_URL: string,
    readonly NEXTAUTH_SECRET: string,
    readonly DB_URI: string,
    readonly DB_NAME: string,

    readonly NEXT_PUBLIC_BOT_INVITE_URL: string,
    readonly NEXT_PUBLIC_VERCEL_URL: string,
  }
}