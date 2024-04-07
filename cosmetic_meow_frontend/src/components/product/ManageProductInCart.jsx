import React, {useState} from "react";
import {addProduct, addQuantity,  removeProduct, subQuantity} from "../../redux/reduxCart";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import postData from "../../requests/postData";
import {NotificationManager} from "react-notifications";
import axios from "axios";
import deleteData from "../../requests/deleteData";
import putData from "../../requests/putData";

const arrow = process.env.PUBLIC_URL + '/img/line-page/black-arrow.svg';
function ManageProductInCart({product,  noButton=false, isOrder=false, orderItem=null}) {
    let dispatch = useDispatch();

    const handleAddProduct = async () => {
        const addProductPostData = {
            product: product.id,
            quantity: 1
        }
        try {
            const addProductData = await postData('order_item/', addProductPostData);
            if (addProductData.status === 201) {
                NotificationManager.success("Товар добавлен в корзину", "Успешно", 5000);
                dispatch(addProduct({id: product.id, id_in_cart: addProductData.data.id, quantity: 1, price: product.price?.price_value || 100}));

            } else {
                NotificationManager.error("Ошибка добавления товара в корзину", "Ошибка", 5000);
            }
        } catch (e) {
            console.log(e);
            NotificationManager.error("Ошибка добавления товара в корзину", "Ошибка", 5000);
        }
    }
    const handleRemoveProduct = async () => {
        try {
            const removeProductData = await deleteData(`order_item/${orderItem.id_in_cart}/`);
            if (removeProductData.status === 204) {
                NotificationManager.success("Товар удален из корзины", "Успешно", 5000);
                dispatch(removeProduct(product.id));
            } else {
                NotificationManager.error("Ошибка удаления товара из корзины", "Ошибка", 5000);
            }
        } catch (e) {
            console.log(e);
            NotificationManager.error("Ошибка удаления товара из корзины", "Ошибка", 5000);
        }
    }
    const handleAddQuantity = async () => {


        const addProductPostData = {
            product: product.id,
            quantity: orderItem.quantity + 1
        }
        try {
            const addProductData = await putData(`order_item/${orderItem.id_in_cart}/`, addProductPostData);
            if (addProductData.status === 200) {
                dispatch(addQuantity(product.id));
                NotificationManager.success("Количество товара увеличено до " + (orderItem.quantity + 1), "Успешно", 5000);
            }
            else {
                NotificationManager.error("Ошибка при увеличении количества товара", "Ошибка", 5000);
            }

        } catch (e) {
            console.log(e);
            NotificationManager.error("", "Ошибка", 5000);
        }
    }
    const handleSubQuantity = async () => {

        const addProductPostData = {
            product: product.id,
            quantity: orderItem.quantity - 1
        }
        try {
            const addProductData = await putData(`order_item/${orderItem.id_in_cart}/`, addProductPostData);
            if (addProductData.status === 200) {
                dispatch(subQuantity(product.id));
                NotificationManager.success("Количество товара уменьшено до " + (orderItem.quantity - 1), "Успешно", 5000);
            }
            else {
                NotificationManager.error("Ошибка при уменьшении количества товара", "Ошибка", 5000);
            }
        } catch (e) {
            console.log(e);
            NotificationManager.error("", "Ошибка", 5000);
        }
    }

    return (

        <div className="small-product-link">
            {noButton ? (
                <>
                    {/*{isOrder ? (*/}
                    {/*    <div>{orderItem.quantity}</div>*/}
                    {/*) : null}*/}
                    {product.is_ready_for_sale  ? (
                <Link target="_blank"
                    to={`/lines/${product.product_line.id}/products/${product.id}`}>
                <img src={arrow} alt={"Перейти"}/>
                    </Link>) : null}
                </>) :
                (
                    <>{orderItem === null ?
                (<button className={"blue button"}
                    onClick={() => {

                    handleAddProduct().then(r => console.log(r));
                }
                }>A</button>) :
                ( <div className={'manage-button'}><div className={'blue button'}>
                    <button onClick={() => {
                        if (orderItem.quantity > 0)
                        handleAddQuantity().then(r => console.log(r));
                        else {
                            handleAddProduct().then(r => console.log(r));
                        }
                    }}
                    >+</button>

                <div>{orderItem.quantity}</div>
                <button onClick={() => {
                    if (orderItem.quantity > 1)
                    handleSubQuantity().then(r => console.log(r));
                    else {
                        handleRemoveProduct().then(r => console.log(r));
                    }

                }
                }>-</button>
                </div>
                <button  className={'blue button'}
                    onClick={() =>
                {

                    handleRemoveProduct().then(r => console.log(r));}

                }>R</button>
                </div>)
            }</>)
            }
        </div>
    );
}

export default ManageProductInCart;