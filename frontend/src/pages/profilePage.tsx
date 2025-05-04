import { useAuth } from "../context/Authcontext";
import { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
    const [ profile, setProfile ] = useState<any>(null)
    const { user } = useAuth()

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/me', {withCredentials: true})
                setProfile(res.data.user)
                console.log(res)
            } catch (error) {
                console.log(error)
            }
        }

        fetchProfile()
    }, [])

    if (!profile) return <div className="text-center mt-10">Loading...</div>;


    return ( 
        <div className="max-w-2xl mx-auto p-4">
            <div className="flex items-center space-x-5">
                <img
                    src={profile.avatarUrl || "C:/Users/dell/Eco-social/frontend/src/assets/react.svg"}
                    alt="avatar"
                    className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                    <h2 className="text-xl font-semibold"> Username: {profile.username}</h2>
                    <p className="text-gray-400"> Email: {profile.email}</p>

                </div>
            </div>
            <div className="mt-4">
                <h3 className="text-lg font-bold mb-1">About</h3>
                <p>{profile.bio || "No bio provided yet"}</p>
            </div>
        </div>
    )
}

export default Profile