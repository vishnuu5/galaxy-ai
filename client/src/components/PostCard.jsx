

import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { deletePost } from "../services/postService"

const PostCard = ({ post, onDelete, onEdit }) => {
    const { user } = useAuth()
    const [isDeleting, setIsDeleting] = useState(false)

    const isAuthor = user && post.author._id === user._id

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            try {
                setIsDeleting(true)
                await deletePost(post._id)
                onDelete(post._id)
            } catch (error) {
                console.error("Failed to delete post:", error)
                alert("Failed to delete post")
            } finally {
                setIsDeleting(false)
            }
        }
    }

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {post.imageUrl && (
                <img src={post.imageUrl || "/placeholder.svg"} alt={post.title} className="w-full h-48 object-cover" />
            )}

            <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.content}</p>

                <div className="flex items-center text-sm text-gray-500">
                    <span>By {post.author.name}</span>
                    <span className="mx-2">•</span>
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>

                {isAuthor && (
                    <div className="mt-4 flex space-x-2">
                        <button onClick={() => onEdit(post)} className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                            Edit
                        </button>
                        <button
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
                        >
                            {isDeleting ? "Deleting..." : "Delete"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PostCard
