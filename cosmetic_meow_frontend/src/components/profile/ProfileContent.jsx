import React, {useEffect, useState} from "react";
import {fetcherUser} from "../../requests/axios";
import {Link} from "react-router-dom";
import {logout} from "../../hooks/user.actions";

const Message = process.env.PUBLIC_URL + "/img/footer/Message.svg";
// const Phone = process.env.PUBLIC_URL + "/img/footer/Phone.svg";
// const Calendar = process.env.PUBLIC_URL + "/img/footer/Calendar.svg";

function ProfileContent() {
    const Logout = () => {
        logout();
        window.location.reload();
    }
    const [userData, setUserDate] = useState({});
    useEffect(() => {
        fetcherUser()
            .then((data) => {
            setUserDate(data);
        })
    }, []);

    console.log(userData, 'user')
    if (!userData)

        setUserDate( {
        first_name: "Имя",
        middle_name: "Отчество",
        last_name: "Фамилия",
        phone_number: "Телефон",
        email: "Почта",
        birth_date: "Дата рождения",

    }, )

    return (
        <div className={"content-holder"}>
        <div className={"profile-main"}>
            <div className={"profile-main__header"}>
                <div >
                    <img alt="avatar"/>
                </div>
            <h2>{userData.first_name} {userData.middle_name} {userData.last_name}</h2>
            </div>
            <div className={"profile-main__contacts"}>
                <span><img src={Message} alt={""}/></span><span>{userData.phone_number}</span>
                <span><img src={Message} alt={""}/></span><span>{userData.email}</span>
                <span><img src={Message} alt={""}/></span><span>{userData.birth_date}</span>
            </div>
            <Link to={"/edit"}>Редактировать профиль</Link>
            <a href={"#"} onClick={Logout}>Выйти</a>
        </div>
        <div className={"profile-order-history"}>
            <h2>
                История заказов
            </h2>
            <div className={"profile-order-history__holder"}>
                <div className={"profile-order-history__item"}>
                    <img alt="img-order"/>
                </div>
                <div className={"profile-order-history__item"}>
                    <img alt="img-order"/>
                </div>
                <div className={"profile-order-history__item"}>
                    <img alt="img-order"/>
                </div>
        </div>
            <Link to={"/orders/"}>Посмотреть все заказы</Link>
            </div>
        </div>





    );

}
export default ProfileContent;