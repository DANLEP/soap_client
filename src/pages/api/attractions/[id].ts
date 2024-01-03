// pages/api/attractions/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

type ReviewDetails = {
    // Define the structure of the review details
};

type ApiResponse = {
    name: string;
    description: string;
    latitude: number;
    longitude: number;
    seasonality: string;
    contact_information: string | null;
    entrance_fee: number | null;
    opening_time: string | null;
    closing_time: string | null;
    tags: string[] | null;
    reviews: ReviewDetails[] | null;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ApiResponse | { error: string }>
) {
    const { id } = req.query; // Get the dynamic part of the URL

    try {
        // Fetch attraction details
        const attractionRes = await fetch(
            `http://${publicRuntimeConfig.INFORMATION_SERVICE}/api/v1/attraction/${id}`
        );
        if (!attractionRes.ok) {
            throw new Error(`Failed to fetch attraction details, status: ${attractionRes.status}`);
        }
        const attraction: ApiResponse = await attractionRes.json();

        // Fetch reviews for the attraction
        const reviewsRes = await fetch(
            `http://${publicRuntimeConfig.REVIEW_SERVICE}/api/v1/review/?id_attraction=${id}`
        );
        if (!reviewsRes.ok) {
            throw new Error(`Failed to fetch reviews, status: ${reviewsRes.status}`);
        }
        const reviews: ReviewDetails[] = await reviewsRes.json();

        attraction.reviews = reviews;

        // Respond with both attraction details and reviews
        res.status(200).json(attraction);
    } catch (error: any) {
        // Catch and return any errors
        console.log(error);
        res.status(500).json({ error: error.message || 'An error occurred while processing your request.' });
    }
}
