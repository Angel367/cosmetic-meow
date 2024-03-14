
import React, {useEffect} from "react";
import LineAssortment from "./LineAssortment";
import LineDescription from "./LineDescription";
import LineAdvantages from "./LineAdvantages";
import LineComposition from "./LineComposition";
import LineApplication from "./LineApplication";
import {useParams} from "react-router-dom";
import fetchData from "../../requests/fetchData";


function Line() {
    let {id_line} = useParams();
    const [products, setProducts] = React.useState(null);
    const [lineData, setLineData] = React.useState(null);
    useEffect(() => {
    async function fetchProducts(){
        let data = await fetchData('product', {page_size: 6, product_line: id_line});
        setProducts(data);
    }
    fetchProducts();
    }, []);
    useEffect(() => {
    async function fetchLineData() {
        let data = await fetchData(`product_line/${id_line}`);
        setLineData(data);
    }
    fetchLineData();
    }, []);


    useEffect(() => {
            if (!lineData)
                document.title = "Линейка продуктов";
            else
                document.title = lineDescription.name || "Линейка продуктов";
        window.scrollTo(0, 0);
    });
    if (!lineData || !products){
        return (
            <div>
                Загрузка
            </div>
        );
    }

        let lineDescription = lineData.product_line
        let advantages = lineData.advantages
        let active_substances = lineData.active_substances
        let applications = lineData.applications


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