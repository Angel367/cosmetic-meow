
import React from "react";
import LineAssortment from "./LineAssortment";
import LineDescription from "./LineDescription";
import LineAdvantages from "./LineAdvantages";
import LineComposition from "./LineComposition";
import LineApplication from "./LineApplication";
import fetchData from "../fetchData";
import {useParams} from "react-router-dom";


function Line() {
        let {id} = useParams();

        let lineDescription = fetchData('http://localhost:3000/line')
        let products = fetchData('http://localhost:3000/products', {lineId: id})
        let advantages = fetchData('http://localhost:3000/advantages', {lineId: id})
        let active_substances =
            fetchData('http://localhost:3000/active_substances', {lineId: id})
        let applications = fetchData('http://localhost:3000/applications', {lineId: id})
        console.log(lineDescription)
        console.log(products)
        console.log(advantages)
        console.log(active_substances)
        console.log(applications)

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