import React, {useEffect} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Cookies from "js-cookie";
import NotificationContainer from "react-notifications/lib/NotificationContainer";

import createSession from "../../requests/createSession";

function Layout({children, title, scrollX=0, scrollY=0}) {
    useEffect(() => {
        if (title !== undefined) {
             document.title = title;
        }
        window.scrollTo(scrollX, scrollY);
    });

    createSession();
    return (
        <div>
            <Header/>
            <div>
                <NotificationContainer/>
            </div>
            {children}
            <Footer/>
        </div>
    );
}

export default Layout;