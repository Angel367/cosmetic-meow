import React from "react";
import {Link} from "react-router-dom";
import AdvantageCard from "./AdvantageCard";
const magicWand = process.env.PUBLIC_URL + '/img/main/fi-rr-magic-wand.svg';
const confetti = process.env.PUBLIC_URL + '/img/main/fi-rr-confetti.svg';
const following = process.env.PUBLIC_URL + '/img/main/fi-rr-following.svg';
const arrow = process.env.PUBLIC_URL + '/img/line-page/black-arrow.svg';
function MainAdvantages() {
    const advantages = [
        {
            icon: magicWand,
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
            icon: confetti,
            title: 'БЕЗОПАСНОСТЬ',
            text: 'Все продукты проходят полноценные ' +
                'клинические испытания на базах ' +
                'ведущих медицинских центров'
        },
        {
            icon: following,
            title: 'КАЧЕСТВО',
            text: 'Фармацевтические стандарты качества.' +
                'Ингредиенты с доказанной эффективностью'
        },
        {
            icon: magicWand,
            title: 'ЭФФЕКТИВНОСТЬ',
            text: 'Ингредиенты с доказанной ' +
                'эффективностью от ведущих ' +
                'производителей в мире.'
        }
    ];

    return (
        <section id="advantages">
            {/*<h3 className={'not-main-h3'}>*/}
            {/*    Преимущества</h3>*/}
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