import React, {useState} from "react";

import {NotificationManager} from "react-notifications";
import 'react-notifications/lib/notifications.css';
import postData from "../../requests/postData";




function FeedbackForm({type="other"}) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isAgreementSigned, setIsAgreementSigned] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let feedbackData;

        let url = 'feedback/';
        let data = {
            name: name,
            email: email,
            message: message,
            type: type
        }
        try{
            feedbackData = await postData(url, data);
            if (feedbackData.status === 201) {
                NotificationManager.success("Спасибо за ваше сообщение! Мы обязательно его рассмотрим!", "Сообщение отправлено", 5000);
            } else {
                NotificationManager.error("Произошла ошибка при отправке сообщения. Попробуйте позже", "Ошибка отправки сообщения", 5000);
            }
        } catch (err) {
            NotificationManager.error("Произошла ошибка при отправке сообщения. Попробуйте позже", "Ошибка отправки сообщения", 5000);

        }


    }
    return (

    <form onSubmit={handleSubmit} method="POST" className="full_type">
            <p>
            <label htmlFor={"name"}>Имя</label>
            <input id={"name"} type="text"
                     name={"name"}
                   placeholder="Ваше имя..." value={name}
                   required={true}
                   onChange={(e) => setName(e.target.value)}/>
            </p>
            <p>
            <label htmlFor={"email"}>Email</label>
            <input id={"email"} type="email" placeholder="Ваш email..." value={email}
                   name={"email"}
                   required={true}

                   onChange={(e) => setEmail(e.target.value)}/>
                </p>
            <p>
            <label htmlFor={"message"}>Сообщение</label>
            <textarea id={"message"} placeholder="Ваше сообщение..."
                      value={message} rows={5} cols={3}
                      name={"message"}
                        required={true}
                      onChange={(e) => setMessage(e.target.value)}/>
            </p>
            <p>
            <label htmlFor={"is_agreement_signed"}>
                Я согласен с условиями обработки
                персональных данных</label>
            <input type="checkbox"  id={"is_agreement_signed"}
                     name={"is_agreement_signed"}

                   onChange={(e) => {
                        setIsAgreementSigned(e.target.checked);
                   }
            }

            />
            </p>

            <p>
                <button type={"submit"} className="button blue" disabled={!isAgreementSigned}>Отправить</button>
            </p>
            </form>
            );
        }

export default FeedbackForm;