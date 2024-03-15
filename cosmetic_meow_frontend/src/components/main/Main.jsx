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
    useEffect(() => {
    async function fetchProducts(){
        let data = await fetchData('product', {page_size: 6});
        setProducts(data?.results);
    }
    fetchProducts();
    }, []);

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