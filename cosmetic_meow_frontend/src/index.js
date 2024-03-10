import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/BaseStyles/BaseStyles.css';
import './styles/BaseStyles/BlueButtonStyles.css';
import {
    createBrowserRouter, Outlet,
    RouterProvider,
} from "react-router-dom";

import reportWebVitals from './reportWebVitals';
import MainPage from "./page/MainPage";
import ErrorPage from "./page/ErrorPage";
import DevelopmentPage from "./page/DevelopmentPage";
import LineProductPage from "./page/LineProductPage";
import LinePage from "./page/LinePage";
import Protected from "./components/baseComponents/Protected";
import FeedbackPage from "./page/FeedbackPage";



const router = createBrowserRouter([
    {
        index: true,
        element: <MainPage/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "/development",
        element: <DevelopmentPage/>,
        errorElement: <ErrorPage/>,
    },
     {
        path: "/feedback",
        element: <FeedbackPage/>,
        errorElement: <ErrorPage/>,
    },

    {

        path: "/lines/:id_line",
        element: <Outlet/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                index: true,
                element: <LinePage/>,
                errorElement: <ErrorPage/>,

            },

            {

            path: "products/:id_product",
            element: <LineProductPage/>,
            errorElement: <ErrorPage/>,
        },

        ],
    },
    // {
    //     path: "/login",
    //     element: <LoginPage/>,
    // },
    // {
    //     path: "/register",
    //     element: <RegisterPage/>,
    // },
    // {
    //     path: "/profile",
    //     element: <Protected>
    //         <ProfilePage/>
    //     </Protected>,
    // },
    // {
    //     path: "/cart",
    //     element: <Protected><CartPage/></Protected>,
    // },

    // {
    //     path: "*",
    //     element: <ErrorPage/>,
    // },


]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router}>

      </RouterProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
