import Wrapper from "@/components/Wrapper";
import Header from "@/components/Header";
import React from "react";
import ReviewsManager from "@/components/ReviewsManager";
import '../app/globals.css';

const ReviewsPage = () => {

    return (
        <Wrapper>
            <Header/>
            <ReviewsManager/>
        </Wrapper>
    );
};

export default ReviewsPage;