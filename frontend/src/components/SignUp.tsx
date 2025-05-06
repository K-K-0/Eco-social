import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const SignUp = () => {
    const [ form, setForm ] = useState({ username: "", email: "", password: ""})
    const [ error, setError ] = useState("")
    const navigate = useNavigate()


    const HandleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value})
    }

    const submit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        try {
            await axios.post(" http://localhost:5000/api/auth/register", form, { withCredentials: true })
            navigate('/login')
        } catch (error) {
            console.log(error)
        }
    }




    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-zinc-800 shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-center text-white">Sign Up</h2>
            <form onSubmit={submit} className="space-y-4">
                <input
                    name="username"
                    type="text"
                    placeholder="Username"
                    value={form.username}
                    onChange={HandleChanges}
                    className="w-full px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md text-white border border-white/20 placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
                    required
                />
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={HandleChanges}
                    className="w-full px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md text-white border border-white/20 placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
                    required
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={HandleChanges}
                    className="w-full px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md text-white border border-white/20 placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                >
                    Create Account
                </button>
            </form>
        </div>
    );
}

export default SignUp