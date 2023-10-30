import { Model, Schema, model, models } from 'mongoose';

export interface IGuildCaches {
  serverId: string;
}

const GuildCaches = new Schema<IGuildCaches>({
  serverId: { type: String, required: true, unique: true },
});

export default models.GuildCaches
  ? (models.GuildCaches as Model<IGuildCaches>)
  : model<IGuildCaches, Model<IGuildCaches>>('GuildCaches', GuildCaches);
