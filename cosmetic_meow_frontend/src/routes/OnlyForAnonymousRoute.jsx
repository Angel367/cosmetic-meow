import React from "react";
import {Navigate} from "react-router-dom";
import {isAuth} from "../hooks/user.actions";

function OnlyForAnonymousRoute({ children}) {
    return isAuth() ? <Navigate to="/" replace={true} /> : <>{children}</>;
}
export default OnlyForAnonymousRoute;