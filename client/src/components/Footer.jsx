const Footer = () => {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-gray-800 text-white py-6">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <h3 className="text-xl font-bold">MyApp</h3>
                        <p className="text-gray-400">Building amazing experiences</p>
                    </div>

                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
                        <a href="#" className="hover:text-blue-400">
                            About
                        </a>
                        <a href="#" className="hover:text-blue-400">
                            Services
                        </a>
                        <a href="#" className="hover:text-blue-400">
                            Contact
                        </a>
                        <a href="#" className="hover:text-blue-400">
                            Privacy Policy
                        </a>
                    </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-700 text-center text-gray-400">
                    <p>&copy; {currentYear} MyApp. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
