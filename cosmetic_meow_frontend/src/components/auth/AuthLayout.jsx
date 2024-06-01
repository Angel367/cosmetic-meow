

import React, { useEffect } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from "../base/Layout"; // Подключаем стили Bootstrap



function AuthLayout({ children, title, scrollX = 0, scrollY = 0 }) {
    useEffect(() => {
        if (title !== undefined) {
            document.title = title;
        }
        window.scrollTo(scrollX, scrollY);
    }, [title, scrollX, scrollY]); // Указываем зависимости для useEffect

    return (
        <Layout>
                <div children={"d-flex align-items-center justify-content-center flex-column align-self-center"}>

                {children}
                </div>
        </Layout>
    );
}

export default AuthLayout;
