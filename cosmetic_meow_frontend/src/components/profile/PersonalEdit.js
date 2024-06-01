import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import axiosService from "../../requests/axiosService";
import {NotificationManager} from "react-notifications";
import fetchData from "../../requests/fetchData";


function PersonalEdit() {
    const [userData, setUserData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        date_of_birth: '',

    });
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchUser() {
            const response = await axiosService.get('/auth/update/');
            if (response.status !== 200) {
                NotificationManager.error('Ошибка при загрузке профиля');
                // logout();
            }
            if (response.data) {
                setUserData({
                    first_name: response.data.first_name || '',
                    last_name: response.data.last_name || '',
                    email: response.data.email || '',
                    phone_number: response.data.phone_number || '',
                    date_of_birth: response.data.date_of_birth || '',

                });
            }
        }
        fetchUser();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (userData.date_of_birth === '') {
                userData.date_of_birth = null;
            }
            const updateRes = await axiosService.put('auth/update/', userData);
            if (updateRes.status !== 200) {
                NotificationManager.error('Ошибка при обновлении профиля');
                return;
            }
            NotificationManager.success('Профиль успешно обновлен');
            navigate('/profile'); // Redirect to profile page after successful update
        } catch (error) {
            console.error(error);
            NotificationManager.error('Ошибка при обновлении профиля');
        }
    };

    return (
        <div className="container mt-5 mb-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">
                            <h1 className="card-title">Редактировать Профиль</h1>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="first_name" className="form-label">Имя</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="first_name"
                                        name="first_name"
                                        value={userData.first_name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="last_name" className="form-label">Фамилия</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="last_name"
                                        name="last_name"
                                        value={userData.last_name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Почта</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={userData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="phone_number" className="form-label">Телефон</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="phone_number"
                                        name="phone_number"
                                        value={userData.phone_number}
                                        disabled={true}

                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="date_of_birth" className="form-label">Дата рождения</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="date_of_birth"
                                        name="date_of_birth"
                                        value={userData.date_of_birth}
                                        onChange={handleChange}
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary">Сохранить</button>
                                <Link to="/profile" className="btn btn-secondary ms-2">Отмена</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PersonalEdit;

