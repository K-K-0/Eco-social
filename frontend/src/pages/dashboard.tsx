// src/components/layout/DashboardLayout.tsx
import React from "react";
import { Link, Navigate } from "react-router-dom";
import image from '../assets/undraw_connected-world_anke.svg'
import { useAuth } from "../context/Authcontext";
import Loader from "../components/loader";

const Dashboard = ({ children = "" }: { children?: React.ReactNode }) => {

    const { isAuthenticated, loading } = useAuth()

    if(loading) return <div> <Loader/></div>

    if(!isAuthenticated) return <Navigate to='/login' /> 
    
    return (
        <div className="min-h-screen bg-[#FFFACD] text-gray-800">
            <nav className="bg-[#FFFACD] shadow px-6 py-10 flex justify-between items-center sticky top-0 z-50">
                <div className="text-3xl font-bold  py-2 text-[#002d1f]">
                    <a href="http://localhost:5173/dashboard">VanaEcho</a>
                </div>
                <div className="space-x-5">
                    <Link to="/posts" className="text-2xl rounded-3xl text-center px-8 py-2 text-1xl ">Posts</Link>
                    <Link to="/profile" className="text-2xl rounded-3xl text-center px-8 py-2 text-1xl">Profile</Link>
                    <Link to="/addOrg" className="text-2xl rounded-3xl px-8 text-center py-2 text-1xl">Organization</Link>
                    <Link to="/" className="text-2xl rounded-3xl px-8 text-center py-2 text-1xl">Map</Link>
                    <Link to="/signup" className=" text-2xl rounded-3xl px-8 text-center py-2 text-1xl">Signup</Link>
                    <Link to="/logout" className=" text-2xl hover:bg-red-500 hover:text-white rounded-3xl px-8 text-center py-3 text-1xl">Logout</Link>
                </div>

            </nav>

            <main className="p-6 bg-lime-300 h-180">
                <div className="flex flex-row gap-2">
                    <div className="w-250">
                        <div className="py-30">
                            <p className="text-6xl text-[#002d1f] font-bold">Let's create Earth <p className="mt-8 bg-gray-700 text-[#FFFACD] w-100 px-2 py-4 rounded">FOR FUTURE</p></p>
                            <p className="font-bold mt-20 text-2xl justify w-150"> Planting a tree might seem like a small act, but it’s a bold statement that you believe in the future of this planet.</p>
                        </div>
                    </div>
                    <img src={image} className="w-250 h-125 mt-20" alt="nothing"/>
                    
                </div>
                
            </main>
            
        </div>
    );
};

export default Dashboard;
