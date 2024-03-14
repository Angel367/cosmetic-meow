import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ProductCard from "../product/ProductCard";
import fetchData from "../../requests/fetchData";



function Shop() {
    let dispatch = useDispatch();
    const [cart, setCart] = useState(null);
    const [products, setProducts] = useState(null);
    const productsInCart = useSelector(state => state.cart.products);


    useEffect(() => {
        async function fetchDataCart() {
            let cart = await fetchData(`order/`, {status: "cart"});
            setCart(cart);

        }
        fetchDataCart();
    }, []);

    useEffect(() => {
        if (cart) {
            // initiateProducts(cart[0]);
        }
    }, [cart]);

    console.log("cart", cart);
    console.log("products", products);
    console.log("productsInCart", productsInCart);
    useEffect(() => {
        async function fetchDataProducts() {
            let products = await fetchData(`product/`);
            setProducts(products.results);
        }
        fetchDataProducts();
    }, []);

    useEffect(() => {
        if (products && productsInCart && cart)
            products.forEach(product => {
            if (productsInCart.find(p => p.id === product.id)) {
                product.quantity = productsInCart.find(p => p.id === product.id).quantity;
            }
        });

    }, [ productsInCart, products, cart]);

     if (!products || !cart )
        return (
            <div>
                Загрузка
            </div>
        );

    return (
        <div>
           <h1>Catalog</h1>
            <div>
                <h2>ProductsAll</h2>

                {products.map((product, index=product.id) => (
                   <ProductCard key={index} product={product} />) )}
            </div>
            <div>

            </div>
        </div>
    );
}
export default Shop;