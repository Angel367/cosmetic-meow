import React, {useEffect, useState} from 'react';
import { useSelector} from 'react-redux';

import ProductCard from "./baseComponents/ProductCard";




function Cart() {
    const products = useSelector(state => state.cart.products);
    // console.log(products.length, 'products');
    // console.log(JSON.parse(localStorage.getItem('products')).length, 'localStorage');
    const [total, setTotal] = useState(0);
     useEffect(() => {
            setTotal(products.reduce((total, product) => total
                + product.price * product.quantity, 0));
        }, [products]);
    if (!products || products.length === 0) {
        return (
            <div>
                <h1>Cart</h1>
                <h2>Cart is empty</h2>
            </div>
        );
    }

    return (
        <div>
            <h1>Cart</h1>
            <div>
                <h2>Products</h2>
                {products.map((product, index=product.id) => (
                   <ProductCard key={index} product={product} />
                ))}
            </div>
            <div>
                <h2>Total</h2>
                <h3>{total}</h3>
            </div>
        </div>
    );
}
export default Cart;