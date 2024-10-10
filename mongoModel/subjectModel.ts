import mongoose, { Schema, Document } from 'mongoose';
interface ISubject extends Document {
    name: string;
    userId: mongoose.Schema.Types.ObjectId; // Reference to the User
  }
  
  const SubjectSchema = new Schema({
    name: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  })
  export default mongoose.model<ISubject>('Subject', SubjectSchema)