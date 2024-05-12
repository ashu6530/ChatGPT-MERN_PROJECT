import express from "express";
import { config } from 'dotenv'
const app = express()


//middleware for getting the data from the client 
app.use(express.json())



//connection and listners 
app.listen(8000,()=>console.log(`Server Started At PORT 8000`))

