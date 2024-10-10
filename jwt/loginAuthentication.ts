
import {Request, Response} from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { getUserDataByName } from "../apis/mongoApis";
const jwtSecret = 'secretCode'
export const loginUser = async (req: Request, res: Response): Promise<Response> => {
    const { userName, password } = req.body;
    try {
      const user = await getUserDataByName(userName);
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1h' });
  
      return res.status(200).json({ token, message: 'Logged in successfully!' });
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error });
    }
}
    
