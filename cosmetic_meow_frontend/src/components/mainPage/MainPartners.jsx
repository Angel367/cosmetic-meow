import React from "react";
const partner = process.env.PUBLIC_URL + '/img/main/partner.svg';
function MainPartners() {
    return (
        <article id="partners" className={"partners"}>
            <div className="header-partners">
                <span className="font-review">Нам доверяют множество</span>
                <span className="font-review">Экспертов Красоты</span>
            </div>
            <div className="partners-holder">
                <div className="partner">
                    <img src={partner} alt="partner"/>
                </div>
                <div className="partner">
                    <img src={partner} alt="partner"/>
                </div>
                <div className="partner">
                    <img src={partner} alt="partner"/>
                </div>
                <div className="partner">
                    <img src={partner} alt="partner"/>
                </div>
            </div>
        </article>
    );
}

export default MainPartners;