import mongoose, { Schema, Document } from 'mongoose';

interface IQuestion extends Document {
    question: string;
    answerType: 'MCQ' | 'True/False' | 'Description';
    answerChoices?: string[]; // Only for MCQ
    marksAllotted: number;
  }

interface IQuestionPaper extends Document {
    title: string;
    totalMarks: number;
    questions: IQuestion[];
    userId: mongoose.Schema.Types.ObjectId; // Reference to the User
  }
  
  const QuestionPaperSchema= new Schema({
    title: { type: String, required: true },
    totalMarks: { type: Number, default: 0 },
    questions: [{
      question: { type: String, required: true },
      answerType: { type: String, enum: ['MCQ', 'True/False', 'Description'], required: true },
      answerChoices: { type: [String], required: false },
      marksAllotted: { type: Number, required: true },
    }],
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  });

export default mongoose.model<IQuestionPaper>('QuestionPaper', QuestionPaperSchema)




