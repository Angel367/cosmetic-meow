import React from 'react';
import MainAdvantages from "./MainAdvantages";
// import MainReview from "./MainReview";
import MainProducts from "./MainProducts";
import MainPartners from "./MainPartners";
// import MainSubscribe from "./MainSubscribe";

import MainTitle from "./MainTitle";
import useFetchData from "../../helpres/useFetchData";


function Main  ()  {

    let products = useFetchData('product', {page_size: 6});
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