import React from "react";
import { NavLink } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function ProfileNav() {
    return (
        <nav className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
            <div className="sidebar-sticky">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <NavLink className="nav-link"  exact={"true"} to="/profile">Профиль</NavLink>
                    </li>
                    {/*<li className="nav-item">*/}
                    {/*    <NavLink className="nav-link" activeClassName="active" to="/profile/personal">Персональные данные</NavLink>*/}
                    {/*</li>*/}
                    {/*<li className="nav-item">*/}
                    {/*    <NavLink className="nav-link" activeClassName="active" to="/profile/addresses">Адреса</NavLink>*/}
                    {/*</li>*/}
                    {/*<li className="nav-item">*/}
                    {/*    <NavLink className="nav-link" activeClassName="active" to="/profile/payment-methods">Методы оплаты</NavLink>*/}
                    {/*</li>*/}
                    {/*<li className="nav-item">*/}
                    {/*    <NavLink className="nav-link" activeClassName="active" to="/profile/account-management">Управление аккаунтом</NavLink>*/}
                    {/*</li>*/}
                    <li className="nav-item">
                        <NavLink className="nav-link"  to="/profile/orders">Заказы</NavLink>
                    </li>

                    {/*<li className="nav-item">*/}
                    {/*    <NavLink className="nav-link" activeClassName="active" to="/profile/orders/history">История заказов</NavLink>*/}
                    {/*</li>*/}
                    {/*<li className="nav-item">*/}
                    {/*    <NavLink className="nav-link" activeClassName="active" to="/profile/return/new">Сделать возврат</NavLink>*/}
                    {/*</li>*/}
                    {/*<li className="nav-item">*/}
                    {/*    <NavLink className="nav-link" activeClassName="active" to="/profile/return">Возвраты</NavLink>*/}
                    {/*</li>*/}
                    {/*<li className="nav-item">*/}
                    {/*    <NavLink className="nav-link" activeClassName="active" to="/profile/favorites">Избранное</NavLink>*/}
                    {/*</li>*/}
                    {/*<li className="nav-item">*/}
                    {/*    <NavLink className="nav-link" activeClassName="active" to="/profile/reviews">Отзывы</NavLink>*/}
                    {/*</li>*/}
                </ul>
            </div>
        </nav>
    );
}

export default ProfileNav;
