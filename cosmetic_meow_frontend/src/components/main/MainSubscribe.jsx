import React from "react";

function MainSubscribe() {
    return (
        <section id="subscribe" className={"upper-line"}>
            <div className="upper-line__header">
                <span>Подпишитесь на нашу</span>
                <span>Рассылку</span>
            </div>
            <div className="upper-line__description">
                Будьте в курсе всех новинок и акций
            </div>
            <form className="subscribe-form">
                <input type="email" placeholder="Введите ваш email"/>
                <button className="subscribe-form__button">Подписаться</button>
            </form>
        </section>
    );
}

export default MainSubscribe;