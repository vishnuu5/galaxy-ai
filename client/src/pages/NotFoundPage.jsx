import { Link } from "react-router-dom"

const NotFoundPage = () => {
    return (
        <div className="min-h-[calc(100vh-64px-200px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full text-center">
                <h1 className="text-9xl font-extrabold text-blue-600">404</h1>
                <h2 className="text-3xl font-bold text-gray-900 mt-4">Page Not Found</h2>
                <p className="mt-2 text-lg text-gray-600">The page you're looking for doesn't exist or has been moved.</p>
                <div className="mt-6">
                    <Link to="/" className="btn btn-primary inline-flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path
                                fillRule="evenodd"
                                d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default NotFoundPage
