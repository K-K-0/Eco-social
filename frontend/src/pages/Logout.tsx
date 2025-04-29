import { logoutUser } from "../api/auth";
import { useAuth } from "../context/Authcontext";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
    const { setUser } = useAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await logoutUser()
            setUser(null)
            navigate('/login')
        } catch (error) {
            console.log('logout Error', error)
        }
    }

    return (
        <div>
            <button className="text-red-500" onClick={handleLogout}>Logout</button>
        </div>
    )
} 


export default LogoutButton