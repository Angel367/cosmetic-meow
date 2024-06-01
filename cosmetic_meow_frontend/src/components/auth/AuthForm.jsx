import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {NotificationManager} from "react-notifications";
import postUser from "../../requests/postUser";
import VerificationPhone from "./VerficationPhone";


function AuthForm({path="login/", buttonName="Войти"}) {
     const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const [form, setForm] = useState({});
    let component = '';

        if (buttonName === "Зарегистрироваться") {

            component = <VerificationPhone phone_number={form.phone_number} />;
            if (document.getElementById("submitAuth") !== null) {
                document.getElementById("submitAuth").disabled = true;
            }
        } else {
            if (document.getElementById("submitAuth") !== null) {
                document.getElementById("submitAuth").disabled = false;
            }
            // document.getElementById("submitAuth").disabled = false;
        }


    const handleSubmit = async (event) => {
        event.preventDefault();
        const registrationForm = event.currentTarget;
        if (registrationForm.checkValidity() === false) {
            event.stopPropagation();
        }
        setValidated(true);
        const data = {
            phone_number: form.phone_number,
            password: form.password,
        }
        const authForm = await postUser(path, data);
        if (authForm.status === 201) {
            NotificationManager.success("Вы успешно зарегистрировались", "Успешная регистрация", 5000);
            navigate('/profile');
            // todo redirect to cart
        } else if (authForm.status === 200) {
            NotificationManager.success("Вы успешно вошли", "Успешный вход", 5000);
            navigate('/profile');
        }
        else {
            NotificationManager.error(authForm.data?.error,
                "Ошибка", 5000);
        }



    }
    return (
        <form  noValidate
              validated={validated.toString()} onSubmit={handleSubmit} method="POST"
              className={"d-flex flex-column  auth gap-3"}
              >
            <p className={"d-flex  gap-2 align-items-center"}>
                <label htmlFor={"phone_number"}>Телефон</label>
                <input id={"phone_number"} type="tel" placeholder="Ваш телефон..." required={true}
                       autoCorrect={"off"}
                       autoCapitalize={"off"}
                       spellCheck={"false"}
                       autoComplete={"off"}
                       onChange={(e) => setForm({...form, phone_number: e.target.value})}/>
{component}
            </p>

            <p className={"d-flex  gap-2 align-items-center"}>
                <label htmlFor={"password"}>Пароль</label>
                <input id={"password"} type="password" placeholder="Ваш пароль..." required={true}
                       minLength={8}
                       autoCorrect={"off"}
                       autoCapitalize={"off"}
                       spellCheck={"false"}
                       autoComplete={"off"}
                       onChange={(e) => setForm({...form, password: e.target.value})}/>
            </p>

            <p className={"d-flex gap-2 align-items-center"}>
                <button type="submit"
                        id={"submitAuth"}
                        className={"button blue"}

                        onSubmit={handleSubmit}>
                    {buttonName}
                </button>
            </p>
        </form>
    );

}

export default AuthForm;