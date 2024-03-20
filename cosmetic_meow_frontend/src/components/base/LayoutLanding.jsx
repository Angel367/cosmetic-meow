import React, {useEffect} from "react";
import HeaderLanding from "./HeaderLanding";
import FooterLanding from "./FooterLanding";
import NotificationContainer from "react-notifications/lib/NotificationContainer";
import {useLocation} from "react-router-dom";


function LayoutLanding({children, title}) {
    const { pathname, hash } = useLocation();
    useEffect(() => {
        if (title !== undefined) {
             document.title = title;
        }
        if (hash === '')
            window.scrollTo(0, 0);
        else {
            const element = document.getElementById(hash.slice(1));
            if (element) {
                element.scrollIntoView({behavior: "smooth", block: "start"});
            }
        }

    });
    let className = 'not-main-page';
    if (title === 'Главная') {
        className = 'main-page';
    }
    return (
        <div className={className}>
            <HeaderLanding/>
            <div>
                <NotificationContainer/>
            </div>
            {children}
            <FooterLanding/>
        </div>
    );
}

export default LayoutLanding;