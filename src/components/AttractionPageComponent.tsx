import React, { useEffect, useState } from 'react';
import AttractionInfo, {Attraction} from './AttractionInfo';

type Props = {
    id: string | number; // The ID of the attraction
};

const AttractionPageComponent: React.FC<Props> = ({ id }) => {
    const [attraction, setAttraction] = useState<Attraction | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAttraction = async () => {
            try {
                const response = await fetch(`/api/attractions/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch attraction data');
                }
                const data: Attraction = await response.json();
                setAttraction(data);
            }
            finally {
                setLoading(false);
            }
        };

        fetchAttraction();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!attraction) {
        return <div>No attraction found</div>;
    }

    return <AttractionInfo attraction={attraction} />;
};

export default AttractionPageComponent;
