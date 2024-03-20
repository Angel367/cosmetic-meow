import React from 'react';
import '../../styles/BaseStyles/FooterStyles.css';
import {Link} from "react-router-dom"; // импорт стилей
const logo = process.env.PUBLIC_URL + '/img/logo.svg';
const Message = process.env.PUBLIC_URL + "/img/footer/Message.svg";
const Location = process.env.PUBLIC_URL + "/img/footer/Location.svg";


const FooterLanding = () => {
    return (
        <footer>
            <div className="link-with-addr">
                <address className="contacts">

                    <Link to={'/'} className="logo">
                        <img alt="[logo]" src={logo}/>
                    </Link>
                    <div className="email">
                        <img alt="message" src={Message}/>
                        <div className="div-6">support@figma.com</div>
                    </div>
                    <div className="address">
                        <img alt="address" src={Location}/>
                        <div className="div-8">
                            ООО "ЛИК Сидерис"<br/>
                            000000, г. Москва, ул. УЛИЦА, д. 1, стр. 1, офис 1
                        </div>
                    </div>
                </address>
                <div className="bioactiv">
                    <Link className="main-link" to={'/lines/11'}>Линейка BIOACTIV</Link>
                    <Link to={'/lines/11#production-line'}>Продукция</Link>
                    <Link to={'/lines/11#advantages-line'}>Преимущества</Link>
                    <Link to={'/lines/11#active-substances-line'}>Активные вещества</Link>

                </div>
                <div className="dr-sechenov">
                    <Link className="main-link" to={'/lines/12'}>Dr.Sechenov</Link>
                    <Link to={'/lines/12/products/11'}>Обзор продукции</Link>
                    <Link to={'/lines/12#advantages-line'}>Особенности</Link>
                    <Link to={'/lines/12#applications-line'}>Применение</Link>
                </div>
                <div className="about">
                    <Link className="main-link" to={'/'}>О компании</Link>
                    <Link to={'/'}>Партнеры</Link>
                    <Link to={'/development'}>Стать партнером</Link>
                    <Link to={'/feedback'}>Обратная связь</Link>
                </div>

            </div>
            <div className="copy">&copy; 2023-2024 ООО "ЛИК Сидерис". Все права защищены</div>
        </footer>
    );
};

export default FooterLanding;