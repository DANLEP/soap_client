import type { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';

// Получаем конфигурацию для доступа к переменным окружения
const { publicRuntimeConfig } = getConfig();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // Проверка метода HTTP запроса
    if (req.method !== 'GET') {
        res.setHeader('Allow', 'GET');
        res.status(405).end(`Method ${req.method} Not Allowed`);
        return;
    }

    const { status } = req.query;

    if (!status) {
        res.status(400).json({ message: 'Status is required' });
        return;
    }

    try {
        const response = await fetch(`http://${publicRuntimeConfig.REVIEW_SERVICE}/api/v1/review/all?status=${status}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        if (!response.ok) {
            throw new Error(`Error from review service: ${response.statusText}`);
        }

        const reviews = await response.json();

        res.status(200).json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
