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
                <nav>
                    <Link to={'/'} className="logo">
                        <img alt="[logo]" src={logo}/>
                    </Link>
                    <Link to={'/'} className='link-index'>Главная</Link>
                    <Link to={'/lines/11'}>Bioactiv</Link>
                    <Link to={'/products/11'}>Dr.Sechenov</Link>
                    <Link to={'/development'}>Разработка</Link>
                </nav>
        </div>
    </header>
    );
};

export default HeaderLanding;