import React from "react";
import {Link} from "react-router-dom";

function ProfileNav() {
    return (
        <div>
            <h1>Панель управления</h1>
        <nav className={"profile-nav"}>
            <Link className={"profile-nav-link main-link"} to={"/profile"}>Профиль</Link>
            <Link className={"profile-nav-link"} to={"/profile/"}>Персональные данные</Link>
            {/*<Link className={"profile-nav-link"} to={"/profile/"}>Адреса</Link>*/}
            {/*<Link className={"profile-nav-link"} to={"/profile/"}>Методы оплаты</Link>*/}
            <Link className={"profile-nav-link"} to={"/profile/"}>Управление аккаунтом</Link>
            <Link className={"profile-nav-link main-link"} to={"/profile/orders"}>Заказы</Link>
            {/*<Link className={"profile-nav-link"} to={"/profile/orders/history"}>История заказов</Link>*/}
            {/*<Link className={"profile-nav-link"} to={"/profile/return/new"}>Сделать возврат</Link>*/}
            {/*<Link className={"profile-nav-link "} to={"/profile/return"}>Возвраты</Link>*/}
            {/*<Link className={"profile-nav-link main-link"} to={"/profile/favorites"}>Избранное</Link>*/}
            {/*<Link className={"profile-nav-link"} to={"/profile/reviews"}>Отзывы</Link>*/}
        </nav>
        </div>
    );
}
export default ProfileNav;