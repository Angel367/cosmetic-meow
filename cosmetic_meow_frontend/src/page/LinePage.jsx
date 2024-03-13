import Header from "../components/baseComponents/Header";
import Line from "../components/linePage/Line";
import Footer from "../components/baseComponents/Footer";
import '../styles/BaseStyles/SmallProductStyles.css'
import '../styles/LineStyles.css'
import React from 'react';


function LinePage() {

    return (
        <div className="LinePageApp">
            <Header/>
            <Line/>
            <Footer/>
        </div>
    );
}

export default LinePage;
