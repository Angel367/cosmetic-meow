import axios from "axios";

import getBaseUrl from "./baseUrl";

async function fetchData(urlPart, params = null) {
    let url = getBaseUrl() + urlPart;
    let variable;
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
                console.log(error);
            });
    return variable;
}
export default fetchData;