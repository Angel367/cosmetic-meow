import React from "react";
import LineProductCard from "../baseComponents/LineProductCard";
import {useParams} from "react-router-dom";


function LineAssortment ({products} )  {

    if (!products || products.length === 0)
        return <div>Загрузка...</div>;
        return (
            <section className="production" id="production">
                <h2>Продукция</h2>
                <p>Lorem ipsum dolor sit amet consectetur.
                    Leo nulla imperdiet quam tellus fringilla viverra eleifend tempor quis</p>
                <div className="production-holder">
                    {products.map(product => (
                        <LineProductCard product={product} key={product.id}/>
                    ))}
                </div>
            </section>
        );

}
export default LineAssortment;