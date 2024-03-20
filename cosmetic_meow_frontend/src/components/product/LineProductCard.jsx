import React from "react";
import {Link} from "react-router-dom";

const no_image = process.env.PUBLIC_URL + '/img/line-page/no_photo.jpg';


function LineProductCard({product}) {
    if (!product)
        return <div>Загрузка...</div>;
    let product_component =
        <>
            <div className="small-product-img-box">
                <img alt="product" src={product.images[0]?.image || no_image}/>

            </div>

            <div className="small-product-info-box">
                <div className="small-product-name">{product.name}</div>
                <div className="small-product-description">{product.description}</div>
            </div>
        </>
    if (product.is_ready_for_sale === true)
        return (
            <Link className="small-product-box line-page" to={`products/${product.id}`}>
                {product_component}
            </Link>
        );
    else
        return (
            <div className="small-product-box line-page">
                {product_component}
            </div>
        );
}

export default LineProductCard;