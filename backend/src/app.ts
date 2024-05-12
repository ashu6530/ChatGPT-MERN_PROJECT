import express from "express";
import { config } from 'dotenv'
import morgan from 'morgan'
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
config();
const app = express()


//middleware for getting the data from the client 
app.use(express.json())
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use('/api/v1',appRouter)


//reomve it from production 
app.use(morgan("dev"))

export default app