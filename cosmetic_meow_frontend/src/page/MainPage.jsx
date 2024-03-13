import Header from "../components/baseComponents/Header";
import Main from "../components/mainPage/Main";
import Footer from "../components/baseComponents/Footer";
import React, {useEffect} from 'react';
import '../styles/MainStyles.css';
import '../styles/BaseStyles/SmallProductStyles.css';


function MainPage() {
    useEffect(() => {
        document.title = "Главная";
        window.scrollTo(0, 0);
    });
    return (
        <div className="MainApp">
            <Header/>
            <Main/>
            <Footer/>
        </div>
    );
}

export default MainPage;
