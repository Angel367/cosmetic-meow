import React from 'react';
import '../../styles/BaseStyles/FooterStyles.css';
import {Link} from "react-router-dom";
import getBaseUrl from "../../requests/baseUrl"; // импорт стилей
const logo = process.env.PUBLIC_URL + '/img/logo.svg';
const Message = process.env.PUBLIC_URL + "/img/footer/Message.svg";
const Location = process.env.PUBLIC_URL + "/img/footer/Location.svg";
const MadeIn = process.env.PUBLIC_URL + "/img/footer/flag.png";

const FooterLanding = () => {
    return (
        <footer>
            <div className="link-with-addr">
                <div className="contacts">
                    <Link to={'/'} className="logo">
                        <img alt="[logo]" src
                            ={logo}/>
                    </Link>
                </div>
                <address className="contacts_">
                    <Link className="main-link" to={'/contacts'}>Контакты</Link>
                    {/*<Link to={'/'} className="logo">*/}
                    {/*    <img alt="[logo]" src={logo}/>*/}
                    {/*</Link>*/}
                    <div className="email">
                        <img alt="" src={Message}/>

                        <div className="div-6">
                            <a href={'mailto:' + getBaseUrl(true)}>{getBaseUrl(true)}</a>
                        </div>
                    </div>
                    <div className="address">
                        <img alt="" src={Location}/>
                        <div className="div-8">
                            ООО "ЛИК Сидерис"<br/>
                            {/*000000, г. Москва, ул. УЛИЦА, д. 1, стр. 1, офис 1*/}
                        </div>
                    </div>
                    <div className="made-in">
                        <img alt="" src={MadeIn}/>
                        <div className="div-9">Сделано в России</div>
                    </div>
                </address>
                <div className="products-link">
                    {window.location.pathname === '/' ? <Link className="main-link active" to={'/'}>Главная</Link> :
                    <Link className="main-link" to={'/'}>Главная</Link>}
                    {(window.location.pathname === '/lines/11' || window.location.pathname === '/lines/12')
                        ? <Link className="main-link active" to={'/lines/11'}>Каталог</Link>:
                    <Link className="main-link" to={'/lines/11'}>Каталог</Link>}
                    {window.location.pathname === '/development' ? <Link className="main-link active" to={'/development'}>Разработка и производство</Link>:
                    <Link className="main-link" to={'/development'}>Разработка и производство</Link>}
                    {/*<Link to={'/lines/11#production-line'}>Продукция</Link>*/}
                    {/*<Link to={'/lines/11#advantages-line'}>Преимущества</Link>*/}
                    {/*<Link to={'/lines/11#active-substances-line'}>Активные вещества</Link>*/}
                </div>
                <a className={"icons-free-source"} href="https://www.flaticon.com" >Icons created by Freepik - Flaticon</a>

                {/*<div className="about">*/}
                {/*    <Link className="main-link" to={'/development'}>Разработка и производство</Link>*/}
                {/*    /!*<Link to={'/'}>Партнеры</Link>*!/*/}
                {/*    /!*<Link to={'/development'}>Стать партнером</Link>*!/*/}
                {/*    /!*<Link to={'/feedback'}>Обратная связь</Link>*!/*/}
                {/*</div>*/}


            </div>
            <div className="copy">&copy; 2023-2024 ООО "ЛИК Сидерис". Все права защищены</div>
        </footer>
    );
};

export default FooterLanding;