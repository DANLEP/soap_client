import React from 'react';
import Link from "next/link";

const Header: React.FC = () => {
    return (
        <header className="p-5 flex justify-between items-center">
            <div className="flex items-center">
                {/* Logo or Brand Name */}
                <div className="bg-blue-200 rounded-full p-3 mr-4">
                    VG
                </div>
                {/* Navigation */}
                <nav className="hidden sm:flex space-x-4">
                    <Link href={`/`} className="text-gray-700 hover:text-blue-600">
                        Home
                    </Link>
                    <a href="#" className="text-gray-700 hover:text-blue-600">Reviews</a>
                    <a href="#" className="text-gray-700 hover:text-blue-600">New Attraction</a>
                </nav>
            </div>
            {/* User Info & Action Button */}
            <div className="flex items-center">
                <span className="text-gray-700 mr-4 hidden sm:block">user@email.com</span>
            </div>
        </header>
    );
};

export default Header;
