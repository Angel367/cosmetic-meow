
import React, {useEffect} from "react";
import LineAssortment from "./LineAssortment";
import LineDescription from "./LineDescription";
import LineAdvantages from "./LineAdvantages";
import LineComposition from "./LineComposition";
import LineApplication from "./LineApplication";
import {Link, Navigate, useParams} from "react-router-dom";
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
            if (document.getElementById('line/12') && window.location.pathname === '/lines/12') {
            document.getElementById('line/12').classList.add('not-main-h2-link-active');
            document.getElementById('line/11').classList.remove('not-main-h2-link-active');

            }
            if (document.getElementById('line/11') && window.location.pathname === '/lines/11'){
                document.getElementById('line/11').classList.add('not-main-h2-link-active');
                document.getElementById('line/12').classList.remove('not-main-h2-link-active');
            }

    });

    if (!lineData || !products) {
        return <Loading/>;
    }
    if (lineData.response && lineData.response.status){
        return <Navigate to={'/error'}/>
    }


        const lineDescription = lineData.product_line
        // let advantages = lineData.advantages?.sort((a, b) => a.images.length - b.images.length);
        let advantages = lineData.advantages?.slice(0, 3) || []
        let active_substances = lineData.active_substances?.slice(0, 4) || []
        let purposes = lineData.purposes?.slice(0, 3) || []
        console.log(window.location.pathname, );
        if (document.getElementById('line/12') && window.location.pathname === '/lines/12') {
            document.getElementById('line/12').classList.add('not-main-h2-link-active');
            document.getElementById('line/11').classList.remove('not-main-h2-link-active');

        }
        if (document.getElementById('line/11') && window.location.pathname === '/lines/11'){
            document.getElementById('line/11').classList.add('not-main-h2-link-active');
            document.getElementById('line/12').classList.remove('not-main-h2-link-active');
        }
        return (
            <main className='line-module'>
                <section className="line-links">
                    <p className={'not-main-p'}>На данной странице представлена информация о наших линейках продуктов</p>
                    <div className="line-links-holder">
                    <Link id={"line/12"} to={'/lines/12'} className={'not-main-h2-link not-main-h2-link-active'}>Dr.Sechenov</Link>
                    <span className={'not-main-h2-link-separator'}> | </span>
                    <Link id={"line/11"} to={'/lines/11'} className={'not-main-h2-link'}>BIOACTIV</Link>
                    </div>
                </section>
                <LineDescription lineDescription={lineDescription}
                                 productsCount={products.count}
                                 advantagesCount={advantages.length}
                                 activeSubstancesCount={active_substances.length}
                                 purposesCount={purposes.length}/>

                <LineAssortment products={products}/>
                {advantages.length > 0 &&
                    <LineAdvantages advantages={advantages} line_id={lineData.product_line.id}/>}
                {active_substances.length > 0 &&
                    <LineComposition active_substances={active_substances} line_id={lineData.product_line.id}/>}
                {purposes.length > 0 &&
                    <LineApplication purposes={purposes}/>}
            </main>
        );
}

export default Line;