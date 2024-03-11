import axios, {AxiosError} from "axios";


async function postUser(urlPart, data) {
    let url = 'http://localhost/api/auth/' + urlPart;
    return await axios.post(url,
        data,
        {
            headers: {
                'Content-Type': 'application/json',
            }
        }
    ).then((res) => {
            localStorage.setItem("auth",
             JSON.stringify({
                 access: res.data.access,
                 refresh: res.data.refresh,
                 user: res.data.user,

                 }));
            return {
                status: res.status
            }
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
export default postUser;