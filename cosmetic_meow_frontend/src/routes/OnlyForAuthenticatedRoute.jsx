import React from "react";
import {Navigate} from "react-router-dom";
import {isAuth} from "../hooks/user.actions";

function OnlyForAuthenticatedRoute({ children}) {
  return isAuth() ? <>{children}</> : <Navigate to="/login/" replace={true} />;

}
export default OnlyForAuthenticatedRoute;