import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/BaseStyles/BaseStyles.css';
import './styles/BaseStyles/ButtonStyles.css';
import './styles/BaseStyles/SmallCardStyles.css';
import './styles/FeedbackModule.css';
import './styles/LineModule.css';
import './styles/ProductModule.css';
import './styles/MainModule.css';
import './styles/VerifyProductModule.css';
import './styles/ShopModule.css';
import './styles/CartModule.css';
import {
    createBrowserRouter, Navigate, Outlet,
    RouterProvider,
} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import ErrorLayout from "./components/error/ErrorLayout";
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
import Contacts from "./components/feedback/Contacts";
import OnlyForAuthenticatedRoute from "./routes/OnlyForAuthenticatedRoute";
import AuthLayout from "./components/auth/AuthLayout";
import Registration from "./components/auth/Registration";
import Login from "./components/auth/Login";
import Orders from "./components/order/Orders";
import Order from "./components/order/Order";
import LayoutLanding from "./components/base/LayoutLanding";
import VerificationProduct from "./components/product/VerificationProduct";



const router = createBrowserRouter([
    // ************landing pages*************
    {
        index: true,
        element: <LayoutLanding children={<Main/>} title={"Главная"}/>,
        errorElement: <ErrorLayout/>,
    },
    {
        path: "/verify_product",
        element: <Navigate to={"/verify_product/code"}/>,
        errorElement: <ErrorLayout/>

    },
    {
        path: "/verify_product/:code",
        element:  <LayoutLanding children={<VerificationProduct/>} title={"Верификация продукта"}/>,
        errorElement: <ErrorLayout/>,
    },
    {

        path: "/development",
        element: <LayoutLanding children={<Dev/>} title={"Разработка"}/>,
        errorElement: <ErrorLayout/>,
    },
     {
        path: "/contacts",
        element: <LayoutLanding children={<Contacts/>} title={"Контакты"}/>,
        errorElement: <ErrorLayout/>,
    },
    // {
    //     path: "/products/:id_product",
    //     element: <LayoutLanding children={<LineProduct/>} title={"Продукт"}/>,
    //     errorElement: <ErrorLayout/>,
    //
    // },
    {

        path: "/lines/",
        element: <Outlet/>,
        errorElement: <ErrorLayout/>,
        children: [
            {
                index: true,
                element: <Navigate to={"/lines/11"}/>,
                errorElement: <ErrorLayout/>,

            },
            {
                path: ":id_line",
                children: [
                    {
                        index: true,
                        element: <LayoutLanding children={<Line/>} title={"Линейка"}/>,
                        errorElement: <ErrorLayout/>,
                    },
                    {
                        path: "products/:id_product",
                        element: <LayoutLanding children={<LineProduct/>} title={"Продукт"}/>,
                        errorElement: <ErrorLayout/>,
                    },
                ],
            }


        ],
    },

    // ************shop pages***********


    {
        path: "/shop",
        element: <Outlet/>,
        errorElement: <ErrorLayout/>,
        children: [
            {
                index: true,
                element: <LayoutLanding children={<Shop/>} title={"Каталог"}/>,
                errorElement: <ErrorLayout/>,
            },
            {
                path: "product/:id_product",
                element: <LayoutLanding children={<LineProduct/>} title={"Товар"}/>,
                errorElement: <ErrorLayout/>,
            },
        ],
    },

    // ************profile pages***********
    {
        path: "/profile",
        element: <OnlyForAuthenticatedRoute>
            <Outlet/>
        </OnlyForAuthenticatedRoute>,
        errorElement: <ErrorLayout/>,
        children: [
            {
                index: true,
                element: <Layout
                    children={<ProfileLayout content={<ProfileContent/>}/>}
                    title={"Профиль"}/>,

                errorElement: <ErrorLayout/>,

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

                        errorElement: <ErrorLayout/>,
                    },
                    {
                        path: "edit/",
                        element: <Layout children=
                                             {
                            <ProfileLayout content={<PersonalEdit/>}/>
                        }
                                         title={"Редактирование"}/>,
                        errorElement: <ErrorLayout/>,
                    },
                ],
                errorElement: <ErrorLayout/>,
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
                    errorElement: <ErrorLayout/>,
                },
                {
                    path: "order/:id_order",
                    element: <Layout children=
                                         {
                            <ProfileLayout content={<Order/>}/>
                        }
                                     title={"Заказ"}/>,
                    errorElement: <ErrorLayout/>,
                },
               ],
                errorElement: <ErrorLayout/>,
            },

        ],
    },
    {
        path: "/cart",
        element: <LayoutLanding children={<Cart/>} title={"Корзина"}/>,
        errorElement: <ErrorLayout/>,
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
    <Provider
        store={store}>
            <RouterProvider router={router}/>
     </Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
