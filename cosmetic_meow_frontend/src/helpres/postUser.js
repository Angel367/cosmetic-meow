import axios, {AxiosError} from "axios";
import { setUserData,} from "../hooks/user.actions";
import getBaseUrl from "./baseUrl";


async function postUser(urlPart, data) {

    let url = getBaseUrl() +'auth/' + urlPart;
    return await axios.post(url,
        data,
        {
            headers: {
                'Content-Type': 'application/json',
            }
        }
    ).then((res) => {

        setUserData(res.data);
        return {
            status: res.status,

        };}
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
    });

}
export default postUser;