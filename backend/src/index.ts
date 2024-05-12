import app from "./app.js"
import { connectToDatabase } from "./db/connection.js"

const PORT = process.env.PORT || 8000;

connectToDatabase().then( ()=>{
  app.listen(PORT,()=>console.log(`Server Started At PORT ${PORT} and Connected to Database`))
}).catch((error)=>{
    console.log(error);
})




