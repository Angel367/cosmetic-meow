import React from "react";
import FeedbackForm from "./FeedbackForm";

function FeedbackSection({type="contract_request"}) {
    return (
        <section className={"feedback-module__form-holder"}>
            <h2 className={"not-main-h2"}>Связаться с нами</h2>
            <p className={"not-main-p"}>Оставьте заявку и наш специалист
                свяжется с вами в ближайшее время</p>

            {/*<div className="feedback-module__form-holder__social">*/}
            {/*    <img alt="" src={icon}/>*/}
            {/*    <img alt="" src={icon1}/>*/}
            {/*    <img alt="" src={icon2}/>*/}
            {/*    <img alt="" src={icon3}/>*/}
            {/*</div>*/}
            <FeedbackForm  id={"contract_request"}/>
        </section>
    );
}
export default FeedbackSection;