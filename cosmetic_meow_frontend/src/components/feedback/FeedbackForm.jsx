import React, {useEffect, useState} from "react";

import {NotificationManager} from "react-notifications";
import 'react-notifications/lib/notifications.css';
import postData from "../../requests/postData";




function FeedbackForm({type="other" ,id=""}) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isAgreementSigned, setIsAgreementSigned] = useState(false);
    const [isReadyForSubmit, setIsReadyForSubmit] = useState(false);
    const [validated, setValidated] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    useEffect(() => {
        if (isAgreementSigned && name.length > 0
            && email.length > 0
            && message.length > 0
            && !isSubmitted
            && String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ))
        {
            setIsReadyForSubmit(true);
        } else {
            setIsReadyForSubmit(false);
        }
    }, [name, email, message, isAgreementSigned, isSubmitted]);

    const handleSubmit = async (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        }
        setValidated(true);
        setIsSubmitted(true);
        e.preventDefault();
        let feedbackData;

        let url = 'feedback/';
        let data = {
            name: name,
            email: email.toLowerCase(),
            message: message,
            type: type
        }
        try{
            feedbackData = await postData(url, data);
            if (feedbackData.status === 201) {
                NotificationManager.success("Спасибо за ваше сообщение! Мы обязательно его рассмотрим!", "Успешно", 5000);
            } else if (feedbackData.status === 400 && feedbackData.data?.email !== undefined) {
                    NotificationManager.error("Пожалуйста, введите корректный email", "Ошибка", 5000);
                    // console.log(feedbackData.data, "feedbackData.data");

                }
                else {
                    NotificationManager.error("Произошла ошибка при отправке сообщения. Попробуйте позже", "Ошибка", 5000);
                }

        } catch (err) {
            NotificationManager.error("Произошла ошибка при отправке сообщения. Попробуйте позже", "Ошибка", 5000);

        }


    }
    return (

    <form onSubmit={handleSubmit} method="POST"
          validated={validated.toString()}
          id={id}
          className="feedback-module__form-holder__form">
            <p className={"form-holder__form__input-holder"}>
            <label htmlFor={"name"}>Имя</label>
            <input id={"name"}
                   type="text"
                   name={"name"}
                   placeholder="Ваше имя..."
                   value={name}
                   required
                   onChange={(e) => {
                       setName(e.target.value)
                       setIsSubmitted(false);
                   }
            }
            />
            </p>
            <p className={"form-holder__form__input-holder"}>
            <label htmlFor={"email"}>Email</label>

            <input id={"email"} type="email" placeholder="Ваш email..."
                   value={email}
                   name={"email"}
                   pattern={"[a-zA-Z0-9\\._%\\+\\-]+@[a-z0-9\\.\\-]+\\.[a-z]{2,}"}
                   required
                   maxLength="64"
                   onChange={(e) =>
                   {
                       setEmail(e.target.value)
                       setIsSubmitted(false);
                   }
            }
            />
                </p>
            <p className={"form-holder__form__input-holder"}>
            <label htmlFor={"message"}>Сообщение</label>
            <textarea id={"message"} placeholder="Ваше сообщение..."
                      value={message} rows={5} cols={15}
                      name={"message"}
                        required
                      onChange={(e) => {
                          setMessage(e.target.value)
                            setIsSubmitted(false);
                      }
            }/>
            </p>
            <p className={"form-holder__form__input-holder"}>
            <label htmlFor={"is_agreement_signed"}>
                Я согласен с условиями обработки
                персональных данных</label>
            <input type="checkbox"  id={"is_agreement_signed"}
                     name={"is_agreement_signed"}

                   onChange={(e) => {
                        setIsAgreementSigned(e.target.checked);
                        // setIsSubmitted(false);
                   }
            }

            />
            </p>

            <p className={"form-holder__form__input-holder"}>
                <button type={"submit"} className="button blue" disabled={!isReadyForSubmit}>
                    Отправить</button>
            </p>
            </form>
            );
        }

export default FeedbackForm;