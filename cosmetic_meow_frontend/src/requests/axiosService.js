import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import {getAccessToken, getRefreshToken, logout} from "../hooks/user.actions";
import getBaseUrl from "./baseUrl";

import Cookies from 'js-cookie';

const axiosService = axios.create({
 baseURL: getBaseUrl(),
    withCredentials: true,
 headers: {
 "Content-Type": "application/json",

 },
});
axiosService.interceptors.request.use(async (config) => {

 config.headers.Authorization = `Bearer ${getAccessToken()}`;
 return config;
});

axiosService.interceptors.response.use(
 (res) => Promise.resolve(res),
 (err) => Promise.reject(err),
);

const refreshAuthLogic = async (failedRequest) => {
 const  refreshRes  = getRefreshToken();
 const accessRes = getAccessToken();
 if (refreshRes && accessRes){
    const {refresh} = refreshRes;
    const {access} = accessRes;

 return axios.post("token/refresh/",
     null,
     {
         baseURL: getBaseUrl()+"auth/",
         withCredentials: true,
         headers: {

  Authorization: `Bearer ${access}`,
  },body: {
    refresh: refresh
    }
    ,})
 .then((resp) => {
    const { access, refresh } = resp.data;
    failedRequest.response.config.headers["Authorization"] = "Bearer " + access;
    Cookies.set('access', access, { expires: 1, secure: true });
    Cookies.set('refresh', refresh, { expires: 7, secure: true });

 // localStorage.setItem("auth", JSON.stringify({access, refresh }));
 })
 .catch(() => {
    logout();

 });}
    else {
        logout();
    }
}
;
createAuthRefreshInterceptor(axiosService,  refreshAuthLogic);

export default axiosService;
