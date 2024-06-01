import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ProductCard from "../product/ProductCard";
import fetchData from "../../requests/fetchData";
import {initiateProducts} from "../../redux/reduxCart";
import {Link} from "react-router-dom";
import Loading from "../error/Loading";
import axiosService from "../../requests/axiosService";
import {isAuth} from "../../hooks/user.actions";
import OrderingCard from "./OrderingCard";

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
            if (isAuth())
               axiosService('order',{
                   params: {
                          status: "cart"
                   }
                })
.then((response) => {
                    setCart(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
            else
                fetchData('order', {status: "cart"})
.then((response) => {
                    setCart(response);
                })


        }
        fetchDataCart();
    }, []);

    useEffect(() => {
        if (cart && products && cart !== undefined && products !== undefined) {
            if (cart.length === 0) {
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
    }, [cart, products, dispatch]);

    const [total, setTotal] = useState(0);

    useEffect(() => {
        setTotal(productsInCart.reduce((total, product) => total
            + product.price * product.quantity, 0));
    }, [productsInCart, cart]);

    if (!cart || cart?.length === 0) {
        return (
            <div className="d-flex flex-column mt-5 mb-5 align-items-center justify-content-center gap-3 flex-wrap">

                <h1>Корзина</h1>
                <h2>Корзина пуста</h2>
                <Link to={"/shop"} className="btn btn-primary">Перейти в магазин</Link>
            </div>
        );
    }

    if (products === undefined || cart === undefined || productsInCart === undefined || products === null || cart === null || productsInCart === null) {
        return (
            <Loading/>
        );
    }

    return (
        <main className="d-flex flex-column mt-5 mb-5">
            <h1 className="mb-4">Cart</h1>
            <div className="d-flex flex-row">
                <div className="col-md-8">
                    <div className="list-group">
                        {productsInCart.map((product_in) => (
                            <ProductCard key={product_in.id}
                                         product={products.find(p => p.id === product_in.id)}
                                         orderItem={product_in} />
                        ))}
                    </div>
                </div>
                <OrderingCard total={total} cart={cart[0]} setCart={setCart}/>
            </div>
        </main>
    );
}

export default Cart;