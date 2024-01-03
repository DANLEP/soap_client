import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
import {NextApiRequest, NextApiResponse} from "next";

type ApiResponse = {
    id_user: number;
    email: string;
    first_name: string;
    last_name: string;
    user_role: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ApiResponse | { error: string }>
) {
    const { id } = req.query; // Get the dynamic part of the URL

    try {
        const userRes = await fetch(
            `http://${publicRuntimeConfig.REVIEW_SERVICE}/api/v1/user/${id}`
        );
        if (!userRes.ok) {
            throw new Error(`Failed to fetch user details, status: ${userRes.status}`);
        }

        res.status(200).json(await userRes.json());
    } catch (error: any) {
        // Catch and return any errors
        console.log(error);
        res.status(500).json({ error: error.message || 'An error occurred while processing your request.' });
    }
}