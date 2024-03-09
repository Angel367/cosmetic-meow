
import React from "react";
import LineAssortment from "./LineAssortment";
import LineDescription from "./LineDescription";
import LineAdvantages from "./LineAdvantages";
import LineComposition from "./LineComposition";
import LineApplication from "./LineApplication";
import fetchData from "../useFetchData";
import {useParams} from "react-router-dom";


function Line() {
        let {id} = useParams();

        let lineDescription = fetchData('line')
        let products = fetchData('products', {lineId: id})
        let advantages = fetchData('advantages', {lineId: id})
        let active_substances = fetchData('active_substances', {lineId: id})
        let applications = fetchData('applications', {lineId: id})
        console.log(lineDescription, "lineDescription")
        console.log(products, "products")
        console.log(advantages, "advantages")
        console.log(active_substances, "active_substances")
        console.log(applications, "applications")

        return (
            <main className='main-line'>
                <LineDescription lineDescription={lineDescription}/>
                <LineAssortment products={products}/>
                <LineAdvantages advantages={advantages}/>
                <LineComposition active_substances={active_substances}/>
                <LineApplication applications={applications}/>
            </main>
        );
}
export default Line;