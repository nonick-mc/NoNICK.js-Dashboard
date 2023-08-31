export namespace Discord {
  export const Endpoints = {
    API: 'https://discord.com/api/v10',
    CDN: 'https://cdn.discordapp.com',
  } as const;

  export const Permissions = {
    Administrator: 0x08,
    ManageGuild: 0x20,
  } as const;
}