import mongoose from 'mongoose';

function letConnect() {
  mongoose.connect('mongodb://127.0.0.1:27017/mybatch');
  console.log('connected to mongodb');
}

letConnect();

export default mongoose;
