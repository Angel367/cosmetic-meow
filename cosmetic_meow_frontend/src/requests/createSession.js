import axios from "axios";
import getBaseUrl from "./baseUrl";

function createSession() {
  axios.get(getBaseUrl()+ 'set_user_token/')
        .catch((error) => {
                    console.log(error);
                });
}
export default createSession;