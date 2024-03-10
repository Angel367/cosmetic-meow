import React, {useState} from "react";

function FeedbackForm({type="other"}) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isAgreementSigned, setIsAgreementSigned] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name, email, message, type);
    }
    return (
        <form onSubmit={handleSubmit} method="POST" className="full_type">
            <p>
            <label htmlFor={"name"}>Имя</label>
            <input id={"name"} type="text"
                     name={"name"}
                   placeholder="Ваше имя..." value={name} onChange={(e) => setName(e.target.value)}/>
            </p>
            <p>
            <label htmlFor={"email"}>Email</label>
            <input id={"email"} type="email" placeholder="Ваш email..." value={email}
                   name={"email"}
                   onChange={(e) => setEmail(e.target.value)}/>
                </p>
            <p>
            <label htmlFor={"message"}>Сообщение</label>
            <textarea id={"message"} placeholder="Ваше сообщение..."
                      value={message} rows={5} cols={3}
                      name={"message"}
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