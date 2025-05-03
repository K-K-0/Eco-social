import React, { ReactNode, useEffect } from "react";
import { useAuth } from "../context/Authcontext";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
    children: ReactNode
}

const Protected = ({ children } : Props) => {
    const navigate = useNavigate()
    const location = useLocation()
    const { isAuthenticated, loading } = useAuth()

    useEffect(() => {
        if(!loading && !isAuthenticated) {
            navigate('/login', {
                state: { from : location.pathname },
                replace: true,
            })
        }
    }, [isAuthenticated, loading,location, navigate])

    if(loading) return <div>Loading</div>

    return <>{isAuthenticated ? children : null}</>
}

export default Protected