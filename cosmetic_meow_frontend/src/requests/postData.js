import axios, {AxiosError} from "axios";
import getBaseUrl from "./baseUrl";
async function postData(urlPart, data) {
    let url = getBaseUrl() + urlPart;

    return await axios.post(url,
        data,
        {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            }
        }
    ).then((response) => {
            console.log(response, "response");
            return response;
        }
    ).catch((err) => {
        if (err instanceof AxiosError) {
                const errors = err.response.data
                console.log(errors, "error");
                return {
                    status: err.response.status,
                    data: errors
                }
        }
        else {
                console.log(err.message, "err message");
                return {
                    status: 500,
                    data: err.message
                }
            }
    })

}
export default postData;