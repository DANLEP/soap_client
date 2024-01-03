'use client'

import React, { useState, useEffect } from 'react';

type Photo = {
    url: string;
    id_photo: number;
    created_at: string;
};

type Review = {
    review_text: string;
    rating: number;
    id_review: number;
    created_at: string;
    user: {
        id_user: number;
        username: string;
        first_name: string;
        last_name: string;
    };
    photos: Photo[];
};

const ReviewsManager = () => {
    const [reviews, setReviews] = useState<Review[]>([]);

    // Получение отзывов с сервера
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch('/api/review?status=pending');
                if (!response.ok) {
                    throw new Error('Failed to fetch reviews');
                }
                const data = await response.json();
                setReviews(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchReviews();
    }, []);

    // Обработка обновления статуса отзыва
    const handleReviewUpdate = async (id: number, status:string) => {
        try {
            const response = await fetch(`/api/review/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status }),
            });

            if (!response.ok) {
                throw new Error('Failed to update review');
            }

            // Удаление отзыва из списка после успешного обновления
            setReviews(prev => prev.filter(review => review.id_review !== id));
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            {reviews.length < 1 ? <div className="mx-auto w-fit p-4 rounded-lg bg-gray-300">No new reviews</div> : <></>}
            {reviews.map(review => (
                <div key={review.id_review} className="bg-white shadow-md rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between mb-3">
                        <div>
                            <h2 className="text-lg font-semibold">{review.user.first_name} {review.user.last_name}</h2>
                            <p className="text-gray-600 text-sm">{new Date(review.created_at).toLocaleDateString()}</p>
                        </div>
                        <div className="text-blue-500 font-semibold">
                            Rating: {review.rating}
                        </div>
                    </div>
                    <p className="text-gray-800 mb-3">{review.review_text}</p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => handleReviewUpdate(review.id_review, 'approved')}
                            className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 transition duration-300"
                        >
                            Approve
                        </button>
                        <button
                            onClick={() => handleReviewUpdate(review.id_review, 'rejected')}
                            className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition duration-300"
                        >
                            Reject
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ReviewsManager;
