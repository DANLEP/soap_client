"use client"
import React, {useEffect, useState} from 'react';
import Link from "next/link";

type User = {
    id_user: number;
    email: string;
    first_name: string;
    last_name: string;
    user_role: string;
};

const Header: React.FC = () => {
    const [user, setUser] = useState<User>();


    useEffect(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            let userId = localStorage.getItem('id_user');
            if (userId) handleUser(userId);
            else {
                localStorage.setItem('id_user', '1');
                handleUser('1');
            }
        }
    }, []);

    const handleUser = async (id_user: string) => {
        try {
            const response = await fetch(`/api/user/${id_user}`);

            if (!response.ok) {
                throw new Error('Failed to get user');
            }

            // Handle the response from your Next.js API here
            const result = await response.json();
            setUser(result);
            localStorage.setItem('user_role', result.user_role);
        } catch (error) {
            console.error('Error liking the attraction:', error);
        }
    }
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
                    {
                        user?.user_role === 'admin' ?
                            <>
                                <Link href={`/reviews`} className="text-gray-700 hover:text-blue-600">
                                    Reviews
                                </Link>
                                <a href="#" className="text-gray-700 hover:text-blue-600">New Attraction</a>
                            </>
                        : <></>
                    }
                </nav>
            </div>
            {/* User Info & Action Button */}
            <div className="flex items-center">
                <span className="text-gray-700 mr-4 hidden sm:block">
                {user ? `${user.first_name} ${user.last_name}` : ""}
                </span>

                <span className="text-gray-700 mr-4 hidden sm:block">
                    {user ? `${user.email}` : ""}
                </span>

                <span className="text-gray-700 mr-4 hidden sm:block">
                {user ? `role: ${user.user_role}` : ""}
                </span>
            </div>
        </header>
    );
};

export default Header;
