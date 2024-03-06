import axios from "axios";
import {useEffect, useState} from "react";

function fetchData(url, params = null) {
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
    });
    console.log(variable);
    return variable;
}
export default fetchData;