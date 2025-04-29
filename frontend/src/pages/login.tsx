import React,{ useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, getMe } from "../api/auth";
import { useAuth } from "../context/Authcontext";

const Login = () => {
    const { setUser } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await loginUser(email, password)
            const res = await getMe()
            setUser(res.data)
            navigate('/Dashboard')
            setError('')
        } catch (e) {
            setError('Invalid credentials')
            console.log(e)
        }
    }


    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email" 
                    value={email} onChange={(e) => setEmail(e.target.value)}
                /> 
                <input type="password" placeholder="Password"
                    value={password} onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit"> Log In</button>
                {error && <p className="text-red-500"> {error}</p>}
            </form>
        </div>
    )
}

export default Login
