import React from "react";
import {Link} from "react-router-dom";
import AdvantageCard from "./AdvantageCard";

const arrow = process.env.PUBLIC_URL + '/img/line-page/black-arrow.svg';
const innovative = process.env.PUBLIC_URL + '/img/main/innovative.png';
const safety = process.env.PUBLIC_URL + '/img/main/safety.png';
const quality = process.env.PUBLIC_URL + '/img/main/quality.png';
const efficiency = process.env.PUBLIC_URL + '/img/main/efficiency.png';

function MainAdvantages() {
    const advantages = [
        {
            icon: innovative,
            title: 'ИННОВАЦИИ',
            text: 'Мы используем передовые ' +
                'достижения науки: ламеллярные ' +
                'системы, системы управления ' +
                'биодеградацией гиалуроновой ' +
                'кислоты, аминокислотные комплексы, ' +
                'повышение биодоступности активных ' +
                'ингредиентов и многое другое'
        },
        {
            icon: safety,
            title: 'БЕЗОПАСНОСТЬ',
            text: 'Все продукты проходят полноценные ' +
                'клинические испытания на базах ' +
                'ведущих медицинских центров'
        },
        {
            icon: quality,
            title: 'КАЧЕСТВО',
            text: 'Фармацевтические стандарты качества. ' +
                'Ингредиенты с доказанной эффективностью'
        },
        {
            icon: efficiency,
            title: 'ЭФФЕКТИВНОСТЬ',
            text: 'Ингредиенты с доказанной ' +
                'эффективностью от ведущих ' +
                'производителей в мире.'
        }
    ];

    return (
        <section id="advantages">
            {/*<h3 className={'not-main-h3'}>*/}
            {/*    advantages</h3>*/}
            <h2 className={"not-main-h1"}
            >Наши преимущества</h2>
            <div className="slide-holder">
                {
                    advantages.map((advantage, index) => (
                        <AdvantageCard key={index} icon={advantage.icon} title={advantage.title} text={advantage.text}/>
                    ))
                }

            </div>
            <Link to={"/contacts"}
                  className="back">Узнать о больше компании

                <img alt="arrow" src={arrow}/>
            </Link>
        </section>
    );
}

export default MainAdvantages;