import axios from "axios";
import {useEffect, useState} from "react";

function useFetchData(urlPart,  params = null) {
    let url = 'http://localhost/api/' + urlPart;
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
    }, [url, params]);
    console.log(variable);
    return variable;
}
export default useFetchData;