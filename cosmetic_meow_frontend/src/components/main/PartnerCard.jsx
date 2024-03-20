import React from "react";
import {Link} from "react-router-dom";

function PartnerCard({partner}) {

    let partnerImg = process.env.PUBLIC_URL + '/img/line-page/no_photo.jpg';
    if( partner.images && partner.images.length > 0) {
        partnerImg = partner.images[0].image;
    }
    return (
        <div className="partner">
            <div>
                <img src={partnerImg} alt=""/>
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