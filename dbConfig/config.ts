import mongoose, { connect, connection, ConnectionStates } from "mongoose";
import dotenv from "dotenv"

dotenv.config()

interface ConnectionInterface {
  isConnected: ConnectionStates;
}
const conn: ConnectionInterface = {
  isConnected: 0,
};

export async function dbConnect(){
  if (conn.isConnected === 1) return;
//   const db = await connect("mongodb+srv://prashikkamble808:1CO3OycJ83d2ESZq@cluster0.3iyzgzj.mongodb.net/testDataBase?retryWrites=true&w=majority&appName=Cluster0");
  const db = await connect("mongodb+srv://prashikkamble808:1CO3OycJ83d2ESZq@cluster0.3iyzgzj.mongodb.net/testQuestionDataBase?retryWrites=true&w=majority&appName=Cluster0");
  
conn.isConnected = db.connections[0].readyState;
  console.log("Connected to database");
}
