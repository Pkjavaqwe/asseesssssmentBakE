import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { addQuestion, addQuestionpapers, addSubject, addUsers, getQuestionByPaperId, getQuestionPaperBySubjectId, getSubjectsByUserId, getUserById, getUserDataByName } from "./apis/mongoApis";
import { dbConnect } from "./dbConfig/config";
import cors from "cors"
import router from "./routes/userRoutes"
import { loginUser } from "./jwt/loginAuthentication";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { User, userModel } from "./mongoModel/mongoSchema";
import { validationResult } from "express-validator";
import { validateAddQuestion, validateAddSubject } from "./validations/apivalidations";
import { param } from "express-validator";
dbConnect()

dotenv.config();

const app: Express = express();
const port = process.env.PORT

app.use(cors())
app.get("/",(req:Request, res:Response)=>{
    res.send("express server started with typescript")
})

app.listen(port,()=>{
    console.log(`[server]: Server is running at http://localhost:${port}`);
    
})
app.use(express.urlencoded({extended:true}))
app.use(express.json());
const jwtSecret="secrete"
/*app.post("/users/add", async function (req,res) {
    
    const requestsBody = req.body
    console.log(requestsBody)
    const data = await addUsers(requestsBody)
    res.send(data)
})
*/
// app.post("/users/add", async function (req:Request,res:Response) {
//     const requestsBody = req.body
//     console.log(requestsBody)
//     const data = await addUsers(requestsBody)
//     res.send(data)
// })
app.use("/users", router)
app.use("/login",router)

app.post("/users/subjects/add",validateAddSubject, async function (req:Request,res:Response) {


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       res.status(400).json({
        errors: errors.array()
      });
      
      
    }


    const requestsBody = req.body
    console.log(requestsBody)
    const data = await addSubject(requestsBody)
    res.send(data)
})

app.post("/users/subjects/questionpaper/question/add",validateAddQuestion, async function (req:Request,res:Response) {
     
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       res.status(400).json({
        errors: errors.array()
      });      
    }

    const requestsBody = req.body
    console.log(requestsBody)
    const data = await addQuestion(requestsBody)
    res.status(200).json(data)
})

app.post("/users/subjects/questionpaper/add",async function (req:Request,res:Response) {
     
    const requestsBody = req.body

    console.log(requestsBody)
    const data = await addQuestionpapers(requestsBody)
    res.status(200).json(data)
})

app.get("/users/sub/get/:_id",async function(req:Request,res:Response) {
   

    const data = await getSubjectsByUserId(req.params._id)
    res.status(200).json(data)
})

app.get("/users/que/get/:_id",async function(req:Request,res:Response) {
    const data = await getQuestionByPaperId(req.params._id)
    res.status(200).json(data)
})

app.get("/users/quepaper/get/:_id",async function(req:Request,res:Response) {
    const data = await getQuestionPaperBySubjectId(req.params._id)
    res.status(200).json(data)
})


// app.get("/users/que/get/:_id)

app.get("/users/getbyname/:userName",async function(req:Request,res:Response) {
    const data = await getUserDataByName(req.params.userName)
    console.log("getByName",data)
    res.status(200).json(data)
})

app.get("/users/byid/:_id",async function(req:Request,res:Response) {
    const data = await getUserById(req.params._id)
    console.log("getById",data)
    res.status(200).json(data)
}) 
















































































/*
 app.post("/users/subjects/add",async function (req:Request,res:Response) {
        const requestsBody = req.body
        console.log(requestsBody)
        const data = await addSubject(requestsBody)
        res.send(data)
    })


app.post("/users/subjects/question/add",async function (req:Request,res:Response) {
        const requestsBody = req.body
        console.log(requestsBody)
        const data = await addQuestion(requestsBody)
        res.send(data)
})

app.get("/users/que/get",async function(req:Request,res:Response) {
    const data = await getQuestionPaperBySubjectId()
    console.log("questionSub Data",data)
    res.json(data)
})

app.use("/auth",router)
app.use("/auth",router)
*/