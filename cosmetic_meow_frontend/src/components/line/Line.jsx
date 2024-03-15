
import React, {useEffect} from "react";
import LineAssortment from "./LineAssortment";
import LineDescription from "./LineDescription";
import LineAdvantages from "./LineAdvantages";
import LineComposition from "./LineComposition";
import LineApplication from "./LineApplication";
import {useParams} from "react-router-dom";
import fetchData from "../../requests/fetchData";
import Loading from "../error/Loading";


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
    }, [id_line]);
    useEffect(() => {
    async function fetchLineData() {
        let data = await fetchData(`product_line/${id_line}`);
        setLineData(data);
    }
    fetchLineData();
    }, [id_line]);


    useEffect(() => {
            if (!lineData)
                document.title = "Линейка продуктов";
            else
                document.title = lineData.product_line?.name || "Линейка продуктов";
        window.scrollTo(0, 0);
    });
    if (!lineData || !products){
        return <Loading/>
    }

        const lineDescription = lineData.product_line
        let advantages = lineData.advantages?.slice(0, 3) || []
        let active_substances = lineData.active_substances?.slice(0, 4) || []
        let purposes = lineData.purposes?.slice(0, 3) || []


        return (
            <main className='line-module'>
                <LineDescription lineDescription={lineDescription} />
                <LineAssortment products={products}/>
                <LineAdvantages advantages={advantages}/>
                <LineComposition active_substances={active_substances}/>
                <LineApplication purposes={purposes}/>
            </main>
        );
}
export default Line;