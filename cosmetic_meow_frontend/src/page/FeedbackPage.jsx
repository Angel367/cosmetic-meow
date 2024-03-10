import Header from "../components/baseComponents/Header";
import Footer from "../components/baseComponents/Footer";
import '../styles/DevelopmentStyles.css';
import  '../styles/BaseStyles/BlueButtonStyles.css';
import React from 'react';
import Feedback from "../components/feedbackPage/Feedback";
import NotificationContainer from "react-notifications/lib/NotificationContainer";

function FeedbackPage() {
    return (
        <div className="DevApp">

            <Header/>
            <div>
                <NotificationContainer/>
            </div>
            <Feedback/>
            <Footer/>
        </div>
    );
}

export default FeedbackPage;
