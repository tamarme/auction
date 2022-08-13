import mongoose from 'mongoose';

export function connect() {
  try {
    mongoose.connect(String(process.env.MONGO_PATH));
  } catch (error) {
    console.log(error);
  }
}
