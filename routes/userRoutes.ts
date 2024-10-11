import express from "express"
import {addUsers, getUserDataByName} from "../apis/mongoApis"
import { Response, Request } from "express";
import bcrypt from "bcrypt"
import { userModel } from "../mongoModel/mongoSchema";
import { loginUser } from "../jwt/loginAuthentication";
import jwt from "jsonwebtoken"
import { validateUserRegistration } from "../validations/apivalidations";
import { validationResult } from "express-validator";
const jwtSecret = 'your_jwt_secret'

const router = express.Router()

router.post("/add", validateUserRegistration,async function (req:Request,res:Response) {
    const { userName, email, contactNo, password, confirmPassword } = req.body;
    const salt = await bcrypt.genSalt(10);
    
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new userModel({
        userName,
        email,
        contactNo,
        password: hashedPassword,
        confirmPassword: hashedPassword,
      });
    const requestsBody = newUser
    console.log(requestsBody)
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       res.status(400).json({
        errors: errors.array()
      });
    }
    const data = await addUsers(requestsBody) 
    res.status(200).json(data)
})
router.post('/auth',(req:Request,res:Response)=>{loginUser(req,res)})
export default router



