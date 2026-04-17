import axios from 'axios'

const PYTHON_API = 'http://localhost:8000'

export const addMatrices = async (req, res) => {
    try {
        const {matrixA, matrixB} = req.body
        if (!matrixA || !matrixB){
            return res.status(400).json({message: "Both matrices A and B are required"})
        }
        
        const result = await axios.post(`${PYTHON_API}/matrix/add`, {matrixA, matrixB})

        return res.status(200).json(result.data)
        
    } catch(error){
        console.error("Python service error", error.message)
        return res.status(500).json({message: error.message})
    }
}

export const mulMatrices = async (req, res) => {
    try {
        const {matrixA, matrixB} = req.body
        if (!matrixA || !matrixB){
            return res.status(400).json({message: "Both matrices are required"})
        }
        const result = await axios.post(`${PYTHON_API}/matrix/multiply`, {matrixA, matrixB})

        return res.json(result.data)

    } catch(error){
        console.error("Python service error", error.message)
        return res.status(500).json({message: error.message})
    }
}

export const transposeMatrix = async (req, res) => {
    try {
        const matrix = req.body
        if (!matrix){
            return res.status(400).json({message: "A matrix is required"})
        }
        const result = await axios.post(`${PYTHON_API}/matrix/transpose`, matrix)
        
        return res.json(result.data)

    } catch(error){
        console.error("Python service error", error.message)
        return res.status(500).json({message: error.message})
    }
}

export const subtractMatrices = async (req, res) => {
    try {
        const {matrixA, matrixB} = req.body

        if (!matrixA || !matrixB){
            return res.status(500).json({message: "Both matrix A and B are required"})
        }

        const result = await axios.post(`${PYTHON_API}/matrix/subtract`, {matrixA, matrixB})
        return res.json(result.data)

    } catch(error){
        console.error("Python service error", error.message)
        return res.status(500).json({message: error.message})
    }
}

export const scalarMultiplyMatrices = async(req, res) => {
    try {
        const {matrix, scalarK} = req.body
        if (!matrix || !scalarK){
            return res.status(500).json({message: "All fields are required"})
        }
        const result = await axios.post(`${PYTHON_API}/matrix/scalar-multiply`, {matrix, scalarK})

        return res.json(result.data)

    } catch(error){
        console.error("Python service error", error.message)
        return res.status(500).json({message: error.message})
    }
}
