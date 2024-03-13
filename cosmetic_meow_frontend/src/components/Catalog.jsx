import React, {useEffect} from 'react';
import { useSelector} from 'react-redux';
import ProductCard from "./baseComponents/ProductCard";
import useFetchData from "../helpres/useFetchData";



function Catalog() {
    let productsInCart = useSelector(state => state.cart.products);
    const products = useFetchData(`product/`).results;
    useEffect(() => {
        if (!productsInCart || productsInCart.length === 0 || !products || products.length === 0) {
            return;
        }
        products.forEach(product => {
            if (productsInCart.find(p => p.id === product.id)) {
                product.quantity = productsInCart.find(p => p.id === product.id).quantity;
            }
        });
    }, [ productsInCart, products]);


    if (!products || products.length === 0) {
        return (
            <div>
                Загрузка
            </div>
        );
    }

    console.log(products.length, 'products');
    console.log(JSON.parse(localStorage.getItem('products')), 'localStorage');

    return (
        <div>
           <h1>Catalog</h1>
            <div>
                <h2>ProductsAll</h2>
                {products.map((product, index=product.id) => (

                   <ProductCard key={index} product={product} />

                ))}
            </div>
            <div>

            </div>
        </div>
    );
}
export default Catalog;