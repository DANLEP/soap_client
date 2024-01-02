'use client'

import React, {useEffect, useState} from 'react';
import Link from "next/link";

export type Photo = {
    url: string;
    id_photo: number;
    created_at: string;
};

export type Attraction = {
    id_attraction: number;
    name: string;
    rating: number;
    review_count: number;
    like_count: number;
    photos: Photo[];
    tags?: string[];
};

const AttractionCardClient: React.FC<{ attraction: Attraction }> = ({ attraction }) => {
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

    // Handler to change to the next photo
    useEffect(() => {
        // Set up an interval to change the image every 5 seconds
        const intervalId = setInterval(() => {
            setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % attraction.photos.length);
        }, 3000); // 5000ms = 5 seconds

        // Clean up the interval on unmount
        return () => clearInterval(intervalId);
    }, [attraction.photos.length]);

    // Calculate the width of the rating bar based on the rating
    const ratingPercentage = (attraction.rating / 5) * 100;

    // Use the first photo for the background image
    const backgroundImageUrl = attraction.photos[currentPhotoIndex]?.url;

    return (
        <div className="relative flex rounded-lg overflow-hidden h-[720px] w-[440px] mx-auto">
            {/* Background Image */}
            <img
                src={backgroundImageUrl}
                alt={attraction.name}
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

            {/* Attraction Info */}
            <div className="relative p-4 w-full mt-auto">
                <Link href={`/${attraction.id_attraction}`}>
                    <h3 className="text-white text-xl font-bold mb-2">{attraction.name}</h3>
                </Link>

                {/* Tags */}
                {attraction.tags && (
                    <div className="flex flex-wrap gap-2 my-2">
                        {attraction.tags.map((tag, index) => (
                            <span key={index} className="bg-white text-black text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-black dark:text-white">
                  {tag}
                </span>
                        ))}
                    </div>
                )}

                {/* Rating Progress Bar */}
                <div className="w-full bg-gray-700 my-2 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${ratingPercentage}%` }}></div>
                </div>

                {/* Interaction Icons */}
                <div className="flex items-center justify-between text-white">
                    <div className="flex items-center">
                        {/* Replace with heart icon */}
                        ❤️
                        <span className="ml-1">{attraction.like_count}</span>
                    </div>
                    <div className="flex items-center">
                        {/* Replace with comment icon */}
                        💬
                        <span className="ml-1">{attraction.review_count}</span>
                    </div>
                    <div className="flex items-center">
                        {/* Replace with share icon */}
                        📍
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AttractionCardClient;
