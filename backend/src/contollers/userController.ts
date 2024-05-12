import User from "../models/User.js";
import { hash,compare } from 'bcrypt'
// get request to get all the users

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({ message: "Ok", users });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

// SingUp post request
export const userSignup = async (req, res) => {
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
    return res.status(200).json({ message: "Ok", id: user._id.toString()  });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "ERROR", cause: error.message });
  }
};


export const userLogin = async (req, res) => {
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
    return res.status(200).json({ message: "Ok", id: user._id.toString()  });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "ERROR", cause: error.message });
  }
};
