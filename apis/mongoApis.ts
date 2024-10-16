import { subjectModel, userModel,questionModel, User, Subject, quepapersModel, Question, QuestionPaper } from "../mongoModel/mongoSchema";
import { Request, Response} from "express";
import bcrypt from "bcrypt"
import { log } from "console";
import questonModel from "../mongoModel/questonModel";
export async function addUsers(user:User) {
    // console.log("in addUser api in apis");
    // console.log("users----",user);
    //     try {
    //         // const bcryptpassword = bcrypt.ha
    //     const userBody = new userModel(user)        
    // return await userBody.save();
    // } catch (error) {
    //     console.log(error);
    // }

    // const { userName, email, contactNo, password, confirmPassword } = req.body;

    // if (password !== confirmPassword) {
    //   return res.status(400).json({ message: "Passwords don't match" });
    // }
  
    // try {
    //   const salt = await bcrypt.genSalt(10);
    //   const hashedPassword = await bcrypt.hash(password, salt);
  
    //   const newUser = new userModel({
    //     userName,
    //     email,
    //     contactNo,
    //     password: hashedPassword,
    //     confirmPassword: hashedPassword,
    //   });
    try {
        const userBody = new userModel(user)    
         return await userBody.save();
        
    } catch (error) {
      console.log(error);
      
    }
  
      
}


export async function addSubject(subject:Subject) {
    console.log("in addSubject api in apis");
    console.log("subject--",subject);
    
    try {
        const subjectBody = new subjectModel(subject)    
    return await subjectBody.save();
    } catch (error) {
        console.log(error);
    }
}


export async function addQuestion(question:Question) {
    console.log("in addSubject api in apis");
    console.log("question--",question);
    
    try {
        const questionBody = new questionModel(question)    
        const result =await questionBody.save();
        return result
    } catch (error) {
        console.log(error);
    }
}
export async function addQuestionpapers(questionPaper:QuestionPaper) {
    console.log("in addSubject api in apis");
    console.log("question--",questionPaper);
    
    try {
        const questionBody = new quepapersModel(questionPaper)    
        
    return await questionBody.save();
    } catch (error) {
        console.log(error);
    }
}


export async function getSubjectsByUserId(user_Id:string) {
    console.log("in getSubjectsByUserId");
    
    try {
        return await subjectModel.find({userId:user_Id}).populate('userId')
        // return await subjectModel.find({userId:user_Id}).populate('subjects')

        // return await userModel.find({userId:user_Id}).populate('subjects')
    } catch (error) {
        console.log(error);
    } 
}
export async function getQuestionPaperBySubjectId(subject_id:string) {
    console.log("in getQuestionPaper");
    try {
        // return await subjectModel.findOne({userId:"66fe5d7c39ac437e368b54b5"}).populate('questionPaper').populate('userId')
       
        return await quepapersModel.find({subjectId:subject_id}).populate('subjectId')
        // return await userModel.findOne({_id:"66fe5d7c39ac437e368b54b5"}).populate('subjects').populate('quepapers')
    } catch (error) {
        console.log(error);
    }
   
}

export async function getQuestionByPaperId(question_Id:string) {
    console.log("in getQuestionByPaperId");
    try {
        // return await subjectModel.findOne({userId:"66fe5d7c39ac437e368b54b5"}).populate('questionPaper').populate('userId')
       
        return await questionModel.find({questionId:question_Id}).populate('questionId')
        // return await userModel.findOne({_id:"66fe5d7c39ac437e368b54b5"}).populate('subjects').populate('quepapers')
    } catch (error) {
        console.log(error);
    }
}
export async function getUserDataByName(username:string){
    try {
        console.log("in getUserDataByName");
        
        const result = await userModel.findOne({userName:username}).exec()
        console.log(result)
        return result
    } catch (error) {
        console.log(error);  
    }
}


export async function getUserById(userId:string){
    try {
        console.log("in getUserDataByName");
        
        const result = await userModel.findOne({_id:userId}).exec()
        console.log(result)
        return result
    } catch (error) {
        console.log(error);  
    }
}

export async function deleteSubjectById(subId:string) {
    console.log("in deleteSubjectById");
    
    const deletedData= await subjectModel.deleteOne({_id:subId})
    return deletedData
}

export async function deleteQuestionById(queId:string) {
    console.log("in deleteQuestionById");
    
    const deletedData= await questionModel.deleteOne({_id:queId})
    return deletedData
}

export async function getQuestionById(questId:string){
    try {
        console.log("in getUserDataByName");
        
        const result = await questionModel.findOne({_id:questId}).exec()
        console.log(result)
        return result
    } catch (error) {
        console.log(error);  
    }
}

export async function updateQuestion(questionId:string, question:Question){
    const filter = {_id:questionId};
    const updates = question
    return await questionModel.updateOne(filter, question) 
}

// subId-"66fe6ddf81df16e51db8ea82"




































































/*
import User from "../mongoModel/userModel"
export async function getUserDataByName(userName:string){
    try {
        console.log("in getUserDataByName");
        
        const result = await User.findOne({username:userName}).exec()
        console.log(result)
        return result
    } catch (error) {
        console.log(error);  
    }
}
// export async function getQuestionPaperBySubjectId() {
//     console.log("in getQuestionPaper");
//     try {
//         // return await subjectModel.findOne({userId:"66fe5d7c39ac437e368b54b5"}).populate('questionPaper').populate('userId')
       
//         return await subjectModel.find({subjectId:"66fe6ddf81df16e51db8ea82"}).populate('questionPaper')
//         // return await userModel.findOne({_id:"66fe5d7c39ac437e368b54b5"}).populate('subjects').populate('quepapers')
//     } catch (error) {
//         console.log(error);
//     }
   
// }


export async function addSubject(subject:Subject) {
        console.log("in addSubject api in apis");
        console.log("subject--",subject);
        
        try {
            const subjectBody = new subjectModel(subject)    
            
        return await subjectBody.save();
        } catch (error) {
            console.log(error);
        }
    }

export async function addQuestion(question:Question) {
        console.log("in addQuestion api in apis");
        console.log("question--",question);
        
        try {
            const questionBody = new questionModel(question)    
            
        return await questionBody.save();
        } catch (error) {
            console.log(error);
        }
    }

    export async function getQuestionPaperBySubjectId() {
            console.log("in getQuestionPaper");
            try {
                // return await subjectModel.findOne({userId:"66fe5d7c39ac437e368b54b5"}).populate('questionPaper').populate('userId')
                return await subjectModel.find({subjectId:"6703dacf793f4a048dc725f1"}).populate('questionPaper')
                // return await userModel.findOne({_id:"66fe5d7c39ac437e368b54b5"}).populate('subjects').populate('quepapers')
            } catch (error) {
                console.log(error);
            }
    }
 

    // "6703dacf793f4a048dc725f1"


*/