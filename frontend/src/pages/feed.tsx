import axios from "axios";
import { useEffect, useState } from "react";

type FeedType = {
    id: string;
    content: string;
    mediaUrl?: string;
    createdAt: string;
    user: {
        username: string;
        avatarUrl?: string;
    };
};

const Feed = () => {
    const [ feeds, setFeeds ] = useState<FeedType[]>([])
    const [ loading, setLoading ] = useState(true)

    useEffect(() => {
        const fetchFeed = async () => {
            try {
                const res = await axios.get('http://localhost:5000/', { withCredentials: true })
                console.log(res.data.feeds)
                setFeeds(Array.isArray(res.data.feeds) ? res.data.feeds : res.data || [])
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        fetchFeed()
    }, [])

    if(loading) return <div className="text-center mt-10">Loading Feed...</div>

    return (
        <div className="max-w-xl mx-auto p-6 mt-5 rounded-4xl bg-sky-300">
            <h1 className="text-2xl font-bold mb-4"> Eco Posts</h1>
            { feeds?.length === 0 && (
                <p className="text-center text-gray-500"> No Post Yet </p>
            )}

            <div className="space-y-4">
                {feeds.map((feed) => (
                    <div key={feed.id} className="bg-green-200 shadow rounded-xl p-4">
                        <div className="flex items-center mb-2">
                            <img
                                src={feed.user.avatarUrl || "/default-avatar.png"}
                                alt="avatar"
                                className="w-10 h-10 rounded-full mr-3 object-cover"
                            />
                            <div>
                                <p className="font-semibold">{feed.user.username}</p>
                                <p className="text-xs text-gray-500">{new Date(feed.createdAt).toLocaleString()}</p>
                            </div>
                        </div>

                        <p className="mb-2">{feed.content}</p>

                        {feed.mediaUrl && (

                            feed.mediaUrl.endsWith('.mp4') ? (
                                <video 
                                    controls
                                    src={feed.mediaUrl}
                                    className="w-full rounded-2xl mt-2 object-cover"
                                />
                            ) : (
                                    <img
                                        src={feed.mediaUrl}
                                        alt="Post visual"
                                        className="w-full rounded-lg mt-2 object-cover"
                                    />
                            )
                        )}
                    </div>
                ))}
            </div>
        </div>
    )

   
} 

export default Feed