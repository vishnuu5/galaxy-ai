
import { createContext, useContext, useState, useEffect } from "react"
import { loginUser, registerUser, logoutUser, getCurrentUser } from "../services/authService"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const checkLoggedIn = async () => {
            try {
                const userData = await getCurrentUser()
                setUser(userData)
            } catch (err) {
                console.error("Failed to get current user:", err)
            } finally {
                setLoading(false)
            }
        }

        checkLoggedIn()
    }, [])

    const login = async (email, password) => {
        try {
            setError(null)
            const userData = await loginUser(email, password)
            setUser(userData)
            return userData
        } catch (err) {
            setError(err.message || "Failed to login")
            throw err
        }
    }

    const register = async (name, email, password) => {
        try {
            setError(null)
            const userData = await registerUser(name, email, password)
            setUser(userData)
            return userData
        } catch (err) {
            setError(err.message || "Failed to register")
            throw err
        }
    }

    const logout = async () => {
        try {
            await logoutUser()
            setUser(null)
        } catch (err) {
            console.error("Logout error:", err)
        }
    }

    const value = {
        user,
        setUser, // Added setUser to allow updating user data
        loading,
        error,
        login,
        register,
        logout,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
