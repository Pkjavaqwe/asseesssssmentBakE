import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { addQuestion, addQuestionpapers, addSubject, addUsers,deleteQuestionById,deleteSubjectById, getQuestionById, getQuestionByPaperId, getQuestionPaperBySubjectId, getSubjectsByUserId, getUserById, getUserDataByName, updateQuestion } from "./apis/mongoApis";
import { dbConnect } from "./dbConfig/config";
import cors from "cors"
import router, { validJWTNeeded } from "./routes/userRoutes"
import { loginUser } from "./jwt/loginAuthentication";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { questionModel, User, userModel } from "./mongoModel/mongoSchema";
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

app.post("/users/subjects/questionpaper/question/add",validJWTNeeded,validateAddQuestion, async function (req:Request,res:Response) {

    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //    res.status(400).json({
    //     errors: errors.array()
    //   });      
    // }

    const requestsBody = req.body
    console.log(requestsBody)
    const data = await addQuestion(requestsBody)
    res.status(200).json(data)
})

app.post("/users/subjects/questionpaper/add",async function (req:Request,res:Response) {
    // validJWTNeeded(req,res)
    const requestsBody = req.body

    console.log(requestsBody)
    const data = await addQuestionpapers(requestsBody)
    res.status(200).json(data)
})

app.get("/users/sub/get/:_id",async function(req:Request,res:Response) {
    // validJWTNeeded(req,res)

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

app.delete("/users/delete/:_id", async function (req,res) {
   console.log("inside delete at backend");
  
   
    try {
        const data = await deleteSubjectById(req.params._id) 
        console.log(data);
        
        res.status(200).json(data);    
    } catch (error) {
        console.log(error);
    }
       
})

app.delete("/users/deleteque/:_id", async function (req,res) {
    console.log("inside delete Question at backend");
    
     try {
         const data = await deleteQuestionById(req.params._id) 
         console.log(data);
         
         res.status(200).json(data);    
     } catch (error) {
         console.log(error);
     }
        
 })

 app.get("/users/getque/:_id",async function(req:Request,res:Response) {
    const data = await getQuestionById(req.params._id)
    console.log("getquestionById",data)
    res.status(200).json(data) 
})

app.put("/users/updateque/:queId", async function (req,res) {
    const requestBody = req.body
    console.log("from Client",requestBody)
    const {_id, ...question}=requestBody
    console.log("_id",_id)
    console.log(question);
    try {
       const  data = await updateQuestion(_id,question)
    res.send(data)            
    } catch (error) {
       res.send(error);            
    }
    
})
 
app.get('/users/weekly/:year', async (req, res) => {
    const year = parseInt(req.params.year);
    try {
      const weeklyStats = await questionModel.aggregate([
        {
          $match: {
            $expr: {
              $eq: [{ $year: "$timestamp" }, year] 
            }
          }
        },
        {
          $group: {
            _id: { $week: "$timestamp" }, 
            count: { $sum: 1 },
            questions: { $push: "$$ROOT" }
          }
        },
        {
          $sort: { _id: 1 }
        }
      ]);
  
      res.json(weeklyStats);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching weekly statistics' });
    }
  });
  

  app.get('/users/monthly/:year', async (req, res) => {
    const year = parseInt(req.params.year);
    try {
      const monthlyStats = await questionModel.aggregate([
        {
          $match: {
            $expr: {
              $eq: [{ $year: "$timestamp" }, year] 
            }
          }
        },
        {
          $group: {
            _id: { $month: "$timestamp" }, 
            count: { $sum: 1 },
            questions: { $push: "$$ROOT" }
          }
        },
        {
          $sort: { _id: 1 } // Sort by month number
        }
      ]);
  
      res.json(monthlyStats);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching monthly statistics' });
    }
  });
  














































































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