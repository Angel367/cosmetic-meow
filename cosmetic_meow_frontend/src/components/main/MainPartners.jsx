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
        <article id="partners" className={"partners upper-line"}>
            <div className="upper-line__header">
                <span>Нам доверяют множество </span>
                <span> Экспертов Красоты</span>
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
        </article>
    );
}

export default MainPartners;