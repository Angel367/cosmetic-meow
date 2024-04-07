import React, {useEffect} from "react";
import HeaderLanding from "./Header";
import FooterLanding from "./FooterLanding";
import NotificationContainer from "react-notifications/lib/NotificationContainer";
import {useLocation} from "react-router-dom";
import createSession from "../../requests/createSession";


function LayoutLanding({children, title}) {
    const {hash } = useLocation();
    createSession();
    useEffect(() => {
        if (title !== undefined) {
             document.title = title;
        }
        if (hash === '') {
            window.scrollTo(0, 0);
        }
        else {
            // todo
            let el = document.getElementById(hash.slice(1));
            console.log(el);
            if (el) {
                el.scrollIntoView({behavior: "smooth", block: "start"});
            } else {
                window.scrollTo(0, 0);
            }

        }
    }, [title, hash]);
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