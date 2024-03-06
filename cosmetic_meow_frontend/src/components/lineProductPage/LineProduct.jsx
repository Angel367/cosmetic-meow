import {Link, useParams} from "react-router-dom";
import '../../styles/LineProductStyles.css';
import LineProductImgHolder from "./LineProductImgHolder";
import LineProductDescription from "./LineProductDescription";
import fetchData from "../fetchData";
import React from 'react';
const arrow = process.env.PUBLIC_URL + '/img/line-page/black-arrow.svg';


function LineProduct(props) {
    const {id} = useParams()
    const product = fetchData('http://localhost:3000/products/' + id);
        return (
            <main>
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