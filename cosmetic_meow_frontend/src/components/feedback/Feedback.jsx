import React from 'react';
import {Link} from "react-router-dom";
import FeedbackForm from "./FeedbackForm";

const arrow = process.env.PUBLIC_URL + '/img/line-page/black-arrow.svg';
const page = process.env.PUBLIC_URL + '/img/main/course.png';
const icon = process.env.PUBLIC_URL + '/img/dev/social/Icon.svg';
const icon1 = process.env.PUBLIC_URL + '/img/dev/social/Icon-1.svg';
const icon2 = process.env.PUBLIC_URL + '/img/dev/social/Icon-2.svg';
const icon3 = process.env.PUBLIC_URL + '/img/dev/social/Icon-3.svg';

function Feedback() {
        return (
            <main>
                <section className="description">
                    <div className="text">
                        <h3>Поддержка</h3>
                        <h1>Обратная связь</h1>
                        <p>Lorem ipsum dolor sit amet consectetur. Leo nulla imperdiet quam
                            tellus fringilla viverra eleifend tempor quis. Nec dolor risus
                            fermentum nec vulputate proin nulla nulla consequat. Vitae
                            velit mi velit tortor euismod. Commodo velit eu amet ac.
                            Lorem ipsum dolor sit amet consectetur. Leo nulla imperdiet
                            quam tellus fringilla viverra eleifend tempor quis. Nec dolor
                            risus fermentum nec vulputate proin nulla nulla consequat.
                            Vitae velit mi velit tortor euismod. Commodo velit eu amet ac.
                        </p>

                        <Link to={'/development'} className="contact-us"><span>Связаться</span><span>
            <img alt="" src={arrow}/>
        </span></Link>
                    </div>
                    <div className="img-holder">
                        <img alt="[img]" src={page}/>
                    </div>
                </section>
                <section className="form-section">
                    <h2>Связаться с нами</h2>
                    <p>Lorem ipsum dolor sit amet consectetur. Leo nulla imperdiet quam tellus fringilla viverra
                        eleifend tempor
                        quis</p>
                    <div className="social_dev">
                        <img alt="" src={icon}/>
                        <img alt="" src={icon1}/>
                        <img alt="" src={icon2}/>
                        <img alt="" src={icon3}/>
                    </div>
                    <FeedbackForm type={"support"}/>
                </section>
            </main>
        );
}

export default Feedback;
