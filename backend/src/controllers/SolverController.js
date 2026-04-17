import axios from 'axios'

export const solver = async (req, res) => {
    try {
        const {matrixA, matrixb, method = 'auto'} = req.body

        if (!matrixA || !matrixb){
            return res.status(400).json({message: "Both matrices are required"})
        }

        const result = await axios.post('http://localhost:8000/linear-algebra/solve', {matrixA, matrixb, method})

        return res.json(result.data)

    } catch(error){
        console.error("Python service error", error.message)
        return res.status(500).json({message: error.message})
    }
}