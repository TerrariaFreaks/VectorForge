import { addMatrices,mulMatrices, transposeMatrix, subtractMatrices, scalarMultiplyMatrices  } from "../controllers/MatOpsController.js";
import protect from '../middleware/AuthMiddleware.js'
import express from 'express'

const matOpsRouter = express.Router()

matOpsRouter.post("/add-matrices", protect, addMatrices)
matOpsRouter.post('/mul-matrices', protect, mulMatrices)
matOpsRouter.post('/transpose-matrix', protect, transposeMatrix)
matOpsRouter.post('/subtract-matrices', protect, subtractMatrices)
matOpsRouter.post('/scalar-multiply-matrix', protect, scalarMultiplyMatrices)

export default matOpsRouter