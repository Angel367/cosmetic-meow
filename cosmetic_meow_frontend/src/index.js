import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/BaseStyles/BaseStyles.css';
import './styles/BaseStyles/BlueButtonStyles.css';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import reportWebVitals from './reportWebVitals';
import MainPage from "./MainPage";
import ErrorPage from "./ErrorPage";
import DevelopmentPage from "./DevelopmentPage";
import LineProductPage from "./LineProductPage";
import LinePage from "./LinePage";



const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "/development",
        element: <DevelopmentPage/>,
        errorElement: <ErrorPage/>,
    },

    {
        path: "/line",
        element: <LinePage/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "/line/:id",
        element: <LineProductPage/>,
        errorElement: <ErrorPage/>,
    },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
