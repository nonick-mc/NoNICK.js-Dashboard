export interface PartialGuild {
  id: string;
  name: string;
  icon: string;
  owner: boolean;
  permissions: string;
  features: string[];
}

export interface GuildOptions {
  botJoined: boolean,
}