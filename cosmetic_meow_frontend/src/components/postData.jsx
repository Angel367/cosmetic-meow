import axios, {AxiosError} from "axios";


async function postData(urlPart, data) {
    let url = 'http://localhost/api/' + urlPart;

    return await axios.post(url,
        data,
        {
            headers: {
                'Content-Type': 'application/json',
            }
        }
    ).then((response) => {
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