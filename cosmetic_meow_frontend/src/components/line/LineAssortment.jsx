import React from "react";
import LineProductCard from "../product/LineProductCard";



function LineAssortment ({products} )  {
    products = products.results
    if (!products || products.length === 0)
        return
        return (
            <section className="production" id="production-line">
                <h2 className={'not-main-h2'}>
                    Ассортимент
                </h2>
                <p className={'not-main-p'}>
                    Подберите продукт по вашим потребностям
                </p>
                <div className="production-holder">
                    {products.map(product => (
                        <LineProductCard product={product} key={product.id}/>
                    ))}
                </div>
            </section>
        );

}
export default LineAssortment;