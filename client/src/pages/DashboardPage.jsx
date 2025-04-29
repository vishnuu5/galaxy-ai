
import { useState, useEffect } from "react"
import { getPosts, createPost, updatePost } from "../services/postService"
import PostCard from "../components/PostCard"
import PostForm from "../components/PostForm"

const DashboardPage = () => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [showForm, setShowForm] = useState(false)
    const [editingPost, setEditingPost] = useState(null)

    useEffect(() => {
        fetchPosts()
    }, [])

    const fetchPosts = async () => {
        try {
            setLoading(true)
            const data = await getPosts()
            setPosts(data)
        } catch (err) {
            console.error("Error fetching posts:", err)
            setError("Failed to load posts. Please try again later.")
        } finally {
            setLoading(false)
        }
    }

    const handleCreatePost = async (postData) => {
        try {
            const newPost = await createPost(postData)
            setPosts([newPost, ...posts])
            setShowForm(false)
        } catch (err) {
            console.error("Error creating post:", err)
            alert("Failed to create post")
        }
    }

    const handleUpdatePost = async (postData) => {
        try {
            const updatedPost = await updatePost(editingPost._id, postData)
            setPosts(posts.map((post) => (post._id === updatedPost._id ? updatedPost : post)))
            setEditingPost(null)
        } catch (err) {
            console.error("Error updating post:", err)
            alert("Failed to update post")
        }
    }

    const handleDeletePost = (postId) => {
        setPosts(posts.filter((post) => post._id !== postId))
    }

    const handleEditPost = (post) => {
        setEditingPost(post)
    }

    const handleCancelEdit = () => {
        setEditingPost(null)
    }

    const handleCancelCreate = () => {
        setShowForm(false)
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Dashboard</h1>

                {!showForm && !editingPost && (
                    <button onClick={() => setShowForm(true)} className="btn btn-primary">
                        Create New Post
                    </button>
                )}
            </div>

            {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                    <div className="flex">
                        <div className="ml-3">
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    </div>
                </div>
            )}

            {showForm && (
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">Create New Post</h2>
                    <PostForm onSubmit={handleCreatePost} onCancel={handleCancelCreate} />
                </div>
            )}

            {editingPost && (
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">Edit Post</h2>
                    <PostForm post={editingPost} onSubmit={handleUpdatePost} onCancel={handleCancelEdit} />
                </div>
            )}

            {loading ? (
                <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : posts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post) => (
                        <PostCard key={post._id} post={post} onDelete={handleDeletePost} onEdit={handleEditPost} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No posts found. Create your first post!</p>
                </div>
            )}
        </div>
    )
}

export default DashboardPage
