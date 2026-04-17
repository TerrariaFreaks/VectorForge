import protect from "../middleware/AuthMiddleware.js";
import express from "express";
import { determinant, inverse, rank, trace, eigen } from "../controllers/LAController.js";

const laRouter = express.Router()

laRouter.post('/find-determinant', protect, determinant)
laRouter.post('/find-inverse', protect, inverse)
laRouter.post('/find-rank', protect, rank)
laRouter.post('/find-trace', protect, trace)
laRouter.post('/find-eigen', protect, eigen)

export default laRouter