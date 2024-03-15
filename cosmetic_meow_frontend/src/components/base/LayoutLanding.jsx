import React, {useEffect} from "react";
import HeaderLanding from "./HeaderLanding";
import FooterLanding from "./FooterLanding";
import NotificationContainer from "react-notifications/lib/NotificationContainer";


function LayoutLanding({children, title, scrollX=0, scrollY=0}) {

    useEffect(() => {
        if (title !== undefined) {
             document.title = title;
        }
        if (scrollX === 0 && scrollY === 0)
            window.scrollTo(scrollX, scrollY);
    });
    // createSession();
    return (
        <div>
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