import React from 'react';
import {Link} from "react-router-dom";
import '../../styles/BaseStyles/HeaderStyles.css'; // импорт стилей
const logo = process.env.PUBLIC_URL + '/img/logo.svg'; // путь к логотипу
const cart = process.env.PUBLIC_URL + '/img/header/fi-rr-shopping-cart.svg';
const ik = process.env.PUBLIC_URL + '/img/header/fi-rr-user.svg';
const Header = () => {
    return (
    <header id="main_header">
        <Link to={'/'} className="logo">
            <img alt="[logo]" src={logo}/>
        </Link>
        <div className="nav_box">
            <input type="checkbox" id="menu_toggle"/>
                <label htmlFor="menu_toggle">
                    <span></span>
                </label>
                <nav>
                    <Link to={'/'} className="logo">
                        <img alt="[logo]" src={logo}/>
                    </Link>
                    <Link to={'/'} className='link-index'>Главная</Link>
                    <Link to={'/lines/3/'}>[НАЗВАНИЕ ЛИНИИ]</Link>
                    <Link to={'/shop'}>Магазин</Link>
                    <Link to={'/development'}>Разработка</Link>
                </nav>
        </div>

        <div className="button-holder">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <Link to={'/cart'} className="basket">

                <img alt="[cart]" src={cart}/>
            </Link>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <Link to={'/profile'} className="profile">
                <img alt="[ik]" src={ik}/>
            </Link>
        </div>
    </header>
    );
};

export default Header;