import Header from "../components/baseComponents/Header";
import Footer from "../components/baseComponents/Footer";
import Dev from "../components/developmentPage/Dev";
import '../styles/DevelopmentStyles.css';
import  '../styles/BaseStyles/BlueButtonStyles.css';
import React, {useEffect} from 'react';
import NotificationContainer from "react-notifications/lib/NotificationContainer";

function DevelopmentPage() {
    useEffect(() => {
        document.title = "Контрактное производство"
        window.scrollTo(0, 0);
    });
    return (
        <div className="DevApp">
            <Header/>
            <div>
                <NotificationContainer/>
            </div>
            <Dev/>
            <Footer/>
        </div>
    );
}

export default DevelopmentPage;
