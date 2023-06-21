import mongoose, { Schema } from 'mongoose';

export interface IUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

const userSchema: Schema<IUser> = new Schema<IUser>({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});

export default mongoose.model<IUser>('User', userSchema);
