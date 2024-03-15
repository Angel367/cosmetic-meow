import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/BaseStyles/BaseStyles.css';
import './styles/BaseStyles/ButtonStyles.css';
import './styles/FeedbackModule.css';
import './styles/LineModule.css';




import {
    createBrowserRouter, Outlet,
    RouterProvider,
} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import ErrorPage from "./components/error/ErrorPage";
import Cart from "./components/order/Cart";
import {Provider} from "react-redux";
import store from "./redux/store";
import Shop from "./components/shop/Shop";
import Main from "./components/main/Main";
import Line from "./components/line/Line";
import LineProduct from "./components/product/LineProduct";
import OnlyForAnonymousRoute from "./routes/OnlyForAnonymousRoute";
import ProfileLayout from "./components/profile/ProfileLayout";
import ProfileContent from "./components/profile/ProfileContent";
import PersonalEdit from "./components/profile/PersonalEdit";
import Personal from "./components/profile/Personal";
import Layout from "./components/base/Layout";
import Dev from "./components/feedback/Dev";
import Feedback from "./components/feedback/Feedback";
import OnlyForAuthenticatedRoute from "./routes/OnlyForAuthenticatedRoute";
import AuthLayout from "./components/auth/AuthLayout";
import Registration from "./components/auth/Login";
import Login from "./components/auth/Login";
import Orders from "./components/order/Orders";
import Order from "./components/order/Order";
import LayoutLanding from "./components/base/LayoutLanding";


const router = createBrowserRouter([
    // ************landing pages*************
    {
        index: true,
        element: <LayoutLanding children={<Main/>} title={"Главная"}/>,
        errorElement: <ErrorPage/>,
    },
    {

        path: "/development",
        element: <LayoutLanding children={<Dev/>} title={"Разработка"}/>,
        errorElement: <ErrorPage/>,
    },
     {
        path: "/feedback",
        element: <LayoutLanding children={<Feedback/>} title={"Обратная связь"}/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "products/:id_product",
        element: <LayoutLanding children={<LineProduct/>} title={"Продукт"}/>,
        errorElement: <ErrorPage/>,
    },
    {

        path: "/lines/:id_line",
        element: <Outlet/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                index: true,
                element: <LayoutLanding children={<Line/>} title={"Линия"}/>,
                errorElement: <ErrorPage/>,

            },

            {

            path: "products/:id_product",
            element: <LayoutLanding children={<LineProduct/>} title={"Продукт"}/>,
            errorElement: <ErrorPage/>,
        },

        ],
    },

    // ************shop pages***********


    {
        path: "/shop",
        element: <Outlet/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                index: true,
                element: <Layout children={<Shop/>} title={"Каталог"}/>,
                errorElement: <ErrorPage/>,
            },
            {
                path: "product/:id_product",
                element: <Layout children={<LineProduct/>} title={"Товар"}/>,
                errorElement: <ErrorPage/>,
            },
        ],
    },

    // ************profile pages***********
    {
        path: "/profile",
        element: <OnlyForAuthenticatedRoute>
            <Outlet/>
        </OnlyForAuthenticatedRoute>,
        errorElement: <ErrorPage/>,
        children: [
            {
                index: true,
                element: <Layout
                    children={<ProfileLayout content={<ProfileContent/>}/>}
                    title={"Профиль"}/>,

                errorElement: <ErrorPage/>,

            },
            {
                path: "personal/",
                element: <Outlet/>,
                children: [
                    {
                        index: true,
                        element: <Layout children=
                                             {
                            <ProfileLayout content={<Personal/>}/>
                        }
                                         title={"Личные данные"}/>,

                        errorElement: <ErrorPage/>,
                    },
                    {
                        path: "edit/",
                        element: <Layout children=
                                             {
                            <ProfileLayout content={<PersonalEdit/>}/>
                        }
                                         title={"Редактирование"}/>,
                        errorElement: <ErrorPage/>,
                    },
                ],
                errorElement: <ErrorPage/>,
            },

            {

                path: "orders/",
                element: <Outlet/>,
                children: [
                {
                    index: true,
                    element: <Layout children=
                                         {
                            <ProfileLayout content={<Orders/>}/>
                        }
                                     title={"Заказы"}/>,
                    errorElement: <ErrorPage/>,
                },
                {
                    path: "order/:id_order",
                    element: <Layout children=
                                         {
                            <ProfileLayout content={<Order/>}/>
                        }
                                     title={"Заказ"}/>,
                    errorElement: <ErrorPage/>,
                },
               ],
                errorElement: <ErrorPage/>,
            },

        ],
    },
    {
        path: "/cart",
        element: <Layout children={<Cart/>} title={"Корзина"}/>,
        errorElement: <ErrorPage/>,
    },
    // ************auth pages***********
    {
        path: "/register",
        element: <OnlyForAnonymousRoute>
                    <AuthLayout children={<Registration/>} title={"Регистрация"}/>
                </OnlyForAnonymousRoute>,
    },
    {
        path: "/login",
        element: <OnlyForAnonymousRoute>
                    <AuthLayout children={<Login/>} title={"Вход"}/>
                </OnlyForAnonymousRoute>,
    },

    ]
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
            <RouterProvider router={router}/>
    </Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
