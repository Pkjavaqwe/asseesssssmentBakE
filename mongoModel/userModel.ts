import mongoose, { Schema, Document } from 'mongoose';

// Interface for User Document
interface IUser extends Document {
  username: string;
  email: string;
  contactNumber?: string;
  password: string;
  profileImage?: string;
}

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  contactNumber: { type: String, required: false },
  password: { type: String, required: true },
  profileImage: { type: String, required: false },
})

export default mongoose.model<IUser>('User', UserSchema)









