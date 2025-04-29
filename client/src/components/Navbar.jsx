

import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const Navbar = () => {
    const { user, logout } = useAuth()

    return (
        <nav className="bg-blue-600 text-white shadow-md">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link to="/" className="text-xl font-bold">
                    MyApp
                </Link>

                <div className="flex items-center space-x-4">
                    <Link to="/" className="hover:text-blue-200">
                        Home
                    </Link>

                    {user ? (
                        <>
                            <Link to="/dashboard" className="hover:text-blue-200">
                                Dashboard
                            </Link>
                            <Link to="/profile" className="hover:text-blue-200">
                                Profile
                            </Link>
                            <button onClick={logout} className="bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="hover:text-blue-200">
                                Login
                            </Link>
                            <Link to="/register" className="bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
