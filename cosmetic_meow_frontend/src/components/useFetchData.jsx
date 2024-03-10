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
    }, []);
    console.log(variable, urlPart, params, "variable");
    return variable;
}
export default useFetchData;