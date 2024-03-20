import React from "react";
import {Link} from "react-router-dom";

import ManageProductInCart from "./ManageProductInCart";
import {useSelector} from "react-redux";

function ProductCard({product, noButton=false, isOrder=false}) {
    let quantity = useSelector(state => state.cart.products?.find(p =>
        p.id === product.id)?.quantity || 0);
    let price;
    if (!product)
            return;
    if (product.price?.price_value){
            price = product.price.price_value;

    }
    else {
        price = product.price;
    }
    let img_src = process.env.PUBLIC_URL + '/img/line-page/no_photo.jpg';
    if (product.images.length > 0){
        img_src = product.images[0].image;
    }

    return (
        <div className="small-product-box">
            <Link to={`/lines/${product.product_line.id}/products/${product.id}`}>
                <div className="small-product-img-box">
                    <img alt="product" src={img_src} className="small-product-img"/>
                </div>
            <div className="small-product-text-box">
                <div className="small-product-name">{product.name}</div>
                <div className="small-product-description">{product.short_description}</div>
            </div>
            </Link>
            <div className="small-product-main-box">
                {noButton ? <div className="small-product-price">  </div>:
                    <div className="small-product-price">{price}</div>}
                 <ManageProductInCart product={product} quantity={quantity} noButton={noButton} isOrder={isOrder}/>
                {/*<ManageProductInCart product={product} quantity={quantity} noButton={noButton} isOrder={isOrder}/>*/}
            </div>
        </div>
    );
}
export default ProductCard;