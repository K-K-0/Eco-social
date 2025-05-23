import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../context/Authcontext";
import CommentSection from "../components/comments";
import Loader from "../components/loader";
import NavBar from "../components/NavBar";

type CommentType = {
    id: string
    content: string
    createdAt: string
    user: {
        username: string
        avatarUrl?: string
    }
}

type FeedType = {
    id: string;
    content: string;
    mediaUrl?: string;
    createdAt: string;
    user: {
        username: string;
        avatarUrl?: string;
    };
    like: Like[]
    comments: CommentType[]
    
};


const Feed = () => {
    const [ feeds, setFeeds ] = useState<FeedType[]>([])
    const [ loading, setLoading ] = useState(true)
    const { user } = useAuth()
    const currentUserId = user?.id
    const [comment, setComment] = useState("")
    const [posting, setPosting] = useState(false)


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

   


    if(loading) return <div className="text-center mt-10"><Loader /></div>

    const handleLike = async (postId: string) => {
        try {
            await axios.post(`http://localhost:5000/api/posts/${postId}/like`, {}, { withCredentials: true })


            setFeeds((prevPosts) =>
                prevPosts.map((post) => {
                    if (post.id === postId) {
                        let updatedLikes;
                        if (post.like.some((l) => l.userId === currentUserId)) {
                            updatedLikes = post.like.filter((l) => l.userId !== currentUserId);
                        } else {
                            updatedLikes = [...post.like, { userId: currentUserId, postId }]; 
                        }

                        return { ...post, like: updatedLikes };
                    }
                    return post;
                })
            );

        } catch (error) {
            console.log(error)
        }
    }

    const handleComment = async (postId: string) => {
        if (!comment.trim()) return;

        try {
            setPosting(true)

            await axios.post(`http://localhost:5000/api/posts/:${postId}/comment`, {
                postId,
                content: comment
            }, { withCredentials: true })

            setComment("")
        } catch (error) {
            console.log("error while commenting", error)
        } finally {
            setPosting(false)
        }
    }

    return (
        <div>
            <div><NavBar/></div>
            <div className="max-w-xl mx-auto p-6 mt-40 rounded-4xl bg-sky-300">
                <h1 className="text-2xl font-bold mb-4"></h1>
                {feeds?.length === 0 && (
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
                                ) : feed.mediaUrl.endsWith('.svg') ? (
                                    <object
                                        data={feed.mediaUrl}
                                        type="image/svg+xml"
                                        className="w-full rounded-lg mt-2 object-cover"
                                    />
                                ) : (
                                    <img
                                        src={feed.mediaUrl}
                                        alt="Post visual"
                                        className="w-full rounded-lg mt-2 object-cover"
                                    />
                                )
                            )}

                            <button onClick={() => handleLike(feed.id)} className="text-sm text-blue-500 cursor-pointer">
                                {feed.like.some(like => like.userId === currentUserId) ? "❤️" : "🤍"} <span>{feed.like.length}</span>
                            </button>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Add a comment..."
                                    className="border px-2 py-1 rounded w-full"
                                />
                                <button
                                    onClick={() => handleComment(feed.id)}
                                    disabled={posting}
                                    className="bg-green-600 text-white px-3 py-1 mt-1 rounded"
                                >
                                    {posting ? "Posting..." : "Post"}
                                </button>
                            </div>

                            <CommentSection postId={feed.id} />

                        </div>
                    ))}
                </div>
            </div>
        </div>
    )

   
} 

export default Feed