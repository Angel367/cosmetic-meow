import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axiosService from "../../requests/axiosService";
import {NotificationManager} from "react-notifications";

function OrderingCard({total, cart}) {
    const productsInCart = useSelector(state => state.cart.products);
    const [name, setName] = useState(cart.receiver_full_name === null
        || cart.receiver_full_name === ""
        || cart.receiver_full_name === undefined
        ? "" : cart.receiver_full_name);
    const [phone, setPhone] = useState(cart.receiver_phone_number === null
    || cart.receiver_phone_number === ""
    || cart.receiver_phone_number === undefined
        ? "" : cart.receiver_phone_number);
    const [userData, setUserData] = useState({});
    useEffect(() => {
        const fetchUser = async () => {
            const response = await axiosService.get('/auth/update/');
            if (response) {
                setUserData(response.data);
                console.log(response.data);
            }
        }
        fetchUser();
    }, []);
    useEffect(() => {
        if (cart.receiver_full_name === null || cart.receiver_full_name === ""
            || cart.receiver_full_name === undefined
            && (userData.first_name !== null && userData.last_name !== null
                && userData.first_name !== "" && userData.last_name !== "")) {
            setName((userData.first_name || "") + " " + (userData.last_name || ""));
            console.log(name);
        }
    }, [userData, cart]);
    useEffect(() => {
        if (cart.receiver_phone_number === null || cart.receiver_phone_number === ""
            || cart.receiver_phone_number === undefined
            && userData.phone_number !== null) {
            setPhone(userData.phone_number || "");
            console.log(userData.phone_number, phone);
        }
    }, [userData, cart]);
    if (productsInCart.length === 0) {
        return null;
    }
    async function handleOrder(event) {
        event.preventDefault();
        const order = await axiosService.patch(`order/${cart.id}/`, {
            receiver_full_name: name,
            receiver_phone_number: phone,
            status:"in_progress",
            session_key: cart.session_key,
            user: cart.user,
            pick_up_point: cart.pick_up_point
        });
        if (order !== undefined && order.status === 200) {
            NotificationManager.success('Заказ успешно оформлен');
        }
    }


    return (
        <form onSubmit={handleOrder} method="post">
            <p className={"d-flex justify-content-between"}>
                <span>Итого:</span>
                <span>{total}</span>
            </p>
            <p className={"d-flex justify-content-between"}>
                <label htmlFor={"name"}>ФИО получателя</label>
                <input type="text" id={"name"} name={"name"} required value={name}
                          onChange={(event) => setName(event.target.value)}/>
            </p>
            <p className={"d-flex justify-content-between"}>
                <label htmlFor={"phone"}>Телефон</label>
                <input type="text" id={"phone"} name={"phone"} required value={phone}
                       onChange={(event) => setPhone(event.target.value)}
                         />

            </p>
            <button className={"btn btn-primary"}
                    type="submit"
            >Оформить заказ</button>
            <Link to={"/shop"} className={"btn btn-link"}>Продолжить покупки</Link>
        </form>
    );
}

export default OrderingCard;