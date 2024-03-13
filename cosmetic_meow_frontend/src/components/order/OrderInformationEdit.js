import React, {useState} from "react";

import {fetcherUser, updateUser} from "../../helpres/axios";
import {getUser} from "../../hooks/user.actions";
import OrderInformation from "./OrderInformation";

function OrderInformationEdit() {
    let user = getUser();
    const [form, setForm] = useState({});

    // todo fetch cart by user
    //  todo fetch address
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
            <form className="order-information__content">
                <div className="order-information__content__item">
                    <label className="order-information__content__item__title">Имя</label>
                    <input className="order-information__content__item__value" value={user.first_name}
                           type={"text"} onChange={(e) => setForm({...form, first_name: e.target.value})}/>

                </div>
                <div className="order-information__content__item">
                    <label className="order-information__content__item__title">Фамилия</label>
                    <input className="order-information__content__item__value" value={user.last_name}
                           type={"text"} onChange={(e) => setForm({...form, last_name: e.target.value})}/>
                </div>
                <div className="order-information__content__item">
                    <label className="order-information__content__item__title">Отчество</label>
                    <input className="order-information__content__item__value" value={user.middle_name}
                           type={"text"} onChange={(e) => setForm({...form, middle_name: e.target.value})}/>
                </div>
                <div className="order-information__content__item">
                    <label className="order-information__content__item__title">Телефон</label>
                    <input className="order-information__content__item__value" value={user.phone_number}
                           type={"tel"} onChange={(e) => setForm({...form, phone_number: e.target.value})}/>
                </div>
                <div className="order-information__content__item">
                    <label className="order-information__content__item__title">Адрес пункта выдачи</label>
                    <select className="order-information__content__item__value" value={order.DOSTAVKA.address} onChange={(e) => setForm({...form, address: e.target.value})}>
                        <option value="address1">address1</option>
                        <option value="address2">address2</option>
                        <option value="address3">address3</option>
                    </select>
                </div>
                <button className="order-information__content__item__button" type="submit">Оплатить</button>

            </form>
        </div>
    );
}
export default OrderInformation;
