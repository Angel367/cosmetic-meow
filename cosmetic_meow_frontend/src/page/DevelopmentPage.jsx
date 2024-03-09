import Header from "../components/baseComponents/Header";
import Footer from "../components/baseComponents/Footer";
import Dev from "../components/developmentPage/Dev";
import '../styles/DevelopmentStyles.css';
import  '../styles/BaseStyles/BlueButtonStyles.css';
import React from 'react';

function DevelopmentPage() {
    return (
        <div className="DevApp">
            <Header/>
            <Dev/>
            <Footer/>
        </div>
    );
}

export default DevelopmentPage;
