import React from "react";
import {Link} from "react-router-dom";
import PartnerCard from "./PartnerCard";
const partnerImg = process.env.PUBLIC_URL + '/img/main/partner.png';
function MainPartners() {
    let partners = [
        {
            id: 1,
            img: partnerImg,
            name: "MIREA",
            lines: [
                {
                    id: 11,
                    name: "1BIOACTIV",
                },


            ]
        },
        {
            id: 2,
            img: partnerImg,
            name: "РУДН",
            lines: [
                {
                    id: 11,
                    name: "1BIOACTIV",
                },

            ]
        },
        {
            id: 3,
            img: partnerImg,
            name: "Техника",
            lines: [
                {
                    id: 11,
                    name: "1BIOACTIV",
                },

            ]
        },
        {
            id: 4,
            img: partnerImg,
            name: "Sechenov",
            lines: [
                {
                    id: 12,
                    name: "1Dr.Sechenov"
                },
                {
                    id: 12,
                    name: "2Dr.Sechenov"
                },

            ]
        }

    ];
    return (
        <article id="partners" className={"partners upper-line"}>
            <div className="upper-line__header">
                <span>Нам доверяют множество </span>
                <span> Экспертов Красоты</span>
            </div>
            <div className="upper-line__body">
                {partners.map((partner) => {
                    return (
                        <PartnerCard key={partner.id} partner={partner}/>
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