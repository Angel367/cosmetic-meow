import {Link, Navigate, useNavigate, useParams} from "react-router-dom";

import LineProductImgHolder from "./LineProductImgHolder";
import LineProductDescription from "./LineProductDescription";

import React, {useEffect, useState} from 'react';
import fetchData from "../../requests/fetchData";
import Loading from "../error/Loading";
const arrow = process.env.PUBLIC_URL + '/img/line-page/black-arrow.svg';


function LineProduct() {
    const {id_product, id_line} = useParams();
    const [product, setProduct] = useState(null);
    let navigate = useNavigate();
    useEffect(() => {
        async function fetchProduct() {
            try {
                const productData = await fetchData('product/' + id_product);
                setProduct(productData);
                document.title = productData.name || "Продукт";
                window.scrollTo(0, 0);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        }
        fetchProduct();
    }, [id_product]);
    if (!product){

        return <Loading/>;
    }
    if (product.response && product.response.status){

        return <Navigate to={'/error'}/>
    }


    if (product.product_line && (!id_line  || id_line !== product.product_line) ) {
        navigate(`/lines/${product.product_line.id}/products/${id_product}`);
    }
    return (
            <main className="main-line-product">
                <a href='#'>
                <div
                    onClick={() => navigate(-1)}
                      className="close"/>
                </a>
                {/* todo fix cursor*/}
                <article>
                    <LineProductImgHolder imgs={product.images}/>
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