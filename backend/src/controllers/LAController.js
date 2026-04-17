import axios from 'axios'

const PYTHON_LA_API = "http://localhost:8000/linear-algebra"

export const determinant = async (req, res) => {
    try {
        const matrix = req.body
        if (!matrix){
            return res.status(400).json({message: "Matrix is required"})
        } 
        const result = await axios.post(`${PYTHON_LA_API}/determinant`, matrix)

        return res.json(result.data)

    } catch(error){
        console.error("Python service error", error.message)
        return res.status(500).json({message: error.message})
    }
}

export const inverse = async (req, res) => {
    try {
        const matrix = req.body
        if (!matrix){
            return res.send(400).json({message: "Matrix is required"})
        }
        const result = await axios.post(`${PYTHON_LA_API}/inverse`, matrix)

        return res.json(result.data)

    } catch(error){
        console.error("Python service error", error.message)
        return res.status(500).json({message: error.message})
    }
}

export const rank = async (req, res) => {
    try {
        const matrix = req.body
        if (!matrix){
            return res.send(400).json({message: "Matrix is required"})
        }
        const result = await axios.post(`${PYTHON_LA_API}/rank`, matrix)

        return res.json(result.data)

    } catch(error){
        console.error("Python service error", error.message)
        return res.status(500).json({message: error.message})
    }
}

export const trace = async (req, res) => {
    try {
        const matrix = req.body
        if (!matrix){
            return res.send(400).json({message: "Matrix is required"})
        }
        const result = await axios.post(`${PYTHON_LA_API}/trace`, matrix)

        return res.json(result.data)

    } catch(error){
        console.error("Python service error", error.message)
        return res.status(500).json({message: error.message})
    }
}

export const eigen = async (req, res) => {
    try {
        const matrix = req.body
        if (!matrix){
            return res.send(400).json({message: "Matrix is required"})
        }
        const result = await axios.post(`${PYTHON_LA_API}/eigen`, matrix)

        return res.json(result.data)

    } catch(error){
        console.error("Python service error", error.message)
        return res.status(500).json({message: error.message})
    }
}

