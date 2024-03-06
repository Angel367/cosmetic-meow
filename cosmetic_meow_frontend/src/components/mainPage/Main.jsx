import React from 'react';
import '../../styles/MainStyles.css';
import '../../styles/BaseStyles/SmallProductStyles.css'
import MainAdvantages from "./MainAdvantages";
import MainReview from "./MainReview";
import MainProducts from "./MainProducts";
import MainPartners from "./MainPartners";
import MainSubscribe from "./MainSubscribe";
import fetchData from "../fetchData";
import MainTitle from "./MainTitle";


const arrow = process.env.PUBLIC_URL + '/img/line-page/black-arrow.svg';

const Main = () => {
    let products = fetchData('http://localhost:3000/products');
    return (
        <main>
            <MainTitle arrow={arrow}/>
            <MainAdvantages arrow={arrow}/>
            <MainReview/>
            <MainProducts products={products} arrow={arrow}/>
            <MainPartners arrow={arrow}/>
            <MainSubscribe arrow={arrow}/>
        </main>
    );
};

export default Main;