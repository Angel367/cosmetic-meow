import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import ProductCard from "../product/ProductCard";
import fetchData from "../../requests/fetchData";
import {initiateProducts} from "../../redux/reduxCart";
import {Link} from "react-router-dom";
import Loading from "../error/Loading";


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
            console.log("cart", cart);
            if (cart.length === 0 || cart[0].order_items.length === 0) {
                return;
            }
            let new_order_items = [];
            for (let order_item of cart[0].order_items) {
                let product = products.find(p => p.id === order_item.product);
                let new_order_item = {
                    id: product.id,
                    quantity: order_item.quantity,
                    id_in_cart: order_item.id,
                    price: product.price?.price_value || 100,
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
            <main>
                <h1>Cart</h1>
                <h2>Cart is empty</h2>
                <Link to={"/shop"}>Go to shop</Link>
            </main>
        );
    }
    if (products === undefined || cart === undefined || productsInCart === undefined) {
        return (
            <Loading/>
        );
    }



    return (
        <main className={'cart-module'}>
            <h1 className={'not-main-p'}>Cart</h1>
            <div className={'cart-module__content'}>
                <div className={'cart-module__products'}>
                {productsInCart.map((product_in, index=product_in.id) => (
                   <ProductCard key={index} product={products.find(p => p.id === product_in.id)}
                                orderItem={product_in} />
                ))}
                    </div>

            <div className={'cart-module__information'}>
                <Link to={"/shop"}>Go to shop</Link>
                <h2>Total</h2>
                <h3>{total}</h3>
            </div>
            </div>
        </main>
    );
}
export default Cart;