import React from "react";
import { Link } from "react-router-dom";
import ManageProductInCart from "./ManageProductInCart";

function ProductCard({ product, noButton = false, isOrder = false, orderItem = null }) {
    if (!product || !product.product_line) return null;

    const price = product.price?.price_value ?? product.price;
    const img_src = product.images?.length > 0 ? product.images[0].image : `${process.env.PUBLIC_URL}/img/line-page/no_photo.jpg`;

    return (
        <div className="small-product-box d-flex flex-column">
            <Link to={`/lines/${product.product_line.id}/products/${product.id}`}>
                <div className="small-product-img-box">
                    <img alt="product" src={img_src} className="small-product-img" />
                </div>
                <div className="small-product-text-box">
                    <div className="small-product-name">{product.name}</div>
                    <div className="small-product-description">{product.short_description}</div>
                </div>
            </Link>
            <div className="small-product-main-box">
                {!noButton && <div className="small-product-price">{price}</div>}
                <ManageProductInCart product={product} noButton={noButton} isOrder={isOrder} orderItem={orderItem} />
            </div>
        </div>
    );
}

export default ProductCard;
