import React from 'react';
import {Link} from "react-router-dom";
const logo = process.env.PUBLIC_URL + '/img/logo.svg'; // путь к логотипу

const HeaderLanding = () => {
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
                    <Link to={'/'} className='link-index'>Главная</Link>
                    {/*<Link to={'/lines/11'}>BIOACTIV</Link>*/}
                    {/*<Link to={'/lines/12'}>Dr.Sechenov</Link>*/}
                    <Link to={'/lines'}>Каталог</Link>
                    <Link to={'/development'}>Разработка</Link>
                    <Link to={'/contacts'}>Контакты</Link>
                </nav>
        </div>
    </header>
    );
};

export default HeaderLanding;