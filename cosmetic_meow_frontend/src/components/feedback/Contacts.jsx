import React from 'react';
import {Link} from "react-router-dom";
import FeedbackForm from "./FeedbackForm";
import getBaseUrl from "../../requests/baseUrl";
import FeedbackSection from "./FeedbackSection";

const arrow = process.env.PUBLIC_URL + '/img/line-page/black-arrow.svg';
const page = process.env.PUBLIC_URL + '/img/main/course.png';
const icon = process.env.PUBLIC_URL + '/img/dev/social/Icon.svg';
const icon1 = process.env.PUBLIC_URL + '/img/dev/social/Icon-1.svg';
const icon2 = process.env.PUBLIC_URL + '/img/dev/social/Icon-2.svg';
const icon3 = process.env.PUBLIC_URL + '/img/dev/social/Icon-3.svg';

function Contacts() {
    return (
        <main className={"feedback-module"}>
            <section className={"feedback-module__description"}>
                <div className="feedback-module__description-text">
                    <h3 className={"not-main-h3"}>О компании</h3>
                    <h1 className={"not-main-h1"}>Контакты</h1>
                    <p className={"not-main-p"}>
                        Мы всегда рады ответить на ваши вопросы и помочь вам с выбором продукции. Свяжитесь с нами
                        любым удобным для вас способом. Мы работаем с 9:00 до 18:00 по будням.
                        Наши специалисты ответят на все ваши вопросы.
                        Вы можете связаться с нами по электронной почте или через форму обратной связи.

                    </p>
                    {/*<a href="#support" className="contact-us" >*/}
                    {/*    <span>Связаться</span>*/}
                    {/*    <span><img alt="" src={arrow}/></span>*/}
                    {/*</a>*/}
                    <a href={'mailto:' + getBaseUrl(true)} className="contact-us" >
                        <span>Связаться с нами по почте {getBaseUrl(true)}</span>
                        <span><img alt="" src={arrow}/></span>
                    </a>

                </div>
                <div className="feedback-module__description-img-holder">
                    <img alt="[img]" src={page}/>
                </div>
            </section>
            <FeedbackSection/>
        </main>
    );
}

export default Contacts;
