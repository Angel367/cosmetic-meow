import React from "react";
import { Container } from "react-bootstrap"; // Импортируем компонент контейнера из Bootstrap
import { NotificationContainer } from "react-notifications"; // Импортируем компонент уведомлений
import Header from "./Header"; // Импортируем компонент шапки
import Footer from "./Footer"; // Импортируем компонент подвала

function Layout({ children, title, scrollX = 0, scrollY = 0 }) {
    // createSession(); // Создаем сессию

    return (
        <div className={"d-flex flex-column min-vh-100"}>
            <Header /> {/* Вставляем шапку */}
            <Container
                className={"flex-grow-1"}

            >
                <div>
                    <NotificationContainer /> {/* Контейнер для уведомлений */}
                </div>
                {children}
            </Container>
            <Footer /> {/* Вставляем подвал */}
        </div>
    );
}

export default Layout;
