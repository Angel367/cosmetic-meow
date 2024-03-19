import React, {useEffect, useState} from 'react';
import MainAdvantages from "./MainAdvantages";
// import MainReview from "./MainReview";
import MainProducts from "./MainProducts";
import MainPartners from "./MainPartners";
// import MainSubscribe from "./MainSubscribe";

import MainTitle from "./MainTitle";
import fetchData from "../../requests/fetchData";


function Main  ()  {
    let [products , setProducts] = useState();
    let [partners , setPartners] = useState();

    useEffect(() => {
    async function fetchProducts(){
        let data = await fetchData('product', {page_size: 6});
        setProducts(data?.results);
    }
    fetchProducts();
    }, []);

    useEffect(() => {
    async function fetchPartners(){
        let data = await fetchData('product_partner');
        setPartners(data?.results);
    }
    fetchPartners();
    }, []);
    // console.log(partners);
    return (
        <main className='main'>
            <MainTitle/>
            <MainAdvantages/>
            {/*<MainReview/>*/}
            <MainPartners partners={partners}/>
            <MainProducts products={products}/>
            {/*<MainSubscribe arrow={arrow}/>*/}
        </main>
    );
}

export default Main;