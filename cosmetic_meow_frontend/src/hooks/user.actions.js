import {useNavigate} from "react-router-dom";


function getUser() {
 const auth =
 JSON.parse(localStorage.getItem("auth"));
 return auth.user;
}

// Get the access token
function getAccessToken() {
 const auth =
 JSON.parse(localStorage.getItem("auth"));
 return auth.access;
}
// Get the refresh token
function getRefreshToken() {
 const auth =
 JSON.parse(localStorage.getItem("auth"));
 return auth.refresh;
}
// Set the access, token and user property
function setUserData(data) {
 localStorage.setItem(
 "auth",
 JSON.stringify({
 access: data.access,
 refresh: data.refresh,
 user: data.user,
 })
 );
}
 // Logout the user
 function logout() {
     localStorage.removeItem("auth");
 }


 export { getUser, getAccessToken, getRefreshToken, setUserData, logout};