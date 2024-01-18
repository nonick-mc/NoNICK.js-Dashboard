import mongoose from 'mongoose';

export async function dbConnect() {
  if (mongoose.connection.readyState === 1) return;

  await mongoose.connect(process.env.DB_URI, {
    dbName: process.env.DB_NAME,
  });
}
