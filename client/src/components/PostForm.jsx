

import { useState, useEffect } from "react"

const PostForm = ({ post, onSubmit, onCancel }) => {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [image, setImage] = useState(null)
    const [imagePreview, setImagePreview] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        if (post) {
            setTitle(post.title || "")
            setContent(post.content || "")
            if (post.imageUrl) {
                setImagePreview(post.imageUrl)
            }
        }
    }, [post])

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImage(file)

            // Create preview
            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreview(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!title.trim() || !content.trim()) {
            alert("Please fill in all required fields")
            return
        }

        try {
            setIsSubmitting(true)

            await onSubmit({
                title,
                content,
                image,
            })

            // Reset form if not editing
            if (!post) {
                setTitle("")
                setContent("")
                setImage(null)
                setImagePreview("")
            }
        } catch (error) {
            console.error("Form submission error:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Title *
                </label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="input"
                    required
                />
            </div>

            <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                    Content *
                </label>
                <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={5}
                    className="input"
                    required
                />
            </div>

            <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                    Image
                </label>
                <input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />

                {imagePreview && (
                    <div className="mt-2">
                        <img src={imagePreview || "/placeholder.svg"} alt="Preview" className="h-32 object-cover rounded-md" />
                    </div>
                )}
            </div>

            <div className="flex justify-end space-x-2">
                {onCancel && (
                    <button type="button" onClick={onCancel} className="btn btn-secondary">
                        Cancel
                    </button>
                )}

                <button type="submit" disabled={isSubmitting} className="btn btn-primary disabled:opacity-50">
                    {isSubmitting ? "Submitting..." : post ? "Update Post" : "Create Post"}
                </button>
            </div>
        </form>
    )
}

export default PostForm
