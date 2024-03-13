import {Link, useNavigate, useParams} from "react-router-dom";

import LineProductImgHolder from "./LineProductImgHolder";
import LineProductDescription from "./LineProductDescription";

import React, {useEffect} from 'react';
import useFetchData from "../../requests/useFetchData";
const arrow = process.env.PUBLIC_URL + '/img/line-page/black-arrow.svg';


function LineProduct() {

    const {id_product, id_line} = useParams();
    let navigate = useNavigate();
    let product = useFetchData('product/' + id_product);
    useEffect(() => {
        document.title = product.name || "Продукт";
        window.scrollTo(0, 0);
    });
    // console.log(product, "product")
        return (
            <main className="main-line-product">
                <a href='#'>
                <div
                    onClick={() => navigate(-1)}
                      className="close"/>
                </a>
                {/* todo fix cursor*/}
                <article>
                    <LineProductImgHolder/>
                    {/* todo fix img*/}
                    <LineProductDescription product={product}/>
                </article>

                <Link to={`/lines/${id_line}`}
                      className="back">К линейке продуктов
                    <img src={arrow} alt="arrow"/>
                </Link>
            </main>
        );
}
export default LineProduct;