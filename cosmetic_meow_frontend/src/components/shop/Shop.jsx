import React, {useEffect} from 'react';
import { useSelector} from 'react-redux';
import ProductCard from "../product/ProductCard";
import useFetchData from "../../requests/useFetchData";



function Shop() {
    let cart = useFetchData(`order/`);
    console.log(cart, 'cart');
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

    if (!products || products.length === 0 ||
        !productsInCart || productsInCart.length === 0 ||
        !cart || cart.length === 0
    ) {
        return (
            <div>
                Загрузка
            </div>
        );
    }
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
export default Shop;