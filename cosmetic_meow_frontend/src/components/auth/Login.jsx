import React from "react";
import LoginForm from "./AuthForm";
import NotificationContainer from "react-notifications/lib/NotificationContainer";
import {Link} from "react-router-dom";

function Registration() {
    return (
            <main>
                <div>
                    <NotificationContainer/>
                </div>
                <LoginForm path={'token/'} buttonName={"Войти"}/>
                <Link to={"/register"}>Еще не зарегистрированы? Зарегистрироваться</Link>
            </main>
    );
}

export default Registration;