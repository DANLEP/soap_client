'use client'

import React, {useEffect, useState} from 'react';
import AttractionCard, {Attraction} from './AttractionCard.client';
import {FaRegHeart} from "react-icons/fa";
import {BiDislike} from "react-icons/bi";

const AttractionList: React.FC = () => {
    const [attractions, setAttractions] = useState<Attraction[]>([]);
    const fetchAttractions = async () => {
        const response = await fetch('/api/attractions?id_user=2');
        const data = await response.json();
        setAttractions(data);
    };

    // Call fetchAttractions when the component mounts
    useEffect(() => {
        fetchAttractions();
    }, []);

    if (!attractions || attractions.length === 0) {
        return (<div className="flex w-min mx-auto">
            <div className="bg-gray-700 relative flex rounded-lg overflow-hidden h-[720px] w-[440px] mx-auto">
                <h3 className="text-white text-xl font-bold my-auto mx-auto">No more attractions!</h3>
            </div>
        </div>);
    }
    const handleVote = async (attractionId: number, userId: number, preference: string) => {
        try {
            const response = await fetch('/api/preference', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id_user: userId,
                    id_attraction: attractionId,
                    preference_type: preference,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit like');
            }

            // Handle the response from your Next.js API here
            const result = await response.json();
            console.log(result); // Do something with the result
            setAttractions(attractions.filter(attraction => attraction.id_attraction !== attractionId));
        } catch (error) {
            console.error('Error liking the attraction:', error);
        }
    }

    const currentAttraction = attractions[0];


    return (
        <div className="flex w-min mx-auto">
            <button onClick={() => handleVote(currentAttraction.id_attraction, 2, 'like')}
                    className="flex items-center justify-center w-20 h-20 rounded-full bg-blue-500 shadow-lg
              mr-24 focus:outline-none my-auto text-white">
                <FaRegHeart size={44}/>
            </button>
            <AttractionCard attraction={currentAttraction}/>
            <button onClick={() => handleVote(currentAttraction.id_attraction, 2, 'dislike')}
                    className="flex items-center justify-center w-20 h-20 rounded-full bg-red-500 shadow-lg
              ml-24 focus:outline-none my-auto text-white">
                <BiDislike size={44}/>
            </button>
        </div>
    );
};

export default AttractionList;
