import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import {getAccessToken, getRefreshToken,  useLogout} from "../hooks/user.actions";
import getBaseUrl from "./baseUrl";



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
 return axios.post("token/refresh/", null, {
  baseURL: getBaseUrl()+"auth/",
  headers: {
  Authorization: `Bearer ${refresh}`,
  },body: {
    refresh: refresh

    }
    ,})
 .then((resp) => {
 const { access, refresh } = resp.data;
 failedRequest.response.config.headers["Authorization"] = "Bearer " + access;
 localStorage.setItem("auth", JSON.stringify({access, refresh }));
 })
 .catch(() => {
    localStorage.removeItem("auth");
 });};
createAuthRefreshInterceptor(axiosService,  refreshAuthLogic);
export function fetcherUser(url) {
 return axiosService.get(getBaseUrl()+ url).then((res) => res.data);
}
export async function updateUser(url, data) {
 return await axiosService.put(getBaseUrl() + url, data).then((res) => res.data);
}
export default axiosService;
