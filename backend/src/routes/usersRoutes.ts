import {Router} from 'express'
import { getAllUsers, userLogin, userSignup } from '../contollers/userController.js';
import { loginValidators, sigupValidators, validate } from '../utils/validators.js';
const userRoutes = Router();

userRoutes.get('/',getAllUsers)   // http://localhost:8000/api/v1/user/
userRoutes.post('/signup',validate(sigupValidators),userSignup)
userRoutes.post('/login',validate(loginValidators),userLogin)
export default userRoutes