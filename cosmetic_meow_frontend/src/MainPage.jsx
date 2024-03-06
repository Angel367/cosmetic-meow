import Header from "./components/baseComponents/Header";
import Main from "./components/mainPage/Main";
import Footer from "./components/baseComponents/Footer";
import React from 'react';


function MainPage() {
    return (
        <div className="App">
            <Header/>
            <Main/>
            <Footer/>
        </div>
    );
}

export default MainPage;
