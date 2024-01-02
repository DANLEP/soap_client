import React from 'react';
import { useRouter } from 'next/router';
import AttractionPageComponent from "@/components/AttractionPageComponent";
import Wrapper from "@/components/Wrapper";
import Header from "@/components/Header";
import AttractionList from "@/components/AttractionList.client";
import RootLayout from "@/app/layout";
import '../app/globals.css'

const AttractionPage = () => {
    const router = useRouter();
    const { id } = router.query;

    // Check if the id is available. It might not be available on the first render.
    if (!id) return <div>Loading...</div>;

    return (
        <Wrapper>
            <Header/>
            <AttractionPageComponent id={id as string} />
        </Wrapper>
        );
};

export default AttractionPage;
