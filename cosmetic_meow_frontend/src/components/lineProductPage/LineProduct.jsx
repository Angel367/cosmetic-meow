import {Link, useParams} from "react-router-dom";

import LineProductImgHolder from "./LineProductImgHolder";
import LineProductDescription from "./LineProductDescription";
import useFetchData from "../useFetchData";
import React, {useEffect, useState} from 'react';
const arrow = process.env.PUBLIC_URL + '/img/line-page/black-arrow.svg';


function LineProduct(props) {
    const {id} = useParams();
    let product = useFetchData('product/' + id);
    // console.log(product, "product")
        return (
            <main className="main-line-product">
                <Link to={"/line"}
                      className="close"/>
                {/* todo fix cursor*/}
                <article>
                    <LineProductImgHolder/>
                    {/* todo fix img*/}
                    <LineProductDescription product={product}/>
                </article>

                <Link to={"/line"}
                      className="back">К линейке продуктов
                    <img src={arrow} alt="arrow"/>
                </Link>
            </main>
        );
}
export default LineProduct;