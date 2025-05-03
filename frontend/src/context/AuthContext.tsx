// src/context/AuthContext.tsx
import React, { createContext, useState, useContext, useEffect } from "react";
import { getMe } from "../api/auth";



type AuthContextType = {
    user: any;
    setUser: (user: any) => void
    isAuthenticated: boolean;
    setIsAuthenticated: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState(null);
    const [ isAuthenticated, setIsAuthenticated ] = useState(false)

    useEffect(() => {
        const checkUser = async () => {
            try {
                const res = await getMe();
                setUser(res.data);
                setIsAuthenticated(true)
            } catch (error) {
                setUser(null);
                console.log(error)
            }
        };

        checkUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
