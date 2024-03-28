import React, {useEffect} from 'react';
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
    const [clientWidth, setClientWidth] = React.useState(window.innerWidth);
    const [isMobile, setIsMobile] = React.useState(null);
    useEffect(() => {
        if (clientWidth > 768) {
            setIsMobile(null);
        } else if (clientWidth > 576) {
            setIsMobile(false);
        } else {
            setIsMobile(true);
        }
    }, [clientWidth]);
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
                    <h4 className={"not-main-h2"} id={"dev-live-cycles__idea"}>Идея</h4>

                        <h4 className={"not-main-h2"} id={"dev-live-cycles__development_header"}>Разработка</h4>
                        <p className={"not-main-p" } id={"dev-live-cycles__development_text"}>
                            Помощь в формировании идеи и уточнении бизнес стратегии проекта
                        </p>

                    <ul id="dev-live-cycles__list__development" className={"not-main-p"}>
                        <li>
                            Уникальная услуга - качественный и количественный анализ аналогов
                        </li>
                        <li>
                            Собственная лабораторная база
                        </li>
                        <li>
                            Формирование бизнес концепции
                        </li>
                        <li>
                            Построение стратегии защиты интеллектуальной собственности
                        </li>
                        <li>
                            Уточнение целевой аудитории
                        </li>
                    </ul>

                        <h4 className={"not-main-h2"} id={"dev-live-cycles__production_header"}>Производство</h4>
                        <p className={"not-main-p"} id={"dev-live-cycles__production_text"}>
                            Обеспечение производства под ключ от трансфера до выпуска продукта
                        </p>


                    <ul id={"dev-live-cycles__list__production"} className={"not-main-p"}>
                        <li>
                            Собственная производственная база
                        </li>
                        <li>
                            Разработка промышленной технологии
                        </li>
                        <li>
                            Оформление ТУ/Регламентов/производственных карт и т.п.
                        </li>
                        <li>
                            Трансфер технологии
                        </li>
                        <li>
                            Регистрация интеллектуальной собственности (патенты/ноу хау)
                        </li>
                        <li>
                            Разработка и регистрация товарного знака
                        </li>
                        <li>
                            Открытие компании
                        </li>
                        <li>
                            Проектирование и создание производств под ключ по стандартам GMP
                        </li>
                    </ul>

                    <h4 className={"not-main-h2"} id={"dev-live-cycles__sales_header"}>Продажи</h4>
                    <p className={"not-main-p"} id={"dev-live-cycles__sales_text"}>
                        Поддержка в формировании и реализации маркетинговой стратегии и обеспечении деятельности
                        компании
                    </p>


                    <ul id={"dev-live-cycles__list__sales"} className={"not-main-p"}>
                        <li>
                            Регистрация продукции
                        </li>
                        <li>
                            Получение декларации/СГР и т.п.
                        </li>
                        <li>
                            Разработка и регистрация товарного знака
                        </li>
                        <li>
                            Внедрение системы управления РИД компании
                        </li>
                        <li>
                            Клинические испытания решений
                        </li>
                        <li>
                            Внедрение СМК
                        </li>
                        <li>
                            Создание сайта продукта/компании
                        </li>
                    </ul>
                    <h4 className="not-main-h2" id={"dev-live-cycles__product"}>
                        Продукт
                    </h4>
                    <div id={"dev-live-cycles__line"} className={isMobile === null ? "desktop" :
                        (isMobile === true ? "mobile" : "tablet") }>
                        <div className={"dev-live-cycles__line__start"}></div>
                        <div className={"dev-live-cycles__line__second"}></div>
                        <div className={"dev-live-cycles__line__third"}></div>
                        <div className={"dev-live-cycles__line__end"}></div>
                    </div>
                    <span id={"dev-live-cycles__line__start__text"}></span>
                    <span id={"dev-live-cycles__line__end__text"}></span>

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
                <section className={"dev-types-of-works"}>
                <h2 className={"not-main-h1"}>Что мы можем предложить</h2>
                    <p className={"not-main-p"}>
                        Мы работаем во всех сегмента косметического рынка
                    </p>
                    <div className="dev-types-of-works__cards">
                        <div className="dev-types-of-works__card">
                            <h3 className={"not-main-h2"}>Специализированная косметика</h3>
                        </div>
                        <div className="dev-types-of-works__card">
                            <h3 className={"not-main-h2"}>Высокотехнологичная косметика</h3>

                        </div>
                        <div className="dev-types-of-works__card">
                            <h3 className={"not-main-h2"}>Профессиональная косметика</h3>
                        </div>

                        <div className="dev-types-of-works__card">
                            <h3 className={"not-main-h2"}>Премиальная косметика</h3>
                        </div>
                        <div className="dev-types-of-works__card">
                            <h3 className={"not-main-h2"}>Лечебная косметика</h3>

                        </div>
                        <div className="dev-types-of-works__card">
                            <h3 className={"not-main-h2"}>Масс-маркет</h3>
                        </div>

                    </div>
                </section>

                <FeedbackSection/>
            </main>
        );
}

export default Dev;
