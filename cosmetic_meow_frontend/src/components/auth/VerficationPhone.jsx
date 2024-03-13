import React, {useState} from "react";

import postData from "../../requests/postData";
import {NotificationManager} from "react-notifications";

function VerificationPhone({phone_number}) {
    const [isVerified, setVerification] = useState(false);
    const [form, setForm] = useState({});
    const [isSend, setSend] = useState(false);
    // document.getElementById("submitAuth").disabled = true;

    const onClick= async () => {
        if (! isSend) {
            await onClickSend();
        } else if (! isVerified) {

            await onClickVerification();
        } else {
            NotificationManager.error("Телефон уже подтвержден", "Ошибка верификации", 5000);
        }

    }
    const onClickSend = async () => {
        const sendCode = await postData('phone/send', {phone_number: phone_number});
        // console.log(sendCode, 'sendCode');

        if (sendCode.status === 200) {
            setSend(true);
            document.getElementById("code").hidden = false;
            document.getElementById("codeLabel").hidden = false;
            NotificationManager.success("Код отправлен", "Успешная отправка", 5000);

        } else {
            NotificationManager.error("Произошла ошибка. Попробуйте позже", "Ошибка отправки", 5000);
        }

    }
    const onClickVerification = async () => {
        const code = form.code;
        const verification_res = await postData('phone/verify',
            {phone_number: phone_number, code: code});
        if (verification_res.status === 200) {
            setVerification(true);

            document.getElementById("code").hidden = true;
            document.getElementById("codeLabel").hidden = true;

            NotificationManager.success("Телефон подтвержден", "Успешная отправка", 5000);
            document.getElementById("submitAuth").disabled = false;
        } else {
            NotificationManager.error("Неверный код", "Ошибка верификации", 5000);
        }


    }
    let textButton = "Получить код"
    if (isSend)
        textButton = "Подтвердить"
    if (isVerified)
        textButton = "Подтверждено"


        return (
            <p>
                <label id={"codeLabel"}
                       htmlFor={"code"} hidden={true} >Код из смс</label>
                <input id={"code"} type="text" placeholder="Код из смс..." hidden={true}
                       onChange={(e) => setForm({...form, code: e.target.value})}/>
                <a onClick={onClick}>{textButton}</a>
            </p>
        );


}
export default VerificationPhone;