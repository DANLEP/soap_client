import React, {useEffect, useState} from 'react';
import { FaMapMarkerAlt, FaCalendarAlt, FaMoneyBillWave } from 'react-icons/fa';

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

export type Attraction = {
    name: string;
    description: string;
    latitude: number;
    longitude: number;
    seasonality: string | null;
    contact_information: string | null;
    entrance_fee: string | null;
    opening_time: string | null;
    closing_time: string | null;
    tags: string[];
    id_attraction: number;
    rating: number;
    photos: Photo[];
    reviews: Review[];
};

const AttractionInfo: React.FC<{ attraction: Attraction }> = ({ attraction }) => {
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const [idUser, setUserId] = useState<number>();
    const [userRole, setUserRole] = useState<string>();

    useEffect(() => {
        // Set up an interval to change the image every 5 seconds
        const intervalId = setInterval(() => {
            setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % attraction.photos.length);
        }, 3000); // 5000ms = 5 seconds

        // Clean up the interval on unmount
        return () => clearInterval(intervalId);
    }, [attraction.photos.length]);

    useEffect(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            let userId = localStorage.getItem('id_user');
            let userRole = localStorage.getItem('user_role');
            if (userId) setUserId(Number.parseInt(userId));
            if (userRole) setUserRole(userRole);
        }
    }, []);

    const handleDelete = async (id_review: number) => {
        try {
            const response = await fetch(`/api/review/${id_review}`, {
                method: 'PUT', // Предполагаем, что API использует метод PUT для обновления
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'status': 'hidden'
                })
            });

            if (!response.ok) {
                throw new Error('Error updating review');
            }
            else {
                attraction.reviews = attraction.reviews.filter(review => review.id_review !== id_review)
            }
        } catch (error) {
            console.error('Failed to delete review:', error);
        }
    };


    const backgroundImageUrl = attraction.photos[currentPhotoIndex]?.url;
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold my-4">{attraction.name}</h1>
            <div className="grid md:grid-cols-2 gap-4">
                <div className="relative h-[300px] w-[540px] rounded-lg shadow-md">
                    <img
                        src={backgroundImageUrl}
                        alt={attraction.name}
                        className="absolute inset-0 w-full h-full object-cover rounded-lg"
                    />
                </div>
                <div>
                    <p className="text-lg">{attraction.description}</p>
                    <div className="flex items-center text-sm my-2">
                        <FaMapMarkerAlt className="mr-2" />
                        <span>{`${attraction.latitude}, ${attraction.longitude}`}</span>
                    </div>
                    {attraction.seasonality && (
                        <div className="flex items-center text-sm my-2">
                            <FaCalendarAlt className="mr-2" />
                            <span>{attraction.seasonality}</span>
                        </div>
                    )}
                    {attraction.entrance_fee && (
                        <div className="flex items-center text-sm my-2">
                            <FaMoneyBillWave className="mr-2" />
                            <span>{attraction.entrance_fee}</span>
                        </div>
                    )}
                    <div className="flex flex-wrap gap-2 mt-4">
                        {attraction.tags.map((tag, index) => (
                            <span key={index} className="bg-blue-200 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
                {tag}
              </span>
                        ))}
                    </div>
                </div>
            </div>

            {attraction.reviews.length > 0?
                <div className="my-8">
                    <h2 className="text-2xl font-bold mb-4">Reviews</h2>
                    {attraction.reviews.map((review) => (
                        <div key={review.id_review} className="border-b border-gray-200 mb-4 pb-4">
                            <div className="flex items-center">
                                <div className="mr-4">
                                    <strong>{review.user.first_name} {review.user.last_name}</strong>
                                    <p className="text-sm">{new Date(review.created_at).toLocaleDateString()}</p>
                                </div>
                                <div>Rating: {review.rating}</div>
                            </div>
                            <p>{review.review_text}</p>
                            {userRole === 'admin' && (
                                <button
                                    onClick={() => handleDelete(review.id_review)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Delete
                                </button>
                            )}
                        </div>
                    ))}
                </div>
                : <></>
            }
        </div>
    );
};

export default AttractionInfo;
