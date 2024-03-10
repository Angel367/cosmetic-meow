import React from "react";
import LineActiveSubstanceCard from "../baseComponents/LineActiveSubstanceCard";
function LineComposition({active_substances}) {

    if (!active_substances || active_substances.length === 0) {
        return <div>Загрузка...</div>
    }
        return (
            <section className="similar" id="similar">
                <h2>Активные компоненты</h2>
                <p>Lorem ipsum dolor sit amet consectetur.
                    Leo nulla imperdiet quam tellus fringilla viverra eleifend tempor quis</p>
                <div className="similar-holder">
                    {active_substances.map((active_substance, index) => (
                        <LineActiveSubstanceCard key={index} active_substance={active_substance}/>
                    ))}

                </div>
            </section>
        );
    }


export default LineComposition;