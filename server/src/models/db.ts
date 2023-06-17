import mongoose from 'mongoose';

export async function letConnect() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/mybatch');
    console.log('connected to mongodb');
  } catch (error) {
    console.log(error);
  }
}
export async function disconnectDBForTesting() {
  try {
    await mongoose.connection.close();
  } catch (error) {
    console.log('DB disconnect error');
  }
}

export default mongoose;
