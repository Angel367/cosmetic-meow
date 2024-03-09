import React from 'react';
import MainAdvantages from "./MainAdvantages";
// import MainReview from "./MainReview";
import MainProducts from "./MainProducts";
import MainPartners from "./MainPartners";
// import MainSubscribe from "./MainSubscribe";
import fetchData from "../useFetchData";
import MainTitle from "./MainTitle";


function Main  ()  {

    let products = fetchData('http://localhost:3000/products');
    return (
        <main className='main'>
            <MainTitle/>
            <MainAdvantages/>
            {/*<MainReview/>*/}
            <MainPartners/>
            <MainProducts products={products}/>
            {/*<MainSubscribe arrow={arrow}/>*/}
        </main>
    );
}

export default Main;