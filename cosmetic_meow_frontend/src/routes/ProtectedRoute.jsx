import React from "react";
import {Navigate} from "react-router-dom";

function ProtectedRoute({ children}) {
 const auth = JSON.parse(localStorage.getItem("auth"));
 return auth ? <>{children}</> : <Navigate to="/register/" replace={true} />;
}
export default ProtectedRoute;