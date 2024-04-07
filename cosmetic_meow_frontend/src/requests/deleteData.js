import axios from "axios";

import getBaseUrl from "./baseUrl";

async function deleteData(urlPart, params = null) {
    let url = getBaseUrl() + urlPart;
    let variable;
    await axios.delete(url,
            {
                params: params,
                withCredentials: true,
            }
            )
            .then((response) => {
                variable = response;
            })
            .catch((error) => {
                // console.log(error.response.data, "1error1");
                variable = error
                console.log(variable, "error-response")
            });
    return variable;
}
export default deleteData;