
import React from "react";
import LineAssortment from "./LineAssortment";
import LineDescription from "./LineDescription";
import LineAdvantages from "./LineAdvantages";
import LineComposition from "./LineComposition";
import LineApplication from "./LineApplication";
import fetchData from "../useFetchData";
import {useParams} from "react-router-dom";


function Line() {
        let {id_line} = useParams();

        // let
        const lineData = fetchData(`product_line/${id_line}/`)
        let lineDescription = lineData.product_line
        let products = fetchData(`product/`, {product_line: id_line})

        let advantages = lineData.advantages
        let active_substances = lineData.active_substances
        let applications = lineData.applications
        // console.log(lineDescription, "lineDescription")
        // console.log(products, "products")
        // console.log(advantages, "advantages")
        // console.log(active_substances, "active_substances")
        // console.log(applications, "applications")

        return (
            <main className='main-line'>
                <LineDescription lineDescription={lineDescription} />
                <LineAssortment products={products}/>
                <LineAdvantages advantages={advantages}/>
                <LineComposition active_substances={active_substances}/>
                <LineApplication applications={applications}/>
            </main>
        );
}
export default Line;