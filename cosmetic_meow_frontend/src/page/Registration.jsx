import React, {useEffect} from "react";
import RegistrationForm from "../components/forms/AuthForm";
import NotificationContainer from "react-notifications/lib/NotificationContainer";
import {Link} from "react-router-dom";

function Registration() {
    useEffect(() => {
        document.title = "Регистрация";
        window.scrollTo(0, 0);
    });
    return (
        <div>
            <div>
                <NotificationContainer/>
            </div>
            <main>
                <RegistrationForm path={'register/'} buttonName={"Зарегистрироваться"}/>
                <Link to={"/login/"}>Уже зарегистрированы? Войти</Link>
            </main>
        </div>
    );

}

export default Registration;