import React from "react";
import LineActiveSubstanceCard from "./LineActiveSubstanceCard";
function LineComposition({active_substances, line_id}) {

    if (!active_substances || active_substances.length === 0) {
        return
    }
    if (line_id === 12){
        active_substances[0].image = process.env.PUBLIC_URL + '/img/active_substances/1.png';
        active_substances[1].image = process.env.PUBLIC_URL + '/img/active_substances/2.png';
        active_substances[2].image = process.env.PUBLIC_URL + '/img/active_substances/3.png';
        active_substances[3].image = process.env.PUBLIC_URL + '/img/active_substances/4.png';

    }
        return (
            <section className="active-substances-line" id={"active-substances-line"}>
                <h2 className={'not-main-h2'} >
                    Активные компоненты
                </h2>
                <p className={'not-main-p'}>
                    Побробнее о том, какие активные компоненты входят в состав продуктов линейки

                </p>
                <div className="active-substances-holder">
                    {active_substances.map((active_substance, index) => (
                        <LineActiveSubstanceCard key={index} active_substance={active_substance}/>
                    ))}

                </div>
            </section>
        );
    }


export default LineComposition;