import React from "react";
import RegistrationForm from "./AuthForm";

import {Link} from "react-router-dom";

function Registration() {
    return (
        <main className=" d-flex justify-content-center align-items-center flex-column">
            <RegistrationForm path={'register/'} buttonName={"Зарегистрироваться"}/>
            <Link to={"/login/"}>Уже зарегистрированы? Войти</Link>
        </main>
    );

}

export default Registration;