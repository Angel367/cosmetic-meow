import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import OnLoadingLineProduct from "./onLoadingLineProduct";

import '../../styles/LineProductStyles.css';
import axios from 'axios'
import LineProductImgHolder from "./LineProductImgHolder";
import LineProductDescription from "./LineProductDescription";
const arrow = process.env.PUBLIC_URL + '/img/line-page/black-arrow.svg';


function LineProduct(props) {
    const [page, setPage] = useState(
        {
            loading: false,
            product: null,
        }
    )
    const LoadingDescription = OnLoadingLineProduct(LineProductDescription);
    const {id} = useParams()
    console.log(id + 'id')

    // GET request using fetch with error handling
    useEffect(() => {
        setPage({loading: true})
        axios.get(`http://localhost/api/products/${id}`)
            .then(response => {
                const product = response.data;
                setPage({
                    product: product,
                    loading: false,
                });}
                )
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, [id, setPage]);
    // console.log(product + 'product')
        return (
            <main>
                <Link to={"/"} className="close"/>
                {/* todo fix cursor*/}
                <article>
                    <LineProductImgHolder/>
                    {/* todo fix img*/}
                    <LoadingDescription isLoading={page.loading} product={page.product} />
                </article>

                <Link to={"/"} className="back">К линейке продуктов
                    <img src={arrow} alt="arrow"/>
                </Link>
            </main>
        );
}
export default LineProduct;