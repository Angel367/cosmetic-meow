import React, {useEffect} from "react";

import Cookies from "js-cookie";
import NotificationContainer from "react-notifications/lib/NotificationContainer";

import axios from "axios";
import createSession from "../../requests/createSession";
import {Navigate, useNavigate} from "react-router-dom";

function AuthLayout({children, title, scrollX=0, scrollY=0}) {

    useEffect(() => {
        if (title !== undefined) {
             document.title = title;
        }
        window.scrollTo(scrollX, scrollY);
    });
    // createSession();
    return (
        // <Navigate to={"/"} replace={true}/>
        <div>
            <div>
                <NotificationContainer/>
            </div>
            {children}
        </div>
    );
}

export default AuthLayout;