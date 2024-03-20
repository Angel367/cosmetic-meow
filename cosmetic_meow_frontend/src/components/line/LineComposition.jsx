import React from "react";
import LineActiveSubstanceCard from "./LineActiveSubstanceCard";
function LineComposition({active_substances}) {

    if (!active_substances || active_substances.length === 0) {
        return
    }
        return (
            <section className="similar" id="similar">
                <h2 className={'not-main-h2'} >
                    Активные компоненты
                </h2>
                <p className={'not-main-p'}>
                    Побробнее о том, какие активные компоненты входят в состав продуктов линейки

                </p>
                <div className="similar-holder">
                    {active_substances.map((active_substance, index) => (
                        <LineActiveSubstanceCard key={index} active_substance={active_substance}/>
                    ))}

                </div>
            </section>
        );
    }


export default LineComposition;