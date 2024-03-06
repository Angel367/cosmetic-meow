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
                    <Link to={'/line'}>Каталог</Link>
                    <Link to={'/development'}>О нас</Link>
                </nav>
        </div>

        <div className="button-holder">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a href="#" className="basket">
                <img alt="[cart]" src={cart}/>
            </a>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a href="#" className="ik">
                <img alt="[ik]" src={ik}/>
            </a>
        </div>
    </header>
    );
};

export default Header;