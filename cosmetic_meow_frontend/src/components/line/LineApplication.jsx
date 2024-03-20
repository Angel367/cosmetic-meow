import React from 'react';


function LineApplication({purposes}) {
    if (!purposes || purposes.length === 0 || purposes[0].purpose === '')
            return

        return (
            <section className="application" id="application">
                <h2 className={'not-main-h2'}>Назначение</h2>

                <div className="application-holder">
                    {purposes.map((p, index) => (
                    <p className="application" key={index}>
                        {p.purpose}
                    </p>
                    ))}
                </div>
            </section>
        );
    }


export default LineApplication;