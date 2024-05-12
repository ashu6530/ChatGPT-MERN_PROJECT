import { Router } from 'express'
import userRoutes from './usersRoutes.js';
import chatRoutes from './chatRoutes.js';
const appRouter = Router ();

appRouter.use('/user',userRoutes)   //api/v1/user
appRouter.use("/chats",chatRoutes)   //api/v1/chats


export default appRouter