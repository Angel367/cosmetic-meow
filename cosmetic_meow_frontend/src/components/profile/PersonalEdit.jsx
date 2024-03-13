import React, {useState} from "react";
import {fetcherUser, updateUser} from "../../requests/axios";


function PersonalEdit() {
    let user = fetcherUser();
    if (!user)
        user = {
        first_name: "Имя",
        middle_name: "Отчество",
        last_name: "Фамилия",
        phone_number: "Телефон",
        email: "Почта",
        birth_date: "Дата рождения",

    }
    const [form, setForm] = useState({ first_name: user.first_name, middle_name: user.middle_name,
        last_name: user.last_name, phone_number: user.phone_number, email: user.email,
        birth_date: user.birth_date, password: '', password_confirmation: '', password_old: ''});

    return (
        <form className="profile">
            <div className="profile__title">Личные данные</div>
            <div className="profile__input">
                <label htmlFor="first_name">Имя</label>
                <input type="text" id="first_name" name="first_name"
                       value={form.first_name}
                       onChange={e => setForm({...form, first_name: e.target.value})}/>
            </div>
            <div className="profile__input">
                <label htmlFor="middle_name">Отчество</label>
                <input type="text" id="middle_name" name="middle_name"
                       value={form.middle_name}
                       onChange={e => setForm({...form, middle_name: e.target.value})}/>
            </div>
            <div className="profile__input">
                <label htmlFor="last_name">Фамилия</label>
                <input type="text" id="last_name" name="last_name"
                       value={form.last_name}
                       onChange={e => setForm({...form, last_name: e.target.value})}/>
            </div>
            <div className="profile__input">
                <label htmlFor="phone_number">Телефон</label>
                <input type="tel" id="phone_number" name="phone_number"
                       value={form.phone_number}
                       onChange={e => setForm({...form, phone_number: e.target.value})}/>
            </div>
            <div className="profile__input">
                <label htmlFor="email">Почта</label>
                <input type="text" id="email" name="email"
                       value={form.email}
                       onChange={e => setForm({...form, email: e.target.value})}/>
            </div>
            <div className="profile__input">
                <label htmlFor="birth_date">Дата рождения</label>
                <input type="text" id="birth_date" name="birth_date"
                       value={form.birth_date}
                       onChange={e => setForm({...form, birth_date: e.target.value})}/>
            </div>
            <div className="profile__input">
                <label htmlFor="password_old">Старый пароль</label>
                <input type="password" id="password_old" name="password_old"
                       value={form.password_old}
                       onChange={e => setForm({...form, password_old: e.target.value})}/>
            </div>
            <div className="profile__input">
                <label htmlFor="password_new">Новый пароль</label>
                <input type="password" id="password_new" name="password_new"
                       value={form.password_new}
                       onChange={e => setForm({...form, password_new: e.target.value})}/>
            </div>
            <div className="profile__input">
                <label htmlFor="password_confirmation">Подтверждение пароля</label>
                <input type="password" id="password_confirmation" name="password_confirmation"
                       value={form.password_confirmation}
                       onChange={e => setForm({...form, password_confirmation: e.target.value})}/>
            </div>
            <div className="profile__buttons">
                <button type="button" onClick={() => updateUser(form)}>Сохранить</button>
            </div>
        </form>

    );

}
export default PersonalEdit;