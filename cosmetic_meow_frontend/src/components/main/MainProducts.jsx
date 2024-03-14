import React from "react";
import ProductCard from "../product/ProductCard";
import fetchData from "../../requests/fetchData";
import {Link} from "react-router-dom";

function MainProducts({products}) {
    if (!products) {
        return <div>Загрузка...</div>;
    }
    return (
        <article id="products">
            <h3>Лучшие товары</h3>
            <h2>Продукция</h2>
            <p>Подборка лучших товаров</p>

            <div className="product-holder">
                {products.map((product, index=product.id) => (

                   <ProductCard key={index} product={product} noButton={true} />

                ))}
            </div>
            <Link to={'/shop'} className={"blue button"}>В магазин</Link>
        </article>
    );
}

export default MainProducts;