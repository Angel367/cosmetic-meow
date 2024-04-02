import React from "react";
import {Link} from "react-router-dom";
import PartnerCard from "./PartnerCard";
import Loading from "../error/Loading";

function MainPartners({partners}) {
    if (!partners)
        partners = []
    // if (!partners || partners.length === 0)
    //     return <Loading/>;

    return (
        <section id="partners" className={"partners upper-line"}>
            <div className="upper-line__header">
                <span>Наши </span>
                <span> партнеры</span>
            </div>
            <div className="p-not-main upper-line__description">
                Мы сотрудничаем с различными научными, медицинскими организациями для создания
совершенных решений и оценки их клинической эффективности
            </div>
            <div className="upper-line__body">
                {partners.map((partner) => {
                    return (
                        <PartnerCard key={partner.id } partner={partner}/>
                    );
                })}

            </div>
            <Link to={"/development"}
                  className="back">Стать партнером
                <img alt="arrow" src={process.env.PUBLIC_URL + '/img/line-page/black-arrow.svg'}/>
            </Link>
        </section>
    );
}

export default MainPartners;