import React from "react";
import {Link} from "react-router-dom";

import ManageProductInCart from "./ManageProductInCart";
import {useSelector} from "react-redux";

const product_image = process.env.PUBLIC_URL + '/img/main/product.png';


function ProductCard({product, noButton=false, isOrder=false}) {
    let quantity = useSelector(state => state.cart.products?.find(p =>
        p.id === product.id)?.quantity || 0);
    let price;
    if (!product)
            return;
    if (product.price.price_value){
            price = product.price.price_value;

    }
    else {
        price = product.price;


    }

    return (
        <div className="small-product-box">
            <Link to={`/shop/product/${product.id}`}>
                <div className="small-product-img-box">
                    <img alt="product" src={product_image}/>
                </div>
            <div className="small-product-text-box">
                <div className="small-product-name">{product.name}</div>
                <div className="small-product-description">{product.short_description}</div>
            </div>
            </Link>
            <div className="small-product-main-box">
                <div className="small-product-price">{price}</div>
                <ManageProductInCart product={product} quantity={quantity} noButton={noButton} isOrder={isOrder}/>
            </div>
        </div>
    );
}
export default ProductCard;