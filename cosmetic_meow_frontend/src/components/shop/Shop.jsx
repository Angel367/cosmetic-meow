import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ProductCard from "../product/ProductCard";
import fetchData from "../../requests/fetchData";
import {initiateProducts} from "../../redux/reduxCart";
import FilterPanel from "./FilterPanel";


function Shop() {
    let dispatch = useDispatch();
    const [cart, setCart] = useState(null);
    const [products, setProducts] = useState(null);
    const productsInCart = useSelector(state => state.cart.products);

    useEffect(() => {
        async function fetchDataProducts() {
            let products = await fetchData(`product/`, {is_active:true, is_ready_for_sale: true});
            setProducts(products.results);
        }
        fetchDataProducts();
    }, []);
    useEffect(() => {
        async function fetchDataCart() {
            let cart = await fetchData(`order_item/`, {status: "cart"});
            setCart(cart);

        }
        fetchDataCart().then(r => console.log("cart", cart) );
    }, []);

        useEffect(() => {
        if (cart && products) {
            console.log("cart", cart);
            if (cart.length === 0 ) {
                return;
            }
            let new_order_items = [];
            for (let order_item of cart) {
                let product = products.find(p => p.id === order_item.product);
                console.log("product", product);
                let new_order_item = {
                    id: product.id,
                    id_in_cart: order_item.id,
                    quantity: order_item.quantity,
                    price: product.price?.price_value || 100,
                };
                console.log("new_order_item", new_order_item);
                new_order_items.push(new_order_item);
            }
            dispatch(initiateProducts(new_order_items));
            }
    }, [cart, products]);

    console.log("cart", cart);
    console.log("products", products);
    console.log("productsInCart", productsInCart);



     if (!products || !cart )
        return (
            <div>
                Загрузка
            </div>
        );

    return (
        <main className={'shop-module'}>
            <h1 className={'not-main-p'}>href</h1>
            <div className={'shop-module__content'}>
                <FilterPanel/>
                <div className={'shop-module__products'}>
                {products.map((product, index=product.id) => (
                   <ProductCard key={index} product={product}
                   orderItem={productsInCart.find(p => p.id === product.id)}
                   />) )}
                </div>
            </div>
            <div>

            </div>
        </main>
    );
}
export default Shop;