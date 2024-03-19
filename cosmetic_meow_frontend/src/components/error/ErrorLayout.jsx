import {Link, useRouteError} from "react-router-dom";
import React from "react";
import HeaderLanding from "../base/HeaderLanding";
import FooterLanding from "../base/FooterLanding";


 function ErrorLayout() {
    const error = useRouteError();
    console.error(error);
    return (
        <div className={"error-layout"}>
        <HeaderLanding/>
        <main id="error-page">

                <h1>Ой, что-то пошло не так</h1>
                <p>
                    К сожалению, мы не нашли то, что вы искали.
                </p>
                {/*<p>*/}
                {/*    <i>{error.statusText || error.message}</i>*/}
                {/*</p>*/}
                <Link to={"/"}>Вернуться на главную</Link>

        </main>
     <FooterLanding/>
</div>
    );
}
export default ErrorLayout;