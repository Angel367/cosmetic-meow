
import React, {useEffect} from "react";
import LineAssortment from "./LineAssortment";
import LineDescription from "./LineDescription";
import LineAdvantages from "./LineAdvantages";
import LineComposition from "./LineComposition";
import LineApplication from "./LineApplication";
import {Navigate, useParams} from "react-router-dom";
import fetchData from "../../requests/fetchData";
import Loading from "../error/Loading";


function Line() {
    let {id_line} = useParams();
    const [products, setProducts] = React.useState([]);
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

    });
    if (!lineData || !products) {
        return <Loading/>;
    }
    if (lineData.response && lineData.response.status){
        return <Navigate to={'/error'}/>
    }


        const lineDescription = lineData.product_line
        let advantages = lineData.advantages?.slice(0, 3) || []
        let active_substances = lineData.active_substances?.slice(0, 4) || []
        let purposes = lineData.purposes?.slice(0, 3) || []


        return (
            <div className='line-module'>
                <LineDescription lineDescription={lineDescription}
                                 productsCount={products.count}
                                 advantagesCount={advantages.length}
                                    activeSubstancesCount={active_substances.length}
                                    purposesCount={purposes.length}/>

                <LineAssortment products={products}/>
                {advantages.length > 0 &&
                <LineAdvantages advantages={advantages}/>}
                {active_substances.length > 0 &&
                <LineComposition active_substances={active_substances}/>}
                {purposes.length > 0 &&
                <LineApplication purposes={purposes}/>}
            </div>
        );
}
export default Line;