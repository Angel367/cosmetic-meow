import React from "react";
import {Link} from "react-router-dom";

const mainTitleMobile = process.env.PUBLIC_URL + '/img/main/main_title_mobile.png';
const mainTitle = process.env.PUBLIC_URL + '/img/main/main_title.png';
function MainTitle() {
    return (
        <article id="main-title">
            <div className="main-title-description">
                <h1 className={"main-h1"}>SIDERID</h1>
                <h2 className={"main-h2"}>Твой Онлайн Гламур Гайд</h2>
                <p className={"not-main-p"}
                >Мы предлагаем вам лучшие товары для вашего здоровья и красоты.
                    Все товары сертифицированы и прошли проверку качества.
                    Вы можете быть уверены в покупке и качестве товара.
                </p>
                <div className="button-holder">
                    <Link to={'/lines/11'} className={"blue button"}>
                        {/*Подробнее про*/}
                       Подробнее о BIOACTIV</Link>
                   <Link to={'/lines/12'} className={"white button"}>
                       {/*Больше о*/}
                      Больше о Dr.Sechenov</Link>
                </div>

            {/*<div className="review-mark-holder">*/}
            {/*    <div className="review-mark">*/}
            {/*        <div className="mark">4.9</div>*/}
            {/*        <div className="review">Отзывов: 1000</div>*/}
            {/*    </div>*/}
            {/*    /!*TODO мб что-то из результатов иссл*!/*/}
            {/*    <div className="review-mark">*/}
            {/*        <div className="mark">4.9</div>*/}
            {/*        <div className="review">Отзывов: 1000</div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            </div>
            <div className="main-title-img">
                <img src={mainTitleMobile} alt="" className={"main-title-img_mobile"}/>
                <img src={mainTitle} alt="" className={"main-title-img_desktop"}/>
            </div>
        </article>
    );
}

export default MainTitle;