import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import ProductCard from "../product/ProductCard";
import fetchData from "../../requests/fetchData";
import {initiateProducts} from "../../redux/reduxCart";




function Cart() {
    let dispatch = useDispatch();
    const [cart, setCart] = useState(null);
    const [products, setProducts] = useState(null);
    const productsInCart = useSelector(state => state.cart.products);
    useEffect(() => {
        async function fetchDataProducts() {
            let products = await fetchData(`product/`);
            setProducts(products.results);
        }
        fetchDataProducts();
    }, []);
    useEffect(() => {
        async function fetchDataCart() {
            let cart = await fetchData(`order/`, {status: "cart"});
            setCart(cart);
        }
        fetchDataCart();
    }, []);
    useEffect(() => {
        if (cart && products) {
            if (cart[0].order_items.length === 0) {
                return;
            }
            let new_order_items = [];
            for (let order_item of cart[0].order_items) {
                let product = products.find(p => p.id === order_item.id);
                let new_order_item = {
                    price:product.discount_price.price_value,
                    name: product.name,
                    short_description: product.short_description,
                    id: order_item.id,
                    quantity: order_item.quantity
                };
                new_order_items.push(new_order_item);
            }
            dispatch(initiateProducts(new_order_items));
            }
        console.log("cart", cart);
        console.log("products", products);
    }, [cart, products]);
    console.log("productsInCart", productsInCart);



    const [total, setTotal] = useState(0);
     useEffect(() => {

          setTotal(productsInCart.reduce((total, product) => total
                + product.price * product.quantity, 0));
        }, [productsInCart, cart]);
    if (!cart || cart.length === 0 ) {
        return (
            <div>
                <h1>Cart</h1>
                <h2>Cart is empty</h2>
            </div>
        );
    }



    return (
        <main>
            <h1>Cart</h1>
            <div>
                <h2>Products</h2>
                {productsInCart.map((product, index=product.id) => (
                   <ProductCard key={index} product={product} />
                ))}
            </div>
            <div>
                <h2>Total</h2>
                <h3>{total}</h3>
            </div>
        </main>
    );
}
export default Cart;