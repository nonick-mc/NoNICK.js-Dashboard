type Env = Partial<Readonly<typeof import("./env.local.json")>>;

declare namespace NodeJS {
  interface ProcessEnv extends Env {
    readonly DISCORD_CLIENT_ID: string;
    readonly DISCORD_CLIENT_SECRET: string;
    readonly DISCORD_CLIENT_TOKEN: string;
    readonly DISCORD_CLIENT_SCOPE: string;

    readonly NEXTAUTH_URL: string,
    readonly NEXTAUTH_SECRET: string,
  }
}