import { RESTAPIPartialCurrentUserGuild } from 'discord-api-types/v10';

export interface PartialCurrentUserGuildWithBotJoined
  extends RESTAPIPartialCurrentUserGuild {
  isBotJoined: boolean;
}
