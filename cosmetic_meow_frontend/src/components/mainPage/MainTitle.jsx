import React from "react";
import {Link} from "react-router-dom";

function MainTitle() {
    return (
        <article id="main-title">
            <h1>SIDERID</h1>
            <h2>Твой Онлайн Гламур Гайд</h2>
            <p>Мы предлагаем вам лучшие товары для вашего здоровья и красоты.
                Все товары сертифицированы и прошли проверку качества.
                Вы можете быть уверены в покупке и качестве товара.
            </p>
            <div className="button-holder">
                <Link to={'/shop'} className={"blue button"}>ЛИНИЯ НАЗВАНИЕ</Link>
               <Link to={'/shop'} className={"blue button"}>В магазин</Link>
            </div>

            <div className="review-mark-holder">
                <div className="review-mark">
                    <div className="mark">4.9</div>
                    <div className="review">Отзывов: 1000</div>
                </div>
                {/*TODO мб что-то из результатов */}
                <div className="review-mark">
                    <div className="mark">4.9</div>
                    <div className="review">Отзывов: 1000</div>
                </div>
            </div>

        </article>
    );
}

export default MainTitle;