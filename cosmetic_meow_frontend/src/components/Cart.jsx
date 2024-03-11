import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addProduct, addQuantity, calculateTotal, removeProduct, subQuantity} from "../helpres/reduserCart";



function Cart() {

    const products = useSelector(state => state.cart.products);

    const total = useSelector(state => state.cart.total);
    const dispatch = useDispatch();
    if (!products || products.length === 0) {
        return (
            <div>
                <h1>Cart</h1>
                <h2>Cart is empty</h2>
            </div>
        );
    }
    localStorage.setItem('products', JSON.stringify(products));

    dispatch(calculateTotal());
    console.log(localStorage.getItem('products'), "localStorage.getItem('products')");
    console.log(products, "products");
    return (
        <div>
            <h1>Cart</h1>
            <div>
                <h2>Products</h2>
                {products.map((product, index=product.id) => (
                    <div key={index}>
                        <h3>{product.name}</h3>
                        <h4>{product.price}</h4>
                        <h4>Quantity: {product.quantity}</h4>
                        <button onClick={() => dispatch(addQuantity(product.id))}>
                            Add
                        </button>
                        <button onClick={() => dispatch(subQuantity(product.id))}>
                            Subtract
                        </button>
                        <button onClick={() => dispatch(removeProduct(product.id))}>
                            Remove
                        </button>
                    </div>
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