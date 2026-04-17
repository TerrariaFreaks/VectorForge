import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const registerUser = async (req, res) => {
    try {
        const {email, username, password} = req.body

        if (!email || !username || !password){
            return res.status(400).json({message: "All fields are required"})
        }

        const existingUser = await User.findOne({
            $or: [{username}, {email}]
        })

        if (existingUser){
            return res.status(400).json({message: "User already exists"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = await User.create({
            email: email,
            username: username,
            password: hashedPassword
        })

        return res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            message: "User created successfully",
        })

    } catch (error){
        res.status(500).json({message: error.message})
    }
}

export const loginUser = async (req, res) => {
    try {
        const {identifier, password} = req.body

        if (!identifier || !password){
            return res.status(400).json({message: "All fields are required"})
        }

        const user = await User.findOne({
            $or: [{email: identifier}, {username: identifier}]
        })

        if (!user){
            return res.status(404).json({message: "Invalid username or email"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch){
            return res.status(400).json({message: "Invalid password"})
        }

        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: '1d'}
        )

        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token,
            message: "User logged in successfully"
        })

    } catch (error){
        res.status(500).json({message: error.message})
    }
}



