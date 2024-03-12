import React from "react";

import {fetcherUser, updateUser} from "../../helpres/axios";
import {getUser} from "../../hooks/user.actions";

function OrderInformation() {
    let user = getUser();
    // todo fetch cart by user
    if (!user)
        user = {
            first_name: "Имя",
            middle_name: "Отчество",
            last_name: "Фамилия",
            phone_number: "Телефон",
            email: "Почта",
            birth_date: "Дата рождения",
        } ;// todo доступ после регистрации
    return (
        <div className="order-information">
            <div className="order-information__title">Информация о заказе</div>
            <div className="order-information__content">
                <div className="order-information__content__item">
                    <div className="order-information__content__item__title">Имя</div>
                    <div className="order-information__content__item__value">{user.first_name}</div>
                </div>
                <div className="order-information__content__item">
                    <div className="order-information__content__item__title">Фамилия</div>
                    <div className="order-information__content__item__value">{user.last_name}</div>
                </div>
                <div className="order-information__content__item">
                    <div className="order-information__content__item__title">Отчество</div>
                    <div className="order-information__content__item__value">{user.middle_name}</div>
                </div>
                <div className="order-information__content__item">
                    <div className="order-information__content__item__title">Телефон</div>
                    <div className="order-information__content__item__value">{user.phone_number}</div>
                </div>
                <div className="order-information__content__item">
                    <div className="order-information__content__item__title">Адрес пункта выдачи</div>
                    <div className="order-information__content__item__value">order.DOSTAVKA.address</div>
                </div>
            </div>
            <button className="order-information__content__item__button" type="submit">Оформить заказ</button>
        </div>
    );
}

export default OrderInformation;
