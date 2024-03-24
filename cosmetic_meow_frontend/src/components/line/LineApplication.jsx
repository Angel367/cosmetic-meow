import React from 'react';


function LineApplication({purposes}) {
    if (!purposes || purposes.length === 0 )
            return
    purposes = [purposes.find(p => p.purpose !== '')]
    // console.log(purposes, "purposes")
    if (!purposes || purposes.length === 0 )
            return
        return (
            <section className="application" id="applications-line">
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