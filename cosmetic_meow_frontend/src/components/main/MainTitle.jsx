import React from "react";
import {Link} from "react-router-dom";
import Loading from "../error/Loading";
const mainTitle = process.env.PUBLIC_URL + '/img/main/main.jpg';

function MainTitle() {




    return (
        <section id="main-title">
            <div className="main-title-description" id={"main-title-description"}
                    // style={{height: startHeight}}
            >
                <div className="main-title-description-header">
                <h1 className={"main-h1"}>SIDERIS</h1>
                {/*<h2 className={"main-h2"}>Твой Онлайн Гламур Гайд</h2>*/}
                </div>
                <p className={"main-p"}>Лаборатория инновационной косметики
СИДЕРИС ориентирована на создание
инновационных высокотехнологичных
продуктов с использованием новейшие
научные открытия и технологии для
создания эффективных средств по уходу
за кожей, волосами и ногтями.
                </p>
                <p className={"main-p"}> Миссия компании – создание
эффективных и безопасных
инновационных наукоёмких средств для
                    красоты с доказанной эффективностью.</p>

            </div>
            <div className="main-title-img">
                <img src={mainTitle} alt="main-title"/>
            </div>
        </section>
    );
}

export default MainTitle;