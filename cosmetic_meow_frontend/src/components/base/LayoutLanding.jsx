import React, {useEffect} from "react";
import HeaderLanding from "./HeaderLanding";
import FooterLanding from "./FooterLanding";
import NotificationContainer from "react-notifications/lib/NotificationContainer";


function LayoutLanding({children, title, scrollX=0, scrollY=0}) {

    useEffect(() => {
        if (title !== undefined) {
             document.title = title;
        }
        // if (scrollX === 0 && scrollY === 0)
        //     window.scrollTo(scrollX, scrollY);
    });
    let className = 'not-main-page';
    if (title === 'Главная') {
        className = 'main-page';
    }
    return (
        <>
            {/*<HeaderLanding/>*/}
            <div>
                <NotificationContainer/>
            </div>
            {children}
            {/*<FooterLanding/>*/}
        </>
    );
}

export default LayoutLanding;