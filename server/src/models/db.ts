import mongoose from 'mongoose';
import { ToRoutes } from '..';
export async function letConnect() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/mybatch');
    console.log('connected to mongodb');
    ToRoutes();
  } catch (error) {
    console.log(error);
  }
}
letConnect();

export default mongoose;
