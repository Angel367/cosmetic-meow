import Header from "../components/baseComponents/Header";
import Footer from "../components/baseComponents/Footer";
import '../styles/DevelopmentStyles.css';
import  '../styles/BaseStyles/BlueButtonStyles.css';
import React from 'react';
import Feedback from "../components/feedbackPage/Feedback";

function FeedbackPage() {
    return (
        <div className="DevApp">
            <Header/>
            <Feedback/>
            <Footer/>
        </div>
    );
}

export default FeedbackPage;
