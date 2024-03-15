import Cookies from "js-cookie";

function isAuth() {
 return getAccessToken() !== null && getAccessToken() !== undefined;
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
 Cookies.set("access", data.access, { expires: 1, secure: true });
 Cookies.set("refresh", data.refresh, { expires: 7, secure: true });

}
 // Logout the user
 function logout() {
    Cookies.remove("access");
    Cookies.remove("refresh");
    window.location.reload();
 }
 export {isAuth, getAccessToken, getRefreshToken, setUserData, logout};