import React from 'react';
import {Link} from "react-router-dom";
import FeedbackForm from "./FeedbackForm";

const arrow = process.env.PUBLIC_URL + '/img/line-page/black-arrow.svg';
const page = process.env.PUBLIC_URL + '/img/main/course.png';
const icon = process.env.PUBLIC_URL + '/img/dev/social/Icon.svg';
const icon1 = process.env.PUBLIC_URL + '/img/dev/social/Icon-1.svg';
const icon2 = process.env.PUBLIC_URL + '/img/dev/social/Icon-2.svg';
const icon3 = process.env.PUBLIC_URL + '/img/dev/social/Icon-3.svg';

function Feedback() {
    return (
        <main className={"feedback-module"}>
            <section className={"feedback-module__description"}>
                <div className="feedback-module__description-text">
                    <h3 className={"not-main-h3"}>Поддержка</h3>
                    <h1 className={"not-main-h1"}>Обратная связь</h1>
                    <p className={"not-main-p"}>
                        У вас возникли вопросы по работе сайта?
                        Хотите связаться с представителями компании?
                        Нашли ошибку или хотите оставить отзыв?
                        Вы можете связаться с нами.
                        Наши специалисты готовы помочь вам в решении любых вопросов.
                    </p>
                    <Link to={'/development'} className="contact-us">
                        <span>Связаться</span>
                        <span><img alt="" src={arrow}/></span>
                    </Link>
                </div>
                <div className="feedback-module__description-img-holder">
                    <img alt="[img]" src={page}/>
                </div>
            </section>
            <section className={"feedback-module__form-holder"}>
                <h2 className={"not-main-h2"}>Связаться с нами</h2>
                <p className={"not-main-p"}>Оставьте заявку и наш специалист
                    свяжется с вами в ближайшее время</p>
                <div className="feedback-module__form-holder__social">
                    <img alt="" src={icon}/>
                    <img alt="" src={icon1}/>
                    <img alt="" src={icon2}/>
                    <img alt="" src={icon3}/>
                </div>
                <FeedbackForm type={"support"}/>
            </section>
        </main>
    );
}

export default Feedback;
