import React from 'react';
import '../../styles/BaseStyles/FooterStyles.css';
import {Link} from "react-router-dom"; // импорт стилей
const logo = process.env.PUBLIC_URL + '/img/logo.svg';
const Facebook = process.env.PUBLIC_URL + "/img/footer/Facebook.svg";
const Instagram = process.env.PUBLIC_URL + "/img/footer/Instagram.svg";
const Telegram = process.env.PUBLIC_URL + "/img/footer/Telegram.svg";
const Twitter = process.env.PUBLIC_URL + "/img/footer/Twitter.svg";
const Message = process.env.PUBLIC_URL + "/img/footer/Message.svg";
const Location = process.env.PUBLIC_URL + "/img/footer/Location.svg";


const FooterLanding = () => {
    return (
        <footer>
            <div className="link-with-addr">
                <address className="contacts">
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <Link to={'/'} className="logo">
                        <img alt="[logo]" src={logo}/>
                    </Link>
                    <div className="social">
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a href="">
                            <img alt="facebook" src={Facebook}/>
                        </a>
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a href="">
                            <img alt="instagram" src={Instagram}/>
                        </a>
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a href="">
                            <img alt="telegram" src={Telegram}/>
                        </a>
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a href="">
                            <img alt="twitter" src={Twitter}/>
                        </a>
                    </div>
                    <div className="email">
                        <img alt="message" src={Message}/>
                        <div className="div-6">support@figma.com</div>
                    </div>
                    <div className="address">
                        <img alt="address" src={Location}/>
                        <div className="div-8">
                            Wisconsin Ave, Suite 700 Chevy Chase, Maryland 20815
                        </div>
                    </div>
                </address>
                <div className="shopping">
                    <Link className="main-link" to={'/shop'}>Каталог</Link>
                    <Link to={'/lines/3'}>НАЗВАНИЕ ЛИНИИ</Link>
                    <Link to={'/lines/3/products/4'}>Продукт2</Link>
                    <Link to={'/lines/3/products/1'}>Продукт3</Link>

                </div>
                <div className="developing">
                    <Link className="main-link" to={'/development'}>Разработка</Link>
                    <Link to={'/development'}>О контрактном производстве</Link>
                    <Link to={'/development'}>Стать партнером</Link>
                    <Link to={'/lines/3'}>НАЗВАНИЕ ЛИНИИ</Link>

                </div>
                <div className="about">
                    <Link className="main-link" to={'/'}>О нас</Link>
                    <Link to={'/'}>Компания</Link>
                    <Link to={'/'}>Партнеры</Link>
                </div>
                {/*<div className="training">*/}
                {/*    <a className="main-link" href="{% url 'training:courses'%}#">Education</a>*/}
                {/*    <a href="{% url 'training:courses'%}#">Academy</a>*/}
                {/*    <a href="{% url 'training:courses'%}#">Blog</a>*/}
                {/*    <a href="{% url 'training:courses'%}#">Themes</a>*/}
                {/*    <a href="{% url 'training:courses'%}#">Hosting</a>*/}
                {/*    <a href="{% url 'training:courses'%}#">Support</a>*/}
                {/*</div>*/}

                <div className="users">
                    <Link className="main-link" to={'/help'}>Пользователям</Link>
                    <Link to={'/feedback'} >Обратная связь</Link>
                    <Link to={'/feedback'}>Поддержка</Link>
                    <Link to={'/help'}>Правила</Link>
                    <Link to={'/help'}>Безопасность</Link>
                </div>
            </div>
            <div className="copy">&copy; 2023 All rights reserved</div>
        </footer>
    );
};

export default FooterLanding;