import React, {useEffect} from "react";
import Header from "./Header";

import NotificationContainer from "react-notifications/lib/NotificationContainer";

import createSession from "../../requests/createSession";
import {Navigate, useNavigate} from "react-router-dom";
import Footer from "./Footer";

function Layout({children, title, scrollX=0, scrollY=0}) {

    useEffect(() => {
        if (title !== undefined) {
             document.title = title;
        }
        window.scrollTo(scrollX, scrollY);
    });
    createSession();
    return (
        <Navigate to={"/"} replace={true}/>
        // <div>
        //     <Header/>
        //     <div>
        //         <NotificationContainer/>
        //     </div>
        //     {children}
        //     <Footer/>
        // </div>
    );
}

export default Layout;