// This will be your Server Component
import React from 'react';
import {Attraction} from "@/components/AttractionCard.client";

// Props for the Client Component
type AttractionCardClientProps = {
    attraction: Attraction;
};

// Exporting the Client Component for use on the client-side
export const AttractionCardClient: React.FC<AttractionCardClientProps> = React.lazy(() => import('./AttractionCard.client'));

// The Server Component, which just renders the Client Component
const AttractionCard: React.FC<{ attraction: Attraction }> = ({ attraction }) => {
    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <AttractionCardClient attraction={attraction} />
        </React.Suspense>
    );
};

export default AttractionCard;
