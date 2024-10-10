/*import mongoose, { Schema , model } from "mongoose";

const schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
  
  });
  
  
  const UserModel = mongoose.model('User', schema);
  module.exports=UserModel
  */

  // import mongoose, { model, Schema } from "mongoose"
  // export interface User {
  //   name: string;
  //   email: string;
   
  // }
  
  // // Schema
  // const schema = new Schema<User>({
  //   name: { type: String, required: true },
  //   email: { type: String, required: true },

  // });
  
  // export default model<User>('User',schema)
 

  import mongoose, { model, Schema } from "mongoose";
/*
export interface Question{
    questionBody: String;
    type: ["mcq", "descriptive"];
    choices: String[];
    marksAlloted: Number;
    subjectId:String;
    userId:String;
  }
  
  export interface User{
    userName:String,
    email:String,
    contactNo:Number,
    password: String,
    confirmPassword:String,
    profileImage:{
        data: Buffer,
        contentType: String
    },
    subjectsData:Subject[]
    questionsIds:Question[]
  }
export interface Subject{
            title:String,
            userId:String,
            qp:{
              questions:Question[]
            },
            
            questionsData:[]  
}

const questionSchema = new Schema<Question>({
  questionBody:{type: String, required:true},
    type:["mcq","descriptive"],
    choices:[{type:String,  required:true}],
    marksAlloted:{type: Number, required:true},
    subjectId:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subjects'
    }]
    , userId:{ 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
     
})

const userSchema = new Schema<User>({
  userName:{type: String, required:true},
  email:{type: String, required:true},
  contactNo:{type: Number, required:true},
  password:{type:String,  required:true },
  confirmPassword: {type:String,  required:true },
  profileImage:{
      data: Buffer,
      contentType: String
  },
  subjectsData:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subjects'
  }],
  questionsIds:[{
     type: mongoose.Schema.Types.ObjectId,
    ref: 'Questions'
  }]
   
})

const subjectSchema = new Schema<Subject>({
    
        title:{type:String,  required:true },
        userId:{ 
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        },
        questionsData:[{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Questions'
        }],
})
        */

export interface Question{
  questionBody: String;
  type?:"mcq" | "descriptive";
  choices?: String[];
  marksAlloted: Number;
  qustionPaper:String[];
  questionId:String, 
}


const questionSchema = new Schema<Question>({
  questionBody:{type: String, required:true},
    type:{ type: String, enum: ["mcq", "descriptive"], required: false },
    choices:[{type:String,  required:false}],
    marksAlloted:{type: Number, required:true},
    questionId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'QuestionPaper'
     }
  })

export interface QuestionPaper{
  paperName:String;
  paper:Question[]
  subjectId:String
}
const questionPaperSchema = new Schema<QuestionPaper>({
  paperName:{type: String, required:true},
  paper:[questionSchema],
  subjectId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subjects'
   }
})


  
export interface Subject{
          title:String,
          userId:String,
          questionPaper:String[]
}
const subjectSchema = new Schema<Subject>({
  title:{type:String,  required:true },
  questionPaper:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Questions'
  }],
  userId:{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  }
})


export interface User{
  userName:string,
  email:string,
  contactNo:Number,
  password: string,
  confirmPassword:string,
  profileImage:{
      data: Buffer,
      contentType: string
  },
  subjects:string[]
  _id:string
}

const userSchema = new Schema<User>({
userName:{type: String, required:true},
email:{type: String, required:true}, 
contactNo:{type: Number, required:true},
password:{type:String,  required:true },
confirmPassword: {type:String,  required:true },
profileImage:{
    data: Buffer,
    contentType: String
},
subjects:[{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Subjects'
}],
})


/*
export interface Question{
  questionBody: String;
  type: ["mcq", "descriptive"];
  choices: String[];
  marksAlloted: Number;
  subjectId:String, 
  userId:String

}

export interface User{
  userName:String,
  email:String,
  contactNo:Number,
  password: String,
  confirmPassword:String,
  profileImage:{
      data: Buffer,
      contentType: String
  },
  subjects:String[],
  quepapers:String[]
}
export interface Subject{
          title:String,
          userId:String,
        
}
const questionSchema = new Schema<Question>({
questionBody:{type: String, required:true},
  type:["mcq","descriptive"],
  choices:[{type:String,  required:true}],
  marksAlloted:{type: Number, required:true},
   subjectId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subjects'
   },
   userId:{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  }
 
})

const userSchema = new Schema<User>({
userName:{type: String, required:true},
email:{type: String, required:true},
contactNo:{type: Number, required:true},
password:{type:String,  required:true },
confirmPassword: {type:String,  required:true },
profileImage:{
    data: Buffer,
    contentType: String
},
subjects:[{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Subjects'
}],
quepapers:[{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Questions'
}]
})

const subjectSchema = new Schema<Subject>({
  
      title:{type:String,  required:true },
     
      userId:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
      }
    })
    */
export const subjectModel = mongoose.model('Subjects',subjectSchema)
export const userModel = mongoose.model('Users',userSchema)
export const questionModel =  mongoose.model('Questions',questionSchema)
export const quepapersModel = mongoose.model('QuestionPaper',questionPaperSchema)
