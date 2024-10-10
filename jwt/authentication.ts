import User from "../mongoModel/userModel"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from "express";
import { getUserDataByName } from "../apis/mongoApis";
const jwtSecret = 'secretCode';

export const registerUser = async (req: Request, res: Response): Promise<Response> => {
  const { username, email, password, contactNumber, profileImage } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword, contactNumber, profileImage });

    await newUser.save();
    return res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
}

export const loginUserJwt = async (req: Request, res: Response): Promise<Response> => {
    const { userName, password } = req.body;
    try {
      const user = await getUserDataByName(userName);
      console.log(user)
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

