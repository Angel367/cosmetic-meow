import Cookies from "js-cookie";

function isAuth() {
 return getAccessToken() !== null;
}

// Get the access token
function getAccessToken() {
 return Cookies.get("access");
}
// Get the refresh token
function getRefreshToken() {
 return Cookies.get("refresh");
}
// Set the access, token and user property
function setUserData(data) {
 Cookies.set("access", data.access);
 Cookies.set("refresh", data.refresh);

}
 // Logout the user
 function logout() {
    Cookies.remove("access");
    Cookies.remove("refresh");

 }
 export {isAuth, getAccessToken, getRefreshToken, setUserData, logout};