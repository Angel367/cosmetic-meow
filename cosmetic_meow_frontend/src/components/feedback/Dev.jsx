import React from 'react';
import {Link} from "react-router-dom";
import FeedbackForm from "./FeedbackForm";
import getBaseUrl from "../../requests/baseUrl";
import FeedbackSection from "./FeedbackSection";
import AdvantageCard from "../main/AdvantageCard";


const arrow = process.env.PUBLIC_URL + '/img/line-page/black-arrow.svg';
const page = process.env.PUBLIC_URL + '/img/main/course.png';
const fullCycle = process.env.PUBLIC_URL + '/img/dev/full-cycle.png';
const clinicalTrial = process.env.PUBLIC_URL + '/img/dev/clinical-test.png';
const business = process.env.PUBLIC_URL + '/img/dev/business.png';
const lab = process.env.PUBLIC_URL + '/img/dev/lab.png';
const management = process.env.PUBLIC_URL + '/img/dev/managment-exp.png';

function Dev() {
    const advantages = [
        {
            icon: fullCycle,
            text: 'Полный цикл от идеи до производства и обеспечения продаж'
        },
        {
            icon: lab,
            text: 'Возможность проведения широкого комплекса лабораторных исследований для' +
                    ' количественный и качественный анализ в том числе ВЭЖХ,' +
                ' спектральный анализ, анализ вязкости и так далее'
        },
        {
            icon: clinicalTrial,

            text: 'Клинические испытания продуктов'
        },
        {
            icon: management,
            text: 'Опыт работы с ведущими ' +
                'международными ' +
                'компаниями'
        },
        {
            icon: business,
            text: 'Полный комплекс услуг по ' +
                'сопровождению Вашего ' +
                'бизнеса'
        }

    ];
        return (
            <main className={"feedback-module"}>
                <section className={"feedback-module__description"}>
                    <div className="feedback-module__description-text">
                        <h3 className={"not-main-h3"}>Партнерство</h3>
                        <h1 className={"not-main-h1"}>Разработка и контрактное производство</h1>
                        <p className={"not-main-p"}>
                            Наша команда обеспечивает всестороннюю поддержку Вас и
                            ваших идей от идеи до промышленного выпуска.
                            <br/>
                        НАША КОМАНДА - это высококвалифицированные специалисты имеющие
                        опыт разработки под ключ наукоемких высокотехнологичных продуктов и
                        решений в т.ч. с обеспечением их локализации в интересах крупнейших
                        иностранных и отечественных производителей Novartis, Эллара и многих других.
                        </p>

                        {/*<a href="#contract_request" className="contact-us" >*/}
                        {/*    <span>Связаться</span>*/}
                        {/*    <span><img alt="" src={arrow}/></span>*/}
                        {/*</a>*/}
                        <a href={'mailto:' + getBaseUrl(true)} className="contact-us">
                            <span>Связаться с нами по почте {getBaseUrl(true)}</span>
                            <span><img alt="" src={arrow}/></span>
                        </a>
                    </div>
                    <div className="feedback-module__description-img-holder">
                        <img alt="[img]" src={page}/>
                    </div>
                </section>
                <section className={"dev-live-cycles"}>

                </section>
                <section className={"dev-advantages"} id={"dev-advantages"}>
                    <h2 className={"not-main-h1"}
                    >Нас выбирают профессионалы</h2>
                    <p className={"not-main-p"}>
                        Мы можем обеспечить набор услуг и работ, не имеющих аналогов,
                        которые Вам позволят создать и вывести на рынок свой уникальный продукт.
                    </p>
                    <div className="slide-holder">
                        {
                            advantages.map((advantage, index) => (
                                <AdvantageCard key={index} icon={advantage.icon} title={advantage.title}
                                               text={advantage.text}/>
                            ))
                        }

                    </div>
                </section>
                    <FeedbackSection/>
            </main>
);
}
export default Dev;
