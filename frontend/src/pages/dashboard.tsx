// src/components/layout/DashboardLayout.tsx
import React from "react";
import { Link, Navigate } from "react-router-dom";
import LogoutButton from "./Logout";
import { useAuth } from "../context/Authcontext";

const Dashboard = ({ children = "" }: { children?: React.ReactNode }) => {

    const { isAuthenticated, loading } = useAuth()

    if(loading) return <div>loading...</div>

    if(!isAuthenticated) return <Navigate to='/login' /> 
    
    return (
        <div className="min-h-screen bg-zinc-800 text-gray-800">
            <nav className="bg-zinc-500 shadow px-6 py-4 flex justify-between items-center sticky top-0 z-50">
                <div className="text-xl font-bold text-green-600">EcoSocial</div>
                <div className="space-x-4">
                    <Link to="/dashboard" className="hover:underline">Dashboard</Link>
                    <Link to="/profile" className="hover:underline">Profile</Link>
                    <Link to="/login" className="hover:underline">LogIn</Link>
                    <Link to="/" className="hover:underline">map</Link>
                    <LogoutButton>Logout</LogoutButton>
                </div>
            </nav>

            <main className="p-6">{children}</main>
        </div>
    );
};

export default Dashboard;
