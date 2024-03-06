import Header from "./components/baseComponents/Header";
import LineProduct from "./components/lineProductPage/LineProduct";
import Footer from "./components/baseComponents/Footer";
import React from 'react';
import {useParams} from "react-router-dom";


function LineProductPage() {
    const {id} = useParams()
        return (
            <div className="App">
                <Header/>
                <LineProduct productId={id}/>
                <Footer/>
            </div>
        );
    }


export default LineProductPage;
