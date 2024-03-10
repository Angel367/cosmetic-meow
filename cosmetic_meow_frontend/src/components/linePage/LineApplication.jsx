import React from 'react';


function LineApplication({applications} ){
        if (!applications || !applications.length)
            return <div> Загрузка... </div>;

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