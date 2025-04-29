
import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { updateUserProfile } from "../services/userService"

const ProfilePage = () => {
    const { user, setUser } = useAuth()
    const [isEditing, setIsEditing] = useState(false)
    const [name, setName] = useState(user?.name || "")
    const [bio, setBio] = useState(user?.bio || "")
    const [profileImage, setProfileImage] = useState(null)
    const [imagePreview, setImagePreview] = useState(user?.profileImageUrl || "")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState("")

    // Update state when user data changes
    useEffect(() => {
        if (user) {
            setName(user.name || "")
            setBio(user.bio || "")
            if (user.profileImageUrl) {
                setImagePreview(user.profileImageUrl)
            }
        }
    }, [user])

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setProfileImage(file)

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
        setError("")

        try {
            setIsSubmitting(true)

            const updatedUserData = await updateUserProfile({
                name,
                bio,
                profileImage,
            })

            // Update the user context with the new profile data
            if (setUser) {
                setUser(updatedUserData)
            }

            setIsEditing(false)
            setProfileImage(null)
        } catch (err) {
            console.error("Failed to update profile:", err)
            setError(err.message || "Failed to update profile")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                    <h1 className="text-2xl font-bold mb-6">My Profile</h1>

                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    )}

                    {isEditing ? (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="flex flex-col items-center mb-4">
                                {imagePreview ? (
                                    <img
                                        src={imagePreview || "/placeholder.svg"}
                                        alt="Profile"
                                        className="w-32 h-32 rounded-full object-cover mb-2"
                                    />
                                ) : (
                                    <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mb-2">
                                        <span className="text-gray-500 text-4xl">{name.charAt(0)}</span>
                                    </div>
                                )}

                                <label className="btn btn-secondary cursor-pointer">
                                    Change Photo
                                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                                </label>
                            </div>

                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="input"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <input id="email" type="email" value={user?.email || ""} className="input bg-gray-100" disabled />
                                <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                            </div>

                            <div>
                                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                                    Bio
                                </label>
                                <textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} rows={4} className="input" />
                            </div>

                            <div className="flex justify-end space-x-2">
                                <button type="button" onClick={() => setIsEditing(false)} className="btn btn-secondary">
                                    Cancel
                                </button>
                                <button type="submit" disabled={isSubmitting} className="btn btn-primary disabled:opacity-50">
                                    {isSubmitting ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div>
                            <div className="flex flex-col items-center mb-6">
                                {user?.profileImageUrl ? (
                                    <img
                                        src={user.profileImageUrl || "/placeholder.svg"}
                                        alt="Profile"
                                        className="w-32 h-32 rounded-full object-cover mb-2"
                                    />
                                ) : (
                                    <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mb-2">
                                        <span className="text-gray-500 text-4xl">{user?.name?.charAt(0) || "U"}</span>
                                    </div>
                                )}
                                <h2 className="text-xl font-semibold">{user?.name}</h2>
                                <p className="text-gray-600">{user?.email}</p>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-2">Bio</h3>
                                <p className="text-gray-700">{user?.bio || "No bio provided yet."}</p>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-2">Account Information</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500">Member since</p>
                                        <p className="font-medium">
                                            {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Unknown"}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Last updated</p>
                                        <p className="font-medium">
                                            {user?.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : "Unknown"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <button onClick={() => setIsEditing(true)} className="btn btn-primary">
                                    Edit Profile
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProfilePage
