import React from "react";
import {Link} from "react-router-dom";
const partnerImg = process.env.PUBLIC_URL + '/img/main/partner.png';
function PartnerCard({partner}) {
    return (
        <div className="partner">
            <div>
                <img src={partnerImg} alt="partner"/>
            </div>

                <p>
                    Совместно с {partner.name} мы разработали линии:
                    {partner.product_lines.map((line, index) => {
                        return (
                            <>
                            <Link className={"name-line"} to={`/lines/${line.id}`}
                                  key={index + " " + partner.id}> {line.name}</Link>
                            {index !== partner.product_lines.length - 1 ? ", " : ""}
                            </>
                        );
                    })}
                </p>

        </div>
    );
}
export default PartnerCard;