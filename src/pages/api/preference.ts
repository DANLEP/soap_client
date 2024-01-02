// pages/api/preference.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

// Define a type for the incoming request body
type PreferenceRequestBody = {
    id_user: number;
    id_attraction: number;
    preference_type: 'like' | 'dislike';
};

// Define a type for the response from the external server, adjust accordingly
type ExternalApiResponse = {
    message: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ExternalApiResponse | { error: string }>
) {
    if (req.method === 'POST') {
        const { id_user, id_attraction, preference_type }: PreferenceRequestBody = req.body;

        // Validate the request body
        if (!id_user || !id_attraction || !preference_type) {
            return res.status(400).json({ error: 'Missing required parameters' });
        }

        // Construct the URL for the external API with query parameters
        const externalApiUrl = new URL(`http://${publicRuntimeConfig.REVIEW_SERVICE}/api/v1/preference/`);
        externalApiUrl.searchParams.append('id_user', id_user.toString());
        externalApiUrl.searchParams.append('id_attraction', id_attraction.toString());
        externalApiUrl.searchParams.append('user_preference', preference_type);

        try {
            // Forward the request to the external API server
            const externalResponse = await fetch(externalApiUrl.href, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any additional headers required by the external API
                },
                // Include any needed body or credentials
                // body: JSON.stringify({ ... }),
            });

            // If the external API call was unsuccessful, throw an error
            if (!externalResponse.ok) {
                throw new Error(`External API responded with status: ${externalResponse.status}`);
            }

            // Get the JSON response from the external API
            const externalData: ExternalApiResponse = await externalResponse.json();

            // Respond with the data from the external API
            res.status(200).json(externalData);
        } catch (error: any) {
            // Catch and return any errors
            res.status(500).json({ error: error.message || 'An error occurred while processing your request.' });
        }
    } else {
        // If the request method is not POST, return a 405 Method Not Allowed
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
