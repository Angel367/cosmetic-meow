import React from "react";
const magicWand = process.env.PUBLIC_URL + '/img/main/fi-rr-magic-wand.svg';
const confetti = process.env.PUBLIC_URL + '/img/main/fi-rr-confetti.svg';
const following = process.env.PUBLIC_URL + '/img/main/fi-rr-following.svg';

class LineAdvantages extends React.Component {
    render() {
        return (
            <section className="advantages" id="advantages">
                <h2>Ключевые преимущества</h2>
                <p>Lorem ipsum dolor sit amet consectetur.
                    Leo nulla imperdiet quam tellus fringilla viverra eleifend tempor quis</p>
                <div className="advantages-holder">
                    <div className="advantage">
                        <img alt="" src={magicWand}/>
                            <h3>Качество</h3>
                            <p>Lorem ipsum dolor sit amet consectetur. Leo nulla imperdiet quam tellus fringilla viverra eleifend tempor quis</p>
                    </div>
                    <div className="advantage">
                        <img alt="" src={confetti}/>
                            <h3>Скорость</h3>
                            <p>Lorem ipsum dolor sit amet consectetur. Leo nulla imperdiet quam tellus fringilla viverra eleifend tempor quis</p>
                    </div>
                    <div className="advantage">
                        <img alt="" src={following}/>
                            <h3>Гарантия</h3>
                            <p>Lorem ipsum dolor sit amet consectetur. Leo nulla imperdiet quam tellus fringilla viverra eleifend tempor quis</p>
                    </div>
                    <div className="advantage">
                        <img alt="" src={following}/>
                            <h3>Цена</h3>
                            <p>Lorem ipsum dolor sit amet consectetur. Leo nulla imperdiet quam tellus fringilla viverra eleifend tempor quis</p>
                    </div>
                </div>
            </section>
        );
    }
}

export default LineAdvantages;