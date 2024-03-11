import React from "react";
import {fetcherUser, updateUser} from "../../helpres/axios";
import { logout} from "../../hooks/user.actions";
import {Link} from "react-router-dom";
const Message = process.env.PUBLIC_URL + "/img/footer/Message.svg";
const Phone = process.env.PUBLIC_URL + "/img/footer/Phone.svg";
// const Calendar = process.env.PUBLIC_URL + "/img/footer/Calendar.svg";

function PersonalEdit() {
    let user = fetcherUser('update', '')
    if (!user)
        user = {
        first_name: "Имя",
        middle_name: "Отчество",
        last_name: "Фамилия",
        phone_number: "Телефон",
        email: "Почта",
        birth_date: "Дата рождения",

    }

    return (
        <div></div>





    );

}
export default PersonalEdit;