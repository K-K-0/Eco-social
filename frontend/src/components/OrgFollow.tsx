import { useState } from "react";
import axios from "axios";

type orgType = {
    id: string
    name: string
    description: string
    followers: { id: string} []
}

const OrgCard = ({ org }: {org: orgType}) => {
    const isUserFollowing = org?.followers?.length > 0;
    const [isFollowing, setIsFollowing] = useState(isUserFollowing);

    const toggleFollow = async () => {
        try {
            const endpoint = isFollowing
                ? ` http://localhost:5000/api/eco-orgs/${org.id}`
                : ` http://localhost:5000/api/eco-orgs/${org.id}`;
            await axios.post(endpoint, {}, { withCredentials: true });
            setIsFollowing(!isFollowing);
        } catch (error) {
            console.error("Follow/unfollow failed", error);
        }
    };

    if (!org) return <div>Organization data not found.</div>;


    return (
        <div className="p-4 border rounded shadow-sm bg-white">
            <h3 className="text-lg font-bold">{org.name}</h3>
            <p>{org.description}</p>
            <button
                onClick={toggleFollow}
                className={`mt-2 px-3 py-1 rounded text-white ${isFollowing ? "bg-red-500" : "bg-green-600"}`}
            >
                {isFollowing ? "Unfollow" : "Follow"}
            </button>
        </div>
    );
};

export default OrgCard;
