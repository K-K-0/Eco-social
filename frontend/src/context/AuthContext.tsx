// src/context/AuthContext.tsx
import React, { createContext, useState, useContext, useEffect } from "react";
import { getMe } from "../api/auth"; // Make sure this exists

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkUser = async () => {
            try {
                const res = await getMe();
                setUser(res.data);
            } catch (err) {
                setUser(null);
            }
        };

        checkUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
