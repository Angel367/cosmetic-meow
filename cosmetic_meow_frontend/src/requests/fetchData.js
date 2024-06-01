// import axios from "axios";

import getBaseUrl from "./baseUrl";
import {isAuth} from "../hooks/user.actions";
import axiosService from "./axiosService";
import axios from "axios";

async function fetchData(urlPart, params = null) {
    let url = getBaseUrl() + urlPart;
    let variable;
    if (isAuth())
        await axiosService.get(url,
                {
                    params: params,
                    withCredentials: true,
                }
                )
                .then((response) => {
                    variable = response.data;
                    console.log(response.status,
                        "response_status",
                        response.data,
                        "response");
                })
                .catch((error) => {
                    // console.log(error.response.data, "1error1");
                    variable = error
                    console.log(variable, "error-response")
                });
    else

    await axios.get(url,
            {
                params: params,
                withCredentials: true,
            }
            )
            .then((response) => {
                variable = response.data;
                console.log(response.status,
                    "response_status",
                    response.data,
                    "response");
            })
            .catch((error) => {
                // console.log(error.response.data, "1error1");
                variable = error
                console.log(variable, "error-response")
            });
    return variable;
}
export default fetchData;