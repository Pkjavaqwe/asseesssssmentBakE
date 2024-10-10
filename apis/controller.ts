// import { Request,Response } from "express";
// import subjectModel from "../mongoModel/subjectModel";
// export const createSubject = async (req: Request, res: Response): Promise<Response> => {
//     const { name } = req.body;
//     const userId = req.userId; // Extracted from middleware
  
//     try {
//       const newSubject = new subjectModel({ name, userId });
//       await newSubject.save();
//       return res.status(201).json({ message: 'Subject created successfully', subject: newSubject });
//     } catch (error) {
//       return res.status(500).json({ message: 'Server error', error });
//     }
//   };