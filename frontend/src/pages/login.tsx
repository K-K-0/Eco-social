import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { loginUser, getMe } from "../api/auth";
import { useAuth } from "../context/AuthContext";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [, setError] = useState('');
    const auth = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || "/dashboard";

    if (!auth) {
        throw new Error("AuthContext is undefined. Make sure your component is wrapped in AuthProvider.");
    }

    const { setUser, setIsAuthenticated } = auth;

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await loginUser(email, password);
        } catch (e) {
            setError("Invalid credentials");
            console.log(e);
            return;
        }

        try {
            const res = await getMe();
            setUser(res.data);
            setIsAuthenticated(true);
            navigate(from, { replace: true });
            setError("");
        } catch (error) {
            setError("Session fetch failed");
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
            <div className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-white shadow-xl rounded-2xl px-6 py-10 sm:p-12">
                <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">Welcome Back</h1>

                <form onSubmit={handleLogin} className="space-y-6">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full h-12 px-4 text-base border border-gray-300 rounded-full focus:ring-2 focus:ring-indigo-500 outline-none placeholder-gray-400"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full h-12 px-4 text-base border border-gray-300 rounded-full focus:ring-2 focus:ring-indigo-500 outline-none placeholder-gray-400"
                    />

                    <div className="flex justify-end text-sm">
                        <a href="#" className="text-indigo-600 hover:underline">
                            Forgot Password?
                        </a>
                    </div>

                    <button
                        type="submit"
                        className="w-full h-12 rounded-full bg-indigo-600 hover:bg-indigo-500 transition duration-300 text-white text-base font-semibold"
                    >
                        Login
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Don’t have an account?
                    <Link to="/signup" className="ml-2 text-indigo-600 font-medium hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
