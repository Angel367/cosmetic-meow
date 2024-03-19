import React from "react";
import {Link} from "react-router-dom";

const cream_1 = process.env.PUBLIC_URL + '/img/line-page/cream_1_1.jpg';


function LineProductCard({product}) {

    if (!product)
        return <div>Загрузка...</div>;

        return (
            <Link className="small-product-box line-page"
                    to={`products/${product.id}`}>
                <div className="small-product-img-box">
                    <img alt="product" src={cream_1}/>

                </div>

                <div className="small-product-info-box">
                    <div className="small-product-name">{product.name}</div>
                    <div className="small-product-description">{product.description}</div>
                </div>

            </Link>
        );
    }

export default LineProductCard;