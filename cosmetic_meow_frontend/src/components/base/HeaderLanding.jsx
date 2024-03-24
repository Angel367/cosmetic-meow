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

                    {window.location.pathname === '/' ? <Link to={'/'} className={'active'}>Главная</Link> :
                        <Link to={'/'}>Главная</Link>
                    }

                    {(window.location.pathname === '/lines/11' || window.location.pathname === '/lines/12')
                        ? <Link to={'/lines'} className={'active'}>Каталог</Link> :
                        <Link to={'/lines'}>Каталог</Link>
                    }
                    {window.location.pathname === '/development' ? <Link to={'/development'} className={'active'}>Разработка</Link> :
                        <Link to={'/development'}>Разработка</Link>
                    }
                    {window.location.pathname === '/contacts' ? <Link to={'/contacts'} className={'active'}>Контакты</Link> :
                        <Link to={'/contacts'}>Контакты</Link>
                    }

                </nav>
        </div>
    </header>
    );
};

export default HeaderLanding;