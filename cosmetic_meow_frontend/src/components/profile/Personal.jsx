import React, {useEffect, useState} from "react";

import {isAuth, logout} from "../../hooks/user.actions";
import {Link} from "react-router-dom";
import fetchData from "../../requests/fetchData";
import axiosService from "../../requests/axiosService";
const Message = process.env.PUBLIC_URL + "/img/footer/Message.svg";
const Phone = process.env.PUBLIC_URL + "/img/footer/Phone.svg";
// const Calendar = process.env.PUBLIC_URL + "/img/footer/Calendar.svg";

function Personal() {
    console.log(isAuth());
    const [userData, setUserData] = useState({});
    useEffect(() => {
        const fetchUser = async () => {
            const response = await axiosService.get('/auth/update/');
            if (response.data) {
                setUserData(response.data);
            }
        }
        fetchUser();
    }, []);

    return (
        <div className="container mt-5 mb-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <h1 className="card-title">Профиль</h1>
                            <Link to={'edit'} className="btn btn-primary">Редактировать</Link>
                        </div>
                        <div className="card-body">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Имя: {userData?.first_name}</li>
                                <li className="list-group-item">Фамилия: {userData?.last_name}</li>
                                <li className="list-group-item">Почта: {userData?.email}</li>
                                <li className="list-group-item">Телефон: {userData?.phone_number}</li>
                                <li className="list-group-item">Дата рождения: {userData?.date_of_birth}</li>

                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default Personal;