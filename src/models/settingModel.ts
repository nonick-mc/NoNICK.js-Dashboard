import { Model, model, models, Schema, SchemaTypes } from 'mongoose';

export interface ISnowFlakeArray {
  id: String;
}

const SnowFlakeArray = new Schema<ISnowFlakeArray>({
  id: String,
});

type LogCategoryOptions = { enable: boolean; channel: string };

export interface IServerSettings {
  serverId: string;
  message: {
    join: { enable: boolean; channel: string; messageOptions: any };
    leave: { enable: boolean; channel: string; messageOptions: any };
    expansion: {
      enable: boolean;
      ignore: {
        types: number[];
        channels: string[];
      };
    };
  };
  report: {
    channel: string;
    mention: { enable: boolean; role: string };
  };
  log: {
    timeout: LogCategoryOptions;
    kick: LogCategoryOptions;
    ban: LogCategoryOptions;
    voice: LogCategoryOptions;
    delete: LogCategoryOptions;
  };
  changeVerificationLevel: {
    enable: boolean;
    log: { enable: boolean; channel: string };
    level: { old: number; new: number };
    time: { start: number; end: number };
  };
  autoPublic: { enable: boolean; channels: { id: string }[] };
  autoMod: {
    enable: boolean;
    log: { enable: boolean; channel: string };
    filter: {
      inviteUrl: boolean;
      token: boolean;
      shortUrl: boolean;
    };
    ignore: {
      channels: string[];
      roles: string[];
    };
  };
  autoCreateThread: { enable: boolean; channels: string[] };
}

const ServerSettings = new Schema<IServerSettings>({
  serverId: { type: String, required: true, unique: true },
  message: {
    join: {
      enable: { type: Boolean },
      channel: { type: String },
      messageOptions: {
        type: SchemaTypes.Mixed,
        default: {
          embeds: [
            {
              title: 'WELCOME',
              description: '![user] **(![userTag])** さん、**![serverName]**へようこそ！',
              color: 0x57f287,
            },
          ],
        },
      },
    },
    leave: {
      enable: { type: Boolean },
      channel: { type: String },
      messageOptions: {
        type: SchemaTypes.Mixed,
        default: { content: '**![userTag]** さんがサーバーを退室しました👋' },
      },
    },
    expansion: {
      enable: { type: Boolean },
      ignore: {
        types: { type: [Number] },
        channels: { type: [String] },
      },
    },
  },
  report: {
    channel: { type: String },
    mention: {
      enable: { type: Boolean },
      role: { type: String },
    },
  },
  log: {
    timeout: {
      enable: { type: Boolean },
      channel: { type: String },
    },
    kick: {
      enable: { type: Boolean },
      channel: { type: String },
    },
    ban: {
      enable: { type: Boolean },
      channel: { type: String },
    },
    voice: {
      enable: { type: Boolean },
      channel: { type: String },
    },
    delete: {
      enable: { type: Boolean },
      channel: { type: String },
    },
  },
  changeVerificationLevel: {
    enable: { type: Boolean },
    log: {
      enable: { type: Boolean },
      channel: { type: String },
    },
    level: {
      old: { type: Number },
      new: { type: Number },
    },
    time: {
      start: { type: Number },
      end: { type: Number },
    },
  },
  autoPublic: {
    enable: { type: Boolean },
    channels: [{ id: String }],
  },
  autoMod: {
    enable: { type: Boolean },
    log: {
      enable: { type: Boolean },
      channel: { type: String },
    },
    filter: {
      inviteUrl: { type: Boolean },
      token: { type: Boolean },
      shortUrl: { type: Boolean },
    },
    ignore: {
      channels: { type: [String] },
      roles: { type: [String] },
    },
  },
  autoCreateThread: {
    enable: { type: Boolean },
    channels: { type: [SnowFlakeArray], default: [] },
  },
});

export default models?.ServerSettings
  ? (models.ServerSettings as Model<IServerSettings>)
  : model<IServerSettings, Model<IServerSettings>>('ServerSettings', ServerSettings);
