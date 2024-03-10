import Header from "../components/baseComponents/Header";
import LineProduct from "../components/lineProductPage/LineProduct";
import Footer from "../components/baseComponents/Footer";
import '../styles/LineProductStyles.css'
import React from 'react';
import {useParams} from "react-router-dom";


function LineProductPage() {

        return (
            <div className="LineProductApp">
                <Header/>
                <LineProduct />
                <Footer/>
            </div>
        );
    }


export default LineProductPage;
