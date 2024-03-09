import React from "react";
import {useParams} from "react-router-dom";
import LineActiveSubstanceCard from "../baseComponents/LineActiveSubstanceCard";
function LineComposition({active_substances}) {

    if (!active_substances || active_substances.length === 0) {
        active_substances = [
            {
                name: "Active substance 1",
                description: "Description 1"
            },
            {
                name: "Active substance 2",
                description: "Description 2"

            },
            {
                name: "Active substance 3",
                description: "Description 3"

            },
            {
                name: "Active substance 4",
                description: "Description 4"

            }];

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