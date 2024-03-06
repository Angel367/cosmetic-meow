import React from 'react';
import {useParams} from "react-router-dom";

function LineApplication(){
        let {applications} = useParams();
        if (!applications || applications.length === 0) {
            applications = [
                "Aplication 1sit amet consectetur. Leo nulla imperdiet quam tellus fringilla viverra eleifend tempor quis",
                "Aplication 2sit amet consectetur. Leo nulla imperdiet quam tellus fringilla viverra eleifend tempor quis",
                "Aplication 3sit amet consectetur. Leo nulla imperdiet quam tellus fringilla viverra eleifend tempor quis",
                "Aplication 4sit amet consectetur. Leo nulla imperdiet quam tellus fringilla viverra eleifend tempor quis",
                "Aplication 5sit amet consectetur. Leo nulla imperdiet quam tellus fringilla viverra eleifend tempor quis"
            ];
        }
        return (
            <section className="application" id="application">
                <h2>Назначение</h2>
                {/*todo fix*/}
                <div className="application-holder">
                    {applications.map((application, index) => (
                    <p className="application" key={index}>
                        {application}
                    </p>
                    ))}
                </div>
            </section>
        );
    }


export default LineApplication;