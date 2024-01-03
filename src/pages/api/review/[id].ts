import type { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';

// Получаем конфигурацию для доступа к переменным окружения
const { publicRuntimeConfig } = getConfig();

// Определение типа для ожидаемого тела запроса
type RequestBody = {
    status: 'pending' | 'approved' | 'rejected' | 'hidden';
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // Проверка метода HTTP запроса
    if (req.method !== 'PUT') {
        res.setHeader('Allow', 'PUT');
        res.status(405).end(`Method ${req.method} Not Allowed`);
        return;
    }

    const { id } = req.query;
    const { status } = req.body as RequestBody;

    // Проверка валидности статуса
    if (!['pending', 'approved', 'rejected', 'hidden'].includes(status)) {
        res.status(400).json({ message: 'Invalid status value' });
        return;
    }

    try {
        // Отправляем запрос к внешнему сервису
        const response = await fetch(`http://${publicRuntimeConfig.REVIEW_SERVICE}/api/v1/review/${id}?status=${status}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                // Добавьте любые необходимые заголовки здесь
            },
            // Добавьте тело запроса, если необходимо
        });

        // Проверка успешности запроса
        if (!response.ok) {
            throw new Error(`Error from review service: ${response.statusText}`);
        }

        // Отправляем успешный ответ
        res.status(200).json({ message: 'Review status updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
