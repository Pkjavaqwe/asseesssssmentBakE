import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { addQuestion, addSubject, addUsers, getQuestionPaperBySubjectId, getSubjectsByUserId, getUserDataByName } from "./apis/mongoApis";
import { dbConnect } from "./dbConfig/config";
import cors from "cors"
import router from "./routes/userRoutes"
import { loginUser } from "./jwt/loginAuthentication";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { User, userModel } from "./mongoModel/mongoSchema";

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

app.post("/users/subjects/add",async function (req:Request,res:Response) {
    const requestsBody = req.body
    console.log(requestsBody)
    const data = await addSubject(requestsBody)
    res.send(data)
})

app.post("/users/subjects/question/add/",async function (req:Request,res:Response) {
     
    const requestsBody = req.body
    console.log(requestsBody)
    const data = await addQuestion(requestsBody)
    res.send(data)
})

app.get("/users/sub/get/:_id",async function(req:Request,res:Response) {
   

    const data = await getSubjectsByUserId(req.params._id)
    res.json(data)
})

app.get("/users/que/get/:_id",async function(req:Request,res:Response) {
    const data = await getQuestionPaperBySubjectId(req.params._id)
    res.json(data)
})

app.get("/users/getbyname/:userName",async function(req:Request,res:Response) {
    const data = await getUserDataByName(req.params.userName)
    console.log("getByName",data)
    res.json(data)
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