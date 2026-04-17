import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Register() { 
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/register",
        { username, email, password }
      )

      console.log(res.data)

      navigate("/home")

    } catch (error) {
      console.log(error.response?.data?.message || error.message)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-2xl shadow-lg w-80 flex flex-col gap-4"
      >
        <h1 className="text-2xl font-bold text-center mb-2">Register</h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e)=> setUsername(e.target.value)}
          className="p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=> setEmail(e.target.value)}
          className="p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=> setPassword(e.target.value)}
          className="p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 transition p-2 rounded font-semibold"
        >
          Register
        </button>

        <button
          type="button"
          className="bg-red-400 hover:bg-red-600 transition p-2 rounded font-semibold"
        >
          Forgot Password
        </button>

        <p className="text-sm text-center text-gray-400">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/")}
            className="text-blue-400 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>

      </form>

    </div>
  )
}

export default Register