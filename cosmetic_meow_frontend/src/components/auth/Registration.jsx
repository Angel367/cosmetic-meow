import React from "react";
import RegistrationForm from "./AuthForm";

import {Link} from "react-router-dom";

function Registration() {
    return (
            <main>
                <RegistrationForm path={'register/'} buttonName={"Зарегистрироваться"}/>
                <Link to={"/login/"}>Уже зарегистрированы? Войти</Link>
            </main>
    );

}

export default Registration;