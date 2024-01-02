// pages/api/index.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import {Attraction} from "@/components/AttractionCard.client";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

export default async function handler(req: NextApiRequest, res: NextApiResponse<Attraction[] | { error: string }>) {
    const { id_user } = req.query; // Get id_user from query parameters

    try {
        // Make sure we have an id_user before making the call
        if (!id_user) {
            throw new Error('id_user is required');
        }

        // Fetching attractions from the external API
        const response = await fetch(
            `http://${publicRuntimeConfig.SEARCH_SERVICE}/api/v1/search/attractions?id_user=${id_user}`
        );

        if (!response.ok) {
            // If the external API responded with an error, throw to catch it below
            throw new Error(`Failed to fetch attractions, status: ${response.status}`);
        }

        const attractions: Attraction[] = await response.json();

        // Send the attractions as the response from this API route
        res.status(200).json(attractions);

    } catch (error: any) {
        // Return a generic error message with a 500 status code
        res.status(500).json({ error: error.message || 'Something went wrong' });
    }
}
