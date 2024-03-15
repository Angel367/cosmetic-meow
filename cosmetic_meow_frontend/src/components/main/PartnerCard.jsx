import React from "react";
import {Link} from "react-router-dom";

function PartnerCard({partner}) {
    return (
        <div className="partner">
            <div>
                <img src={partner.img} alt="partner"/>
            </div>

                <p>
                    Совместно с {partner.name} мы разработали линии:
                    {partner.lines.map((line, index) => {
                        return (
                            <>
                            <Link className={"name-line"} to={`/lines/${line.id}`}
                                  key={index + " " + partner.id}>{line.name}</Link>
                            {index !== partner.lines.length - 1 ? ", " : ""}
                            </>
                        );
                    })}
                </p>

        </div>
    );
}
export default PartnerCard;