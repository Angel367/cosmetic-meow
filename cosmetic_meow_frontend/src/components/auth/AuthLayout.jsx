import React, {useEffect} from "react";

import Cookies from "js-cookie";
import NotificationContainer from "react-notifications/lib/NotificationContainer";

import axios from "axios";

function AuthLayout({children, title, scrollX=0, scrollY=0}) {

    useEffect(() => {
        if (title !== undefined) {
             document.title = title;
        }
        window.scrollTo(scrollX, scrollY);
    });

    // if (Cookies.getSession() === null) {
    //         axios.get('http://localhost:8000/session/')
    //             .then((response) => {
    //                 return response.status;
    //             })
    //             .catch((error) => {
    //                 console.log(error);
    //             });
    // }
    return (
        <div>
            <div>
                <NotificationContainer/>
            </div>
            {children}
        </div>
    );
}

export default AuthLayout;