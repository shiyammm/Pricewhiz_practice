import mongoose from 'mongoose';

let isConnected = false;

export async function connectToDB() {
  mongoose.set('strictQuery', true);

  if (!process.env.MONGODB_URI) return console.log('MongoDB URI not found');

  if (isConnected) return console.log('Using existing DB');

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log(error);
  }
}
