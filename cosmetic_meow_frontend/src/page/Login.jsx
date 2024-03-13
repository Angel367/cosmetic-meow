import React, {useEffect} from "react";
import LoginForm from "../components/forms/AuthForm";
import NotificationContainer from "react-notifications/lib/NotificationContainer";
import {Link} from "react-router-dom";

function Registration() {
    useEffect(() => {
        document.title = "Вход";
        window.scrollTo(0, 0);
    });
    return (
        <div>
            <div>
                <NotificationContainer/>
            </div>
            <main>
                <LoginForm path={'token/'} buttonName={"Войти"}/>
                <Link to={"/register"}>Еще не зарегистрированы? Зарегистрироваться</Link>
            </main>
        </div>
    );

}

export default Registration;