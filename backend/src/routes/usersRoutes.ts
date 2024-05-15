import {Router} from 'express'
import { getAllUsers, userLogin, userSignup, verifyUser } from '../contollers/userController.js';
import { loginValidators, sigupValidators, validate } from '../utils/validators.js';
import { verifyToken } from '../utils/tokenManager.js';
const userRoutes = Router();

userRoutes.get('/',getAllUsers)   // http://localhost:8000/api/v1/user/
userRoutes.post('/signup',validate(sigupValidators),userSignup)
userRoutes.post('/login',validate(loginValidators),userLogin)
userRoutes.get('/auth-status',verifyToken, verifyUser)
export default userRoutes