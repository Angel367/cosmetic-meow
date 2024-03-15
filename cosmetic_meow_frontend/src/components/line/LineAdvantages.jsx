import React from "react";

const magicWand = process.env.PUBLIC_URL + '/img/main/fi-rr-magic-wand.svg';


function LineAdvantages({advantages}) {

    if (!advantages || advantages.length === 0)
        return
        return (
            <section className="advantages" >
                <h2 className="not-main-h2">Ключевые преимущества</h2>
                <p className="not-main-p">Почему стоит выбрать нашу продукцию</p>
                <div className="advantages-holder">
                    {advantages.map((advantage, index) => (
                        <div className="advantage" key={index}>
                            <img alt="" src={magicWand}/>
                            <h3>{advantage.name}</h3>
                            <p>{advantage.description}</p>
                        </div>
                    ))}
                </div>
            </section>
        );

}

export default LineAdvantages;