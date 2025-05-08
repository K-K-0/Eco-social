import React, {useState} from "react";
import { createPost } from "../api/auth";
import NavBar from "../components/NavBar";

const CreatePost =  () => {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [media, setMedia] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const handleMediaChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if(file) {
            setMedia(file)
            setPreview(URL.createObjectURL(file))
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!content || !media) return alert("All field required")

        const formData = new FormData()
        formData.append("content", content)
        formData.append("media", media)
        formData.append("title", title)

        try {
            setLoading(true)
            const res = await createPost(formData)
            alert("Post created")
            setTitle("")
            setContent("")
            setMedia(null)
            setPreview(null)
        } catch (error) {
            console.log(error);
            alert("Something went wrong");
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <NavBar />
            <div className="max-w-xl mx-auto p-4 ">
                <h2 className="text-2xl font-bold mb-4"> Create Eco-Post</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
                    <textarea
                        value={content} onChange={(e) => setContent(e.target.value)} placeholder="Share Your Eco-friendly action"
                        className="w-full p-2 border rounded"
                        rows={4}
                    />
                    <input type="file"
                        placeholder="media"
                        accept="image/*, video/*"
                        onChange={handleMediaChanges}
                    />

                    {preview && (
                        <div className="mt-2">
                            {media?.type.startsWith("video") ? (
                                <video src={preview} controls className="w-full max-h-64" />
                            ) : (
                                <img src={preview} alt="preview" className="w-full max-h-64 object-cover" />
                            )}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                        {loading ? "Posting..." : "Post"}
                    </button>
                </form>
            </div>
           
        </div>
    )
}

export default CreatePost