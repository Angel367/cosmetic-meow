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
                            Wisconsin Ave, Suite 700 Chevy Chase, Maryland 20815
                        </div>
                    </div>
                </address>
                <div className="bioactiv">
                    <Link className="main-link" to={'/lines/11'}>Линейка Bioactiv</Link>
                    <Link to={'/lines/11'}>Якорь1</Link>
                    <Link to={'/lines/11'}>Якорь2</Link>
                    <Link to={'/lines/11'}>Якорь3</Link>

                </div>
                <div className="dr-sechenov">
                    <Link className="main-link" to={'/lines/12'}>Продукт Dr.Sechenov</Link>
                    <Link to={'/lines/12'}>Якорь1</Link>
                    <Link to={'/lines/12'}>Якорь2</Link>
                    <Link to={'/lines/12'}>Якорь3</Link>
                </div>
                <div className="about">
                    <Link className="main-link" to={'/'}>О компании</Link>
                    <Link to={'/'}>Партнеры</Link>
                    <Link to={'/development'}>Стать партнером</Link>
                    <Link to={'/feedback'}>Обратная связь</Link>
                </div>

            </div>
            <div className="copy">&copy; 2023 All rights reserved</div>
        </footer>
    );
};

export default FooterLanding;