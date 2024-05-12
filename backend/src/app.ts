import express from "express";
import { config } from 'dotenv'
config();
const app = express()


//middleware for getting the data from the client 
app.use(express.json())

export default app