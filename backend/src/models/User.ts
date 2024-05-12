import {Schema,model} from 'mongoose'



const chatSchema = new Schema({
  role:{
    type:String,
    required:true
  },
  content:{
    type:String,
    required:true
  }
},{timestamps:true})


const userSchema = new Schema({
    name: {
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,

    },
    chats:[chatSchema],
    
},{timestamps:true})

export default model("User",userSchema)