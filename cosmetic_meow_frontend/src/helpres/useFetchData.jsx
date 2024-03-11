import axios from "axios";
import {useEffect, useState} from "react";
import getBaseUrl from "./baseUrl";

function useFetchData(urlPart,  params = null) {
    let currentUrl = window.location.href;
    let url = getBaseUrl() + urlPart;
    let [variable, setVariable] = useState([]);
    useEffect(() => {
    axios.get(url,
            {
                params: params
            }
            )
            .then((response) => {
                setVariable(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [currentUrl]);
    console.log(variable, urlPart, params, "variable");
    return variable;
}
export default useFetchData;