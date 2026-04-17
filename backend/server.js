import connectDB from "./src/db/index.js";
import express from 'express'
import dotenv from 'dotenv'
import userRouter from "./src/routes/AuthRoutes.js";
import matOpsRouter from "./src/routes/MatOpsRoutes.js";
import laRouter from "./src/routes/LARoutes.js";
import solverRouter from "./src/routes/SolverRoutes.js";
import cors from 'cors'

dotenv.config()

connectDB()

const app = express()

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json())

app.use('/api/users', userRouter)
app.use('/api/math', matOpsRouter)
app.use('/api/linear-algebra', laRouter)
app.use('/api/linear-algebra', solverRouter)

app.get('/', (req, res) => {
    res.send("API is running...")
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})