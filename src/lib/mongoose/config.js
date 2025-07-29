import mongoose from 'mongoose';

const connection = {};
export const connectDB = async () => {
  try {
    if (connection.isConnected) {
      console.log('using exisiting connection');
    }

    const db = await mongoose.connect(process.env.MONGO_URI);
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.log('failed to connect');
    console.log(error);
  }
};
