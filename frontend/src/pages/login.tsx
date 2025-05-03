import React,{ useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loginUser, getMe } from "../api/auth";
import { useAuth } from "../context/Authcontext";

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { setUser, setIsAuthenticated } = useAuth();
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from || "/dashboard"


    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await loginUser(email, password)
        } catch (e) {
            setError('Invalid credentials')
            console.log(e)
        }

        try {
            const res = await getMe()
            console.log(res)
            setUser(res.data);
            setIsAuthenticated(true)
            navigate(from, { replace: true })
            setError('')
        } catch (error) {
            setError("session fetch fails")
            console.log(error)
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
