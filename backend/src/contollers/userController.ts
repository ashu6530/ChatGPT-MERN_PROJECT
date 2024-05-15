import User from "../models/User.js";
import { hash,compare } from 'bcrypt'
import { createToken } from "../utils/tokenManager.js";
import { Request,Response } from "express";
import { log } from "console";
// get request to get all the users

export const getAllUsers = async (req:Request, res:Response) => {
  try {
    const users = await User.find();
    return res.status(200).json({ message: "Ok", users });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

// SingUp post request
export const userSignup = async (req:Request, res:Response) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email })
    if(existingUser) return res.status(401).send("User Already Registred")
    const hashedPassword = await hash(password,10)
    const user = new User({
      name,
      email,
      password : hashedPassword,
    });
    await user.save();

    //create token and store cookie
    res.clearCookie("auth_token",{
      domain:"localhost",
      httpOnly:true,
      signed:true
     })

     const token = createToken(user._id.toString(),user.email,"7d");
     const expires =new Date ();
     expires.setDate(expires.getDate() + 7)
     res.cookie("auth_token",token,{
      path:'/',
      domain:"localhost",
      expires,
      httpOnly:true,
      signed:true
     })
     
    return res.status(200).json({ message: "Ok", name:user.name ,email:user.email});
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "ERROR", cause: error.message });
  }
};

// Login user post request
export const userLogin = async (req:Request, res:Response) => {
  try {
    const { email, password } = req.body;
     const user = await User.findOne({ email })
     if(!user){
      return res.status(401).send("User not registered")
     }
     const isPasswordCorrect = await compare(password,user.password)
     if(!isPasswordCorrect){
      return res.status(403).send('Incorrect Password')
     }
      
     res.clearCookie("auth_token",{
      domain:"localhost",
      httpOnly:true,
      signed:true
     })

     const token = createToken(user._id.toString(),user.email,"7d");
     const expires = new Date ();
     expires.setDate(expires.getDate() + 7)
     res.cookie("auth_token",token,{
      path:'/',
      domain:"localhost",
      expires,
      httpOnly:true,
      signed:true
     })


    return res.status(200).json({ message: "Ok", name:user.name ,email:user.email  });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "ERROR", cause: error.message });
  }
};

export const verifyUser = async (req:Request, res:Response) => {
  try {
     const user = await User.findById( res.locals.jwtData.id)
     if(!user){
      return res.status(401).send("User not registered Or token malfunction ")
     }

     if(user._id.toString === res.locals.jwtData.id){
      return res.status(401).send("Permission didn't match")
     }
  
    return res.status(200).json({ message: "Ok", name:user.name ,email:user.email  });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "ERROR", cause: error.message });
  }
};

