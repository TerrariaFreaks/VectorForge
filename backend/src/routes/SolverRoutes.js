import protect from '../middleware/AuthMiddleware.js'
import { solver } from '../controllers/SolverController.js'
import express from 'express'

const solverRouter = express.Router()

solverRouter.post('/solve-linear-equation', protect, solver)

export default solverRouter