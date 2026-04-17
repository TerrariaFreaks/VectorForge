import express from 'express'
import { registerUser, loginUser } from '../controllers/AuthController.js'


const userRouter = express.Router()

// Public routes
userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)

export default userRouter