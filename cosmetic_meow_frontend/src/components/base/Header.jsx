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
            <nav onClick={() => document.getElementById('menu_toggle').checked = false}>
                <Link to={'/'} className="logo">
                    <img alt="[logo]" src={logo}/>
                </Link>

                {window.location.pathname === '/' ? <Link to={'/'} className={'active'}>Главная</Link> :
                    <Link to={'/'}>Главная</Link>
                }

                {(window.location.pathname === '/lines/11' || window.location.pathname === '/lines/12' || window.location.pathname === '/shop')
                    ? <Link to={'/shop'} className={'active'}>Каталог</Link> :
                    <Link to={'/shop'}>Каталог</Link>
                }
                {/*{window.location.pathname === '/development' ?*/}
                {/*    <Link to={'/development'} className={'active'}>Разработка</Link> :*/}
                {/*    <Link to={'/development'}>Разработка</Link>*/}
                {/*}*/}
                {/*{window.location.pathname === '/education' ?*/}
                {/*    <Link to={'/education'} className={'active'}>Обучение</Link> :*/}
                {/*    <Link to={'/education'}>Обучение</Link>*/}
                {/*}*/}
                {window.location.pathname === '/contacts' ?
                    <Link to={'/contacts'} className={'active'}>Контакты</Link> :
                    <Link to={'/contacts'}>Контакты</Link>
                }
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