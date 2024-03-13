import React from "react";
import {fetcherUser} from "../../requests/axiosService";
import {logout} from "../../hooks/user.actions";
import {Link} from "react-router-dom";
const Message = process.env.PUBLIC_URL + "/img/footer/Message.svg";
const Phone = process.env.PUBLIC_URL + "/img/footer/Phone.svg";
// const Calendar = process.env.PUBLIC_URL + "/img/footer/Calendar.svg";

function Personal() {
    const Logout = () => {
        logout();
        window.location.reload();
    }
    let user = fetcherUser();

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
        <div className={"content-holder"}>
        <div className={"profile-main"}>

            <h3>Личная информация</h3>
            <input type="text" value={user.first_name} />
            <input type="text" value={user.middle_name} />
            <input type="text" value={user.last_name} />
            <input type="text" value={user.phone_number} />
            <input type="text" value={user.email} />
            <input type="text" value={user.birth_date} />
            <Link to={"/edit"}>Редактировать профиль</Link>

        </div>
            <div className={"profile-manage-account"}>
                <h3>Управление аккаунтом</h3>
                <a href={"#"} onClick={Logout}>Выйти</a>
            </div>
            </div>

    );

}
export default Personal;