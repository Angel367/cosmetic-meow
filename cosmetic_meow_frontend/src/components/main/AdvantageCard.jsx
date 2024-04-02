import React from "react";

function AdvantageCard({icon, title, text}) {
    return(
    <div className="slide">
        <div>
            <img src={icon} alt=""/>
        </div>
        <h4 className={"not-main-h2"}>{title}</h4>
        <p className={"not-main-p"}>
            {text}
        </p>
    </div>
    )
}
export default AdvantageCard;