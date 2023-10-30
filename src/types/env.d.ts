declare namespace NodeJS {
  interface ProcessEnv extends Env {
    readonly DISCORD_TOKEN: string;
    readonly DISCORD_OAUTH_SECRET: string;
    readonly DISCORD_OAUTH_SCOPE: string;

    readonly NEXT_PUBLIC_DISCORD_TOKEN: string;
    readonly NEXT_PUBLIC_DISCORD_PERMISSION: number;

    readonly NEXTAUTH_URL: string;
    readonly NEXTAUTH_SECRET: string;
    readonly DB_URI: string;
    readonly DB_NAME: string;

    readonly NEXT_PUBLIC_VERCEL_URL?: string;

    readonly PORT?: string;
    readonly ANALYZE?: string;
  }
}
