import axios from "axios";

import getBaseUrl from "./baseUrl";

async function putData(urlPart, params = null) {
    let url = getBaseUrl() + urlPart;
    let variable;
    await axios.put(url,
            params,
        {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            }
        }
            )
            .then((response) => {
                variable = response;
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
export default putData;