import Header from "../components/baseComponents/Header";
import Footer from "../components/baseComponents/Footer";
import '../styles/DevelopmentStyles.css';
import  '../styles/BaseStyles/BlueButtonStyles.css';
import React, {useEffect} from 'react';
import Feedback from "../components/feedbackPage/Feedback";
import NotificationContainer from "react-notifications/lib/NotificationContainer";

function FeedbackPage() {
    useEffect(() => {
        document.title = "Обратная связь";
        window.scrollTo(0, 0);
    });
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
