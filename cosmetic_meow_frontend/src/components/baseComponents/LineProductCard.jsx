import React from "react";
import {Link, useParams} from "react-router-dom";

const product_image = process.env.PUBLIC_URL + '/img/main/product.png';

function LineProductCard() {
    let {product} =useParams();
    if (!product)
        product = {
            id: 1,
            name_: "Product",
            short_description_: "Short description"
        }

        return (
            <Link className="small-product-box line-page"
                    to={`/product/${product.id}`}>
                <div className="small-product-img-box">
                    {/*{% if product.get_images.count > 0 %}*/}
                    {/*{% for image in product.get_images %}*/}
                    {/*{% if image.is_main %}*/}
                    {/*<img src="{{ image.image.url }}" alt="{{ product.name }} Image"/>*/}
                    {/*{% endif %}*/}
                    {/*{% endfor %}*/}
                    {/*{%  else %}*/}
                    <img alt="product" src={product_image}/>
                    {/*{% endif %}*/}
                </div>

                <div className="small-product-info-box">
                    <div className="small-product-name">{product.name}</div>
                    <div className="small-product-description">{product.short_description}</div>
                </div>

            </Link>
        );
    }

export default LineProductCard;