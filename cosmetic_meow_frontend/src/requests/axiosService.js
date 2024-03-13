import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import {getAccessToken, getRefreshToken} from "../hooks/user.actions";
import getBaseUrl from "./baseUrl";

import Cookies from 'js-cookie';

const axiosService = axios.create({
 baseURL: getBaseUrl()+"auth/token/verify/",
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
 const { refresh } = getRefreshToken();
 const {access} = getAccessToken();
 return axios.post("token/refresh/", null, {
  baseURL: getBaseUrl()+"auth/",
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
    // localStorage.removeItem("auth");
      Cookies.remove('access');
      Cookies.remove('refresh');
 });};
createAuthRefreshInterceptor(axiosService,  refreshAuthLogic);
export function fetcherUser() {
 return axiosService.get(getBaseUrl() + '/auth/update/').then((res) => res.data);
}
export async function updateUser(data) {
 return await axiosService.put(getBaseUrl() + '/auth/update/', data).then((res) => res.data);
}
export default axiosService;
