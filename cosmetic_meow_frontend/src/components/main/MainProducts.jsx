import React from "react";
import ProductCard from "../product/ProductCard";

import {Link} from "react-router-dom";
import Loading from "../error/Loading";

function MainProducts({products}) {
    if (!products) {
        products = []
        // return <Loading/>
    }
    return (
        <article id="products">
            <h3 className={"not-main-h3"}>Каталог</h3>
            <h2 className={"not-main-h1"}>Самые популярные товары</h2>
            {/*<p className={"not-main-p"}*/}
            {/*>Подборка лучших товаров</p>*/}

            <div className="product-holder">
                {products.map((product, index=product.id) => (

                   <ProductCard key={index} product={product} noButton={true} />

                ))}
            </div>
            {/*<Link to={'/shop'} className={"blue button"}>В магазин</Link>*/}
        </article>
    );
}

export default MainProducts;