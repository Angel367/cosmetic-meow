import React from "react";
import {Link, useParams} from "react-router-dom";
const magicWand = process.env.PUBLIC_URL + '/img/main/fi-rr-magic-wand.svg';
const confetti = process.env.PUBLIC_URL + '/img/main/fi-rr-confetti.svg';
const following = process.env.PUBLIC_URL + '/img/main/fi-rr-following.svg';
const arrow = process.env.PUBLIC_URL + '/img/line-page/black-arrow.svg';
function MainAdvantages() {

    return (
        <article id="advantages">
            <h3>Преимущества</h3>
            <h2>Почему нас выбирают</h2>
            <div className="slide-holder">
                <div className="slide">
                    <div>
                        <img src={magicWand} alt=""/>
                    </div>
                    <h4>Легкость</h4>
                    <p>
                        Удобный и простой онлайн-шоппинг
                        для всех любителей красоты
                    </p>
                </div>
                <div className="slide">
                    <div>
                        <img src={confetti} alt=""/>
                    </div>
                    <h4>Разнообразие</h4>
                    <p>
                        Доступ к широкому выбору косметических
                        товаров от разных компаний в одном месте
                    </p>
                </div>
                <div className="slide">
                    <div>
                        <img src={following} alt=""/>
                    </div>
                    <h4>Удобство</h4>
                    <p>
                        Возможность сравнивать цены и читать
                        отзывы других покупателей перед совершением покупки
                    </p>
                </div>
            </div>
            <Link to={"/development"}
                  className="back">Узнать о больше компании
                <img alt="arrow" src={arrow}/>
            </Link>
        </article>
    );
}

export default MainAdvantages;